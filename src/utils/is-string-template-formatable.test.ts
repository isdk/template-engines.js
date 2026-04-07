import { isStringTemplateFormatable } from './is-string-template-formatable'
import { StringTemplateFinalValue } from '../string-template-final-value'

describe('isStringTemplateFormatable', () => {
  it('should return true for primitives', () => {
    expect(isStringTemplateFormatable('string')).toBe(true)
    expect(isStringTemplateFormatable(123)).toBe(true)
    expect(isStringTemplateFormatable(true)).toBe(true)
    expect(isStringTemplateFormatable(null)).toBe(true)
    expect(isStringTemplateFormatable(undefined)).toBe(true)
    expect(isStringTemplateFormatable(BigInt(10))).toBe(true)
    expect(isStringTemplateFormatable(Symbol('foo'))).toBe(true)
  })

  it('should return true for special numeric values', () => {
    expect(isStringTemplateFormatable(NaN)).toBe(true)
    expect(isStringTemplateFormatable(Infinity)).toBe(true)
    expect(isStringTemplateFormatable(-Infinity)).toBe(true)
  })

  it('should return true for functions', () => {
    expect(isStringTemplateFormatable(() => {})).toBe(true)
  })

  it('should return true for arrays and plain objects', () => {
    expect(isStringTemplateFormatable([])).toBe(true)
    expect(isStringTemplateFormatable({})).toBe(true)
    expect(isStringTemplateFormatable(Object.create(null))).toBe(true)
  })

  it('should return true for StringTemplateFinalValue', () => {
    const val = new StringTemplateFinalValue('foo')
    expect(isStringTemplateFormatable(val)).toBe(true)
    expect(isStringTemplateFormatable(new StringTemplateFinalValue(val))).toBe(true)
  })

  it('should return true for built-in wrappers', () => {
    expect(isStringTemplateFormatable(new String('foo'))).toBe(true)
    expect(isStringTemplateFormatable(new Number(123))).toBe(true)
    expect(isStringTemplateFormatable(new Boolean(true))).toBe(true)
  })

  it('should return false for Errors, Map, Set', () => {
    expect(isStringTemplateFormatable(new Error('fail'))).toBe(false)
    expect(isStringTemplateFormatable(new Map())).toBe(false)
    expect(isStringTemplateFormatable(new Set())).toBe(false)
  })

  it('should return false for custom class instances', () => {
    class Custom {}
    expect(isStringTemplateFormatable(new Custom())).toBe(false)
  })

  it('should return true for classes inheriting from allowed built-ins', () => {
    class CustomDate extends Date {}
    expect(isStringTemplateFormatable(new CustomDate())).toBe(true)

    class CustomString extends String {}
    expect(isStringTemplateFormatable(new CustomString('test'))).toBe(true)
  })

  it('should return false for other built-ins like Promise or Buffer', () => {
    expect(isStringTemplateFormatable(Promise.resolve())).toBe(false)
    if (typeof Buffer !== 'undefined') {
      expect(isStringTemplateFormatable(Buffer.from('test'))).toBe(false)
    }
  })
})
