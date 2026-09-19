import { describe, expect, it } from 'vitest'
import { Template } from './index'
import { StringTemplateFinalString } from '../../../string-template-final-string'

/**
 * `convertToRuntimeValues` decides how a data value behaves inside the engine.
 * A boxed string (eg. `new String(...)`, `StringTemplateFinalString`) has
 * `typeof === 'object'`, so it must be mapped to `StringValue` explicitly —
 * otherwise it becomes an `ObjectValue` and every string operation breaks
 * (filters throw, `~` yields '[object Map]', `==` and `.length` are wrong).
 */
describe('jinja runtime: boxed strings', () => {
  const content = 'hello {{x}}'

  it('should treat a boxed String as a string value', () => {
    const value = new String(content)
    expect(new Template('{{ v }}').render({ v: value })).toBe(content)
    expect(new Template('{{ v | upper }}').render({ v: value })).toBe('HELLO {{X}}')
    expect(new Template('{{ v.length }}').render({ v: value })).toBe('11')
    expect(new Template('{{ v ~ "!" }}').render({ v: value })).toBe('hello {{x}}!')
    expect(
      new Template('{% if v == "hello {{x}}" %}EQ{% else %}NE{% endif %}').render({
        v: value,
      })
    ).toBe('EQ')
    expect(
      new Template('{% if v %}YES{% else %}NO{% endif %}').render({ v: value })
    ).toBe('YES')
  })

  it('should keep the content of a StringTemplateFinalString literal', () => {
    const value = new StringTemplateFinalString(content)
    expect(new Template('{{ v }}').render({ v: value })).toBe(content)
    expect(new Template('{{ v | upper }}').render({ v: value })).toBe('HELLO {{X}}')
    expect(new Template('{{ v ~ "!" }}').render({ v: value })).toBe('hello {{x}}!')
  })

  it('should still map plain objects to object values', () => {
    expect(new Template('{{ v.a }}').render({ v: { a: 'A' } })).toBe('A')
    expect(new Template('{{ v.a }}').render({ v: { a: 'A' } })).not.toBe(
      '[object Map]'
    )
  })
})
