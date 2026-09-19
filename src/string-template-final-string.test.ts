import { describe, expect, it } from 'vitest'
import {
  FINAL_STRING_SYMBOL,
  StringTemplateFinalString,
  isStringTemplateFinalString,
} from './string-template-final-string'
import { StringTemplateFinalValue } from './string-template-final-value'

describe('StringTemplateFinalString', () => {
  it('should be a String object holding the plain value', () => {
    const fs = new StringTemplateFinalString('Hello {{b}}')
    expect(fs).toBeInstanceOf(String)
    expect(fs).toBeInstanceOf(StringTemplateFinalString)
    expect(typeof fs).toBe('object')
    expect(String(fs)).toBe('Hello {{b}}')
    expect(fs.valueOf()).toBe('Hello {{b}}')
    expect(fs.length).toBe(11)
  })

  it('should be truthy when non-empty (no truthiness pollution)', () => {
    const fs = new StringTemplateFinalString('Hello {{b}}')
    expect(!!fs).toBe(true)
    expect(!fs).toBe(false)
  })

  it('should degrade to primitive string in normal string operations', () => {
    const fs = new StringTemplateFinalString('Hello {{b}}')
    expect(typeof `${fs}`).toBe('string')
    expect(typeof String(fs)).toBe('string')
    expect(typeof (fs + '!')).toBe('string')
    expect(fs + '!' === 'Hello {{b}}!').toBe(true)
    expect(typeof fs.toUpperCase()).toBe('string')
  })

  it('should serialize transparently as a plain string via JSON.stringify', () => {
    const fs = new StringTemplateFinalString('code with {{syntax}}')
    expect(JSON.stringify(fs)).toBe('"code with {{syntax}}"')
    expect(JSON.stringify({ a: fs })).toBe('{"a":"code with {{syntax}}"}')
  })

  it('should be recognized by the brand symbol on its prototype', () => {
    const fs = new StringTemplateFinalString('x')
    expect((StringTemplateFinalString.prototype as any)[FINAL_STRING_SYMBOL]).toBe(true)
    expect(isStringTemplateFinalString(fs)).toBe(true)
  })

  it('should not recognize non-FinalString values', () => {
    expect(isStringTemplateFinalString('plain {{b}}')).toBe(false)
    expect(isStringTemplateFinalString(new String('plain {{b}}'))).toBe(false)
    expect(isStringTemplateFinalString(new StringTemplateFinalValue('{{b}}'))).toBe(false)
    expect(isStringTemplateFinalString(null)).toBe(false)
    expect(isStringTemplateFinalString(undefined)).toBe(false)
    expect(isStringTemplateFinalString(42)).toBe(false)
    expect(isStringTemplateFinalString({ 0: 'x', length: 1 })).toBe(false)
  })
})
