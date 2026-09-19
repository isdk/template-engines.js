import { describe, expect, it } from 'vitest'
import { HfStringTemplate } from './hf-template'
import { StringTemplateFinalValue } from './string-template-final-value'

/**
 * Cross-pass rendering tests: values (in data) that contain template content
 * must survive subsequent rendering passes LITERALLY.
 *
 * These tests assert on string content only — they do not import any
 * FinalString type — so they fail on a library version without the
 * exit-tagging fix (the preserved template gets expanded again on the next
 * pass) and pass once the fix is in place.
 *
 * NOTE: rendering results may be returned as String-like objects, so every
 * assertion on a rendering result goes through `String(...)`.
 */
describe('StringTemplate cross-pass rendering with template-like data', () => {
  it('keeps a template-like value literal when rendered in a second pass (original bug)', async () => {
    // pass 1: the data value contains template syntax that does NOT belong
    // to this layer (e.g. it is meant for a downstream renderer), so
    // expansion is disabled for this pass.
    const first = await new HfStringTemplate('{{ role }}:{{ text }}', {
      expandValue: false,
    }).format({
      role: '用户',
      text: '帮我写 {{lang}} 的 hello world',
    })
    expect(String(first)).toBe('用户:帮我写 {{lang}} 的 hello world')

    // pass 2: the previous result is used as data. The {{lang}} placeholder
    // must stay literal even though `lang` is available in this pass.
    const second = await new HfStringTemplate('{{ reply }}').format({
      reply: first,
      lang: 'Python',
    })
    expect(String(second)).toBe('用户:帮我写 {{lang}} 的 hello world')
  })

  it('keeps the value literal across two independent static format() calls', async () => {
    const first = await HfStringTemplate.format({
      template: '{{ code }}',
      data: { code: 'return "{{ x }}"' },
      expandValue: false,
    })
    expect(String(first)).toBe('return "{{ x }}"')

    const second = await HfStringTemplate.format({
      template: '```js\n{{ code }}\n```',
      data: { code: first, x: 'EXPANDED' },
    })
    expect(String(second)).toBe('```js\nreturn "{{ x }}"\n```')
  })

  it('keeps template-documentation text literal when a later pass enables expansion', async () => {
    const doc = '占位符写作 {{ name }}'
    const pass1 = await new HfStringTemplate('{{ doc }}', { expandValue: false }).format({ doc })
    const pass2 = await new HfStringTemplate('{{ doc }}', { expandValue: false }).format({
      doc: pass1,
    })
    expect(String(pass2)).toBe(doc)

    // final layer: another component renders with expansion enabled
    const pass3 = await new HfStringTemplate('{{ doc }}').format({
      doc: pass2,
      name: 'EXPANDED',
    })
    expect(String(pass3)).toBe(doc)
  })

  it('keeps StringTemplateFinalValue-derived output literal beyond one layer', async () => {
    const first = await new HfStringTemplate('{{ code }}').format({
      code: new StringTemplateFinalValue('return "{{ x }}"'),
    })
    expect(String(first)).toBe('return "{{ x }}"')

    // The protection must outlive the pass that consumed the FinalValue:
    // `x` is available here but must not be used to expand the literal.
    const second = await new HfStringTemplate('{{ code }}').format({
      code: first,
      x: 'EXPANDED',
    })
    expect(String(second)).toBe('return "{{ x }}"')
  })
})
