import { pickStringTemplateData } from './pick-string-template-data'
import { StringTemplateFinalValue } from '../string-template-final-value'

describe('pickStringTemplateData', () => {
  it('should pick formatable data and remove non-formatable data by default', () => {
    const data = {
      a: 1,
      b: 'string',
      c: () => 'func',
      d: new StringTemplateFinalValue('final'),
      e: new Error('fail'),
      f: {
        g: 2,
        h: new Map(),
        i: [1, new Error('fail'), 3]
      }
    }

    const cleaned = pickStringTemplateData(data)
    expect(cleaned).toEqual({
      a: 1,
      b: 'string',
      c: data.c,
      d: data.d,
      f: {
        g: 2,
        i: [1, 3]
      }
    })
    expect(cleaned.e).toBeUndefined()
    expect(cleaned.f.h).toBeUndefined()
  })

  it('should set invalid values to null if requested', () => {
    const data = {
      a: new Error('fail'),
      b: [1, new Error('fail')]
    }
    const cleaned = pickStringTemplateData(data, { invalidUsage: 'null' })
    expect(cleaned).toEqual({
      a: null,
      b: [1, null]
    })
  })

  it('should set invalid values to undefined if requested', () => {
    const data = {
      a: new Error('fail'),
      b: [1, new Error('fail')]
    }
    const cleaned = pickStringTemplateData(data, { invalidUsage: 'undefined' })
    expect(cleaned).toHaveProperty('a', undefined)
    expect(cleaned.b).toEqual([1, undefined])
  })

  it('should handle nested arrays and objects deeply', () => {
    const data = {
      arr: [
        { valid: 1, invalid: new Map() },
        [new Error('fail'), 2]
      ]
    }
    const cleaned = pickStringTemplateData(data)
    expect(cleaned).toEqual({
      arr: [
        { valid: 1 },
        [2]
      ]
    })
  })

  it('should return leaf values as-is', () => {
    const func = () => {}
    const final = new StringTemplateFinalValue('v')
    expect(pickStringTemplateData(1)).toBe(1)
    expect(pickStringTemplateData(func)).toBe(func)
    expect(pickStringTemplateData(final)).toBe(final)
  })

  it('should protect invalid data inside StringTemplateFinalValue (no recursive cleaning)', () => {
    // StringTemplateFinalValue is meant to protect its content literally
    const invalid = new Error('dirty')
    const final = new StringTemplateFinalValue({ a: invalid })
    const cleaned = pickStringTemplateData(final)
    
    expect(cleaned).toBe(final)
    expect(cleaned.value.a).toBe(invalid) // Should NOT be cleaned
  })

  it('should handle enumerable Symbol properties if they are formatable', () => {
    const sym = Symbol('test')
    const data: any = { a: 1 }
    data[sym] = 'symbol value'
    // Object.keys and for..in don't pick up symbols, 
    // but the current implementation uses for..in.
    // Let's verify if that's what we want. 
    // Usually template engines use string keys.
    const cleaned = pickStringTemplateData(data)
    expect(cleaned).toEqual({ a: 1 })
    expect(cleaned[sym]).toBeUndefined()
  })

  it('should handle null prototype objects', () => {
    const data = Object.create(null)
    data.a = 1
    data.b = new Error()
    const cleaned = pickStringTemplateData(data)
    expect(Object.getPrototypeOf(cleaned)).toBeNull()
    expect(cleaned).toEqual({ a: 1 })
  })

  it('should handle circular references without infinite recursion', () => {
    const data: any = { a: 1 }
    data.self = data
    
    // We expect it to not throw stack overflow
    const cleaned = pickStringTemplateData(data)
    expect(cleaned.a).toBe(1)
    expect(cleaned.self).toBe(cleaned) // Now should correctly point back to the new 'cleaned' object
  })

  it('should ignore non-enumerable properties', () => {
    const data = { a: 1 }
    Object.defineProperty(data, 'b', {
      value: new Error('fail'),
      enumerable: false,
    })
    
    const cleaned = pickStringTemplateData(data)
    expect(cleaned).toEqual({ a: 1 })
    expect(cleaned.b).toBeUndefined()
  })

  it('should handle very deep nesting', () => {
    const depth = 100
    let deep: any = { value: 1 }
    for (let i = 0; i < depth; i++) {
      deep = { child: deep }
    }
    
    const cleaned = pickStringTemplateData(deep)
    // Verify it doesn't throw and structure is preserved
    let current = cleaned
    for (let i = 0; i < depth; i++) {
      expect(current).toHaveProperty('child')
      current = current.child
    }
    expect(current.value).toBe(1)
  })

  it('should handle mixed structures in StringTemplateFinalValue', () => {
    const inner = { valid: 1, invalid: new Map() }
    const final = new StringTemplateFinalValue(inner)
    const data = { a: final, b: [final] }
    
    const cleaned = pickStringTemplateData(data)
    expect(cleaned.a).toBe(final)
    expect(cleaned.a.value).toBe(inner) // The content is preserved literal
    expect(cleaned.b[0]).toBe(final)
  })

  it('should handle getter properties if they are enumerable', () => {
    const data = {
      get valid() { return 1 },
      get invalid() { return new Error() }
    }
    // DefineProperty defaults to non-enumerable unless specified
    Object.defineProperty(data, 'valid', { enumerable: true })
    Object.defineProperty(data, 'invalid', { enumerable: true })

    const cleaned = pickStringTemplateData(data)
    expect(cleaned).toEqual({ valid: 1 })
    expect(cleaned.invalid).toBeUndefined()
  })

  it('should handle sparse arrays', () => {
    const arr = new Array(3)
    arr[1] = 'data'
    // sparse: [undefined, 'data', undefined]
    const cleaned = pickStringTemplateData(arr)
    expect(cleaned).toEqual([undefined, 'data', undefined])
    expect(cleaned.length).toBe(3)
  })

  it('should handle top-level invalid values with different options', () => {
    const invalid = new Map()
    expect(pickStringTemplateData(invalid)).toBeUndefined()
    expect(pickStringTemplateData(invalid, { invalidUsage: 'null' })).toBeNull()
    expect(pickStringTemplateData(invalid, { invalidUsage: 'undefined' })).toBeUndefined()
  })

  it('should handle nested StringTemplateFinalValue wrapping circular reference', () => {
    const data: any = {}
    data.self = data
    const final = new StringTemplateFinalValue(data)
    
    // final should be treated as a leaf even if it contains a circular reference
    const cleaned = pickStringTemplateData(final)
    expect(cleaned).toBe(final)
    expect(cleaned.value.self).toBe(data)
  })
})
