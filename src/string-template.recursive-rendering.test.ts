import { describe, expect, it } from 'vitest'
import { HfStringTemplate } from './hf-template'
import { StringTemplate, StringTemplateFinalValue } from './string-template'

describe('StringTemplate Recursive Rendering', () => {
  it('should not render StringTemplateFinalValue', async () => {
    // HfStringTemplate uses {{ var }}
    const template = new HfStringTemplate('{{ value }}')
    const data = {
      value: new StringTemplateFinalValue('{{ not_rendered }}'),
    }
    const result = await template.format(data)
    expect(result).toBe('{{ not_rendered }}')
  })

  it('should render normal string as template by default', async () => {
    const template = new HfStringTemplate('{{ value }}')
    const data = {
      value: '{{ inner }}',
      inner: 'final',
    }
    const result = await template.format(data)
    expect(result).toBe('final')
  })

  it('should not render string as template if expandValue is false', async () => {
    const template = new HfStringTemplate('{{ value }}', { expandValue: false })
    const data = {
      value: '{{ inner }}',
      inner: 'final',
    }
    const result = await template.format(data)
    expect(result).toBe('{{ inner }}')
  })

  it('should propagate expandValue to nested templates', async () => {
    const template = new HfStringTemplate('{{ outer }}', { expandValue: false })
    const innerTemplate = new HfStringTemplate('{{ inner }}')
    const data = {
      outer: innerTemplate,
      inner: '{{ too_deep }}',
      too_deep: 'should_not_see_this',
    }
    // outer will format innerTemplate.
    // innerTemplate's expandValue will be set to false by propagation because it's undefined.
    const result = await template.format(data)
    expect(result).toBe('{{ too_deep }}')
  })

  it('should respect nested template own expandValue if explicitly set', async () => {
    const template = new HfStringTemplate('{{ outer }}', { expandValue: false })
    const innerTemplate = new HfStringTemplate('{{ inner }}', {
      expandValue: true,
    })
    const data = {
      outer: innerTemplate,
      inner: '{{ too_deep }}',
      too_deep: 'final',
    }
    const result = await template.format(data)
    expect(result).toBe('final')
  })

  it('should work with StringTemplate.format and expandValue', async () => {
    const result = await StringTemplate.format({
      template: '{{ value }}',
      data: {
        value: '{{ inner }}',
        inner: 'final',
      },
      expandValue: false,
    })
    expect(result).toBe('{{ inner }}')
  })

  it('should handle deeply nested structures with expandValue: false', async () => {
    const template = new HfStringTemplate('{{ obj }}', { expandValue: false })
    const data = {
      obj: {
        a: '{{ b }}',
        c: [1, '{{ d }}'],
        e: { f: '{{ g }}' },
      },
      b: 'B',
      d: 'D',
      g: 'G',
    }
    const result = await template.format(data)
    // Should return the object literally as JSON string (default HF behavior for objects), 
    // but the values inside should NOT be expanded.
    const parsed = JSON.parse(result)
    expect(parsed.a).toBe('{{ b }}')
    expect(parsed.c[1]).toBe('{{ d }}')
    expect(parsed.e.f).toBe('{{ g }}')
  })

  it('should handle StringTemplateFinalValue deep inside objects', async () => {
    const template = new HfStringTemplate('{{ obj }}')
    const data = {
      obj: {
        a: new StringTemplateFinalValue('{{ b }}'),
        c: '{{ d }}',
      },
      d: 'final_d',
    }
    const result = await template.format(data)
    const parsed = JSON.parse(result)
    expect(parsed.a).toBe('{{ b }}') // Not expanded
    expect(parsed.c).toBe('final_d') // Expanded
  })

  it('should preserve expandValue in partial()', async () => {
    const template = new HfStringTemplate('{{ a }}:{{ b }}', { expandValue: false })
    const partial = template.partial({ a: '{{ aa }}' })
    expect(partial.expandValue).toBe(false)
    
    const result = await partial.format({ b: '{{ bb }}', aa: 'AA', bb: 'BB' })
    expect(result).toBe('{{ aa }}:{{ bb }}')
  })

  it('should preserve expandValue through toJSON and reconstruction', async () => {
    const template = new HfStringTemplate('{{ a }}', { expandValue: false })
    const json = template.toJSON()
    expect(json.expandValue).toBe(false)

    const reconstructed = new StringTemplate(json)
    expect(reconstructed.expandValue).toBe(false)
    
    const result = await reconstructed.format({ a: '{{ b }}', b: 'B' })
    expect(result).toBe('{{ b }}')
  })

  it('should handle functions returning StringTemplateFinalValue in partialData', async () => {
    const template = new HfStringTemplate('{{ a }}')
    const partial = template.partial({
      a: () => new StringTemplateFinalValue('{{ b }}'),
    })
    const data = {
      b: 'B',
    }
    const result = await partial.format(data)
    expect(result).toBe('{{ b }}')
  })

  it('should not break with mixed arrays and expandValue: true', async () => {
    const template = new HfStringTemplate('{{ list }}', { raw: true })
    const data = {
      list: [
        '{{ a }}',
        new StringTemplateFinalValue('{{ b }}'),
        'literal'
      ],
      a: 'A'
    }
    const result = await template.format(data)
    expect(result[0]).toBe('A')
    expect(result[1]).toBe('{{ b }}')
    expect(result[2]).toBe('literal')
  })

  it('should not recurse into Map or Set', async () => {
    const template = new HfStringTemplate('{{ val }}', { raw: true })
    const myMap = new Map([['key', '{{ a }}']])
    const data = { val: myMap, a: 'A' }
    const result = await template.format(data)
    expect(result).toBe(myMap)
    expect(result.get('key')).toBe('{{ a }}')
  })

  it('should expand strings inside plain objects when expandValue is true', async () => {
    const template = new HfStringTemplate('{{ obj }}')
    const data = {
      obj: { item: '{{ a }}' },
      a: 'A',
    }
    const result = await template.format(data)
    expect(result).toBe('{"item":"A"}')
  })

  it('should handle null and undefined in data', async () => {
    const template = new HfStringTemplate('{{ val }}', { raw: true })
    const data = { val: { a: null, b: undefined } }
    const result = await template.format(data)
    expect(result.a).toBe(null)
    expect(result.b).toBe(undefined)
  })

  it('should support multi-level expandValue toggle', async () => {
    // Level 1: expandValue: true (default)
    const t1 = new HfStringTemplate('{{ a }}')
    // Level 2: expandValue: false
    const t2 = new HfStringTemplate('{{ b }}', { expandValue: false })
    // Level 3: expandValue: true
    const t3 = new HfStringTemplate('{{ c }}', { expandValue: true })

    const data = {
      a: t2,
      b: t3,
      c: '{{ d }}',
      d: 'final',
    }

    const result = await t1.format(data)
    // t1 -> calls renderRawValue(t2)
    // StringTemplate instances are always formatted (explicit intent).
    // t2.format() is called, inheriting expandValue: true (from t1) but overriden by its own expandValue: false.
    // Inside t2.format(), it renders "{{ b }}" using data.b (which is t3).
    // renderRawValue(t3) is called. Since t3 has explicit expandValue: true,
    // it expands "{{ c }}" to "final" (through t3.format()).
    expect(result).toBe('final')
  })

  it('should return StringTemplate instance as-is if wrapped in StringTemplateFinalValue', async () => {
    const innerTemplate = new HfStringTemplate('{{ a }}')
    const template = new HfStringTemplate('{{ val }}', { raw: true })
    const data = {
      val: new StringTemplateFinalValue(innerTemplate),
      a: 'A',
    }
    const result = await template.format(data)
    expect(result).toBe(innerTemplate)
    // Even if we format it later, it should be fine.
    expect(await result.format({ a: 'A' })).toBe('A')
  })

  it('should handle self-referencing template string in data without infinite loop', async () => {
    const template = new HfStringTemplate('{{ a }}')
    const data: any = {
      a: '{{ a }}',
    }
    // This should detect the recursion through 'visited' in renderRawValue
    const result = await template.format(data)
    expect(result).toBe('{{ a }}')
  })

  it('should handle self-referencing template string with additional text', async () => {
    const template = new HfStringTemplate('{{ a }}')
    const data: any = {
      a: 'Hello {{ a }}',
    }
    const result = await template.format(data)
    // t1('{{ a }}') -> renders data.a which is result of t2('Hello {{ a }}').format()
    // t2('Hello {{ a }}').format() -> renders 'Hello ' + data.a, but data.a expansion is blocked by visited tracking of 'Hello {{ a }}'.
    // Thus t2 returns 'Hello ' + 'Hello {{ a }}' = 'Hello Hello {{ a }}'.
    // t1 returns 'Hello Hello {{ a }}'.
    expect(result).toBe('Hello Hello {{ a }}')
  })
})
