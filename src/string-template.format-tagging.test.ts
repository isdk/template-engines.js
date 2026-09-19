import { describe, expect, it } from 'vitest'
import { HfStringTemplate } from './hf-template'
import { StringTemplate } from './string-template'
import {
  StringTemplateFinalString,
  isStringTemplateFinalString,
} from './string-template-final-string'
import { StringTemplateFinalValue } from './string-template-final-value'
import './f-string-template'
import './golang-template'
import './env-template'

describe('StringTemplate FinalString exit tagging', () => {
  describe('HfStringTemplate (default format)', () => {
    it('tags output containing a preserved template literal (expandValue: false)', async () => {
      const template = new HfStringTemplate('{{ value }}', { expandValue: false })
      const result = await template.format({ value: 'Hi {{ name }}' })
      expect(isStringTemplateFinalString(result)).toBe(true)
      expect(result).toBeInstanceOf(StringTemplateFinalString)
      expect(String(result)).toBe('Hi {{ name }}')
    })

    it('does not tag fully-expanded output', async () => {
      const template = new HfStringTemplate('{{ value }}')
      const result = await template.format({ value: '{{ inner }}', inner: 'final' })
      expect(isStringTemplateFinalString(result)).toBe(false)
      expect(typeof result).toBe('string')
      expect(result).toBe('final')
    })

    it('never tags empty output', async () => {
      // HF renders a missing variable as ''
      const result = await new HfStringTemplate('Hello {{ missing }}').format({})
      expect(result).toBe('Hello ')
      expect(isStringTemplateFinalString(result)).toBe(false)
    })

    it('truthiness regression: empty result falsy, non-empty result truthy', async () => {
      const empty = await new HfStringTemplate('{{ missing }}').format({})
      expect(!!empty).toBe(false)
      const nonEmpty = await new HfStringTemplate('x').format({})
      expect(!!nonEmpty).toBe(true)
    })

    it('mixed text with blocked template fragments is tagged', async () => {
      // 'Hello {{ a }}' gets blocked by visited tracking -> 'Hello Hello {{ a }}'
      const result = await new HfStringTemplate('{{ a }}').format({ a: 'Hello {{ a }}' })
      expect(isStringTemplateFinalString(result)).toBe(true)
      expect(String(result)).toBe('Hello Hello {{ a }}')
    })

    it('plain text without template syntax is not tagged', async () => {
      const result = await new HfStringTemplate('just text').format({})
      expect(isStringTemplateFinalString(result)).toBe(false)
      expect(result).toBe('just text')
    })
  })

  describe('cross-pass protection', () => {
    it('original bug scenario: FinalString data renders literally next pass, output re-tagged without nesting', async () => {
      const first = await new HfStringTemplate('{{ code }}', { expandValue: false }).format({
        code: 'function f() { return "{{ x }}"; }',
      })
      expect(isStringTemplateFinalString(first)).toBe(true)

      // second pass WITHOUT any special flag: the protected value must not expand
      const second = await new HfStringTemplate('```js\n{{ code }}\n```').format({
        code: first,
      })
      expect(String(second)).toBe('```js\nfunction f() { return "{{ x }}"; }\n```')
      expect(isStringTemplateFinalString(second)).toBe(true)
      // single-level tag only: prototype is exactly the final class
      expect(Object.getPrototypeOf(second)).toBe(StringTemplateFinalString.prototype)
    })

    it('explicit String() unwrapping opts back into expansion', async () => {
      const first = await new HfStringTemplate('{{ content }}', { expandValue: false }).format({
        content: 'Hi {{ name }}',
      })
      const expanded = await new HfStringTemplate(String(first)).format({ name: 'Tom' })
      expect(expanded).toBe('Hi Tom')
      expect(isStringTemplateFinalString(expanded)).toBe(false)
    })

    it('StringTemplateFinalValue output survives the pass and stays protected next pass', async () => {
      const first = await new HfStringTemplate('{{ code }}').format({
        code: new StringTemplateFinalValue('return "{{ x }}"'),
      })
      expect(String(first)).toBe('return "{{ x }}"')
      expect(isStringTemplateFinalString(first)).toBe(true)

      const second = await new HfStringTemplate('{{ code }}').format({ code: first })
      expect(String(second)).toBe('return "{{ x }}"')
    })

    it('raw: true returns FinalString data values as-is (identity)', async () => {
      const fs = await new HfStringTemplate('{{ x }}', { expandValue: false }).format({
        x: '{{ y }}',
      })
      const result = await new HfStringTemplate('{{ v }}', { raw: true }).format({ v: fs })
      expect(result).toBe(fs)
    })
  })

  describe('edge cases', () => {
    it('template-documentation text stays literal across passes (expandValue: false)', async () => {
      const doc = 'Use {{ name }} placeholders and {% if x %}ON{% endif %} blocks'
      const first = await new HfStringTemplate('{{ doc }}', { expandValue: false }).format({ doc })
      expect(String(first)).toBe(doc)
      expect(isStringTemplateFinalString(first)).toBe(true)

      const second = await new HfStringTemplate('{{ doc }}', { expandValue: false }).format({
        doc: first,
      })
      expect(String(second)).toBe(doc)
    })

    it('malformed template-like output is not tagged but is inherently safe', async () => {
      // An unclosed statement is not a parseable template, so it is not tagged...
      const first = await new HfStringTemplate('{{ doc }}', { expandValue: false }).format({
        doc: 'Use {% if x %} blocks',
      })
      expect(isStringTemplateFinalString(first)).toBe(false)
      expect(String(first)).toBe('Use {% if x %} blocks')

      // ...and it cannot expand on a later pass either (isTemplate rejects it)
      const second = await new HfStringTemplate('{{ doc }}').format({
        doc: first,
        x: 'EXPANDED',
      })
      expect(String(second)).toBe('Use {% if x %} blocks')
    })

    it('circular self-reference output is tagged once, no nesting', async () => {
      const result = await new HfStringTemplate('{{ a }}').format({ a: '{{ a }}' })
      expect(String(result)).toBe('{{ a }}')
      expect(isStringTemplateFinalString(result)).toBe(true)
      expect(Object.getPrototypeOf(result)).toBe(StringTemplateFinalString.prototype)
    })

    it('JSON serialization of tagged output is a plain string', async () => {
      const first = await new HfStringTemplate('{{ code }}', { expandValue: false }).format({
        code: '{{ x }}',
      })
      expect(JSON.stringify({ code: first })).toBe('{"code":"{{ x }}"}')
    })

    it('arrays containing FinalString keep it intact in raw mode', async () => {
      const first = await new HfStringTemplate('{{ x }}', { expandValue: false }).format({
        x: '{{ y }}',
      })
      const result = await new HfStringTemplate('{{ list }}', { raw: true }).format({
        list: ['a', first],
      })
      expect(result[0]).toBe('a')
      expect(result[1]).toBe(first)
      expect(isStringTemplateFinalString(result[1])).toBe(true)
    })
  })

  describe('other engines', () => {
    it('fstring engine tags preserved literals', async () => {
      const result = await StringTemplate.format({
        template: '{msg}',
        data: { msg: 'Hi {name}' },
        templateFormat: 'fstring',
        expandValue: false,
      })
      expect(isStringTemplateFinalString(result)).toBe(true)
      expect(String(result)).toBe('Hi {name}')
    })

    it('golang engine tags preserved literals', async () => {
      const result = await StringTemplate.format({
        template: 'Hello {{.msg}}',
        data: { msg: 'Hi {{.name}}' },
        templateFormat: 'golang',
        expandValue: false,
      })
      expect(isStringTemplateFinalString(result)).toBe(true)
      expect(String(result)).toBe('Hello Hi {{.name}}')
    })

    it('env engine tags escaped literals', async () => {
      // env engine recursively interpolates data values, so the literal must be escaped (\$)
      const result = await StringTemplate.format({
        template: 'Hello ${MSG}',
        data: { MSG: 'Hi \\${NAME}' },
        templateFormat: 'env',
        expandValue: false,
      })
      expect(String(result)).toBe('Hello Hi ${NAME}')
      expect(isStringTemplateFinalString(result)).toBe(true)
    })
  })

  // engine specific coverage lives in src/hf-template.test.ts,
  // src/env-template.test.ts and src/template/{env,jinja/src/runtime}.test.ts

  describe('opting out of tagging (tagFinalString: false)', () => {
    it('returns a plain string', async () => {
      const result = await StringTemplate.format({
        template: '{{ v }}',
        data: { v: 'Hi {{ name }}' },
        expandValue: false,
        tagFinalString: false,
      })
      expect(typeof result).toBe('string')
      expect(result).toBe('Hi {{ name }}')
    })

    it('still protects tagged values used as data', async () => {
      const first = await new HfStringTemplate('{{ v }}', {
        expandValue: false,
      }).format({ v: 'Hi {{ name }}' })
      const second = await new HfStringTemplate('{{ v }}', {
        tagFinalString: false,
      }).format({ v: first, name: 'EXPANDED' })
      expect(second).toBe('Hi {{ name }}')
      expect(isStringTemplateFinalString(second)).toBe(false)
    })

    it('is preserved by partial() and toJSON()', () => {
      const template = new HfStringTemplate('{{ v }}', { tagFinalString: false })
      expect(template.toJSON().tagFinalString).toBe(false)
      expect(template.partial({ v: 'x' }).tagFinalString).toBe(false)
    })
  })
})
