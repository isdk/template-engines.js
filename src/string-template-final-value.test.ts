import { describe, expect, it } from 'vitest'
import { StringTemplateFinalValue } from './string-template'

describe('StringTemplateFinalValue', () => {
  it('should be transparent for JSON.stringify with primitives', () => {
    const val = new StringTemplateFinalValue('foo')
    expect(JSON.stringify(val)).toBe('"foo"')
    
    const num = new StringTemplateFinalValue(123)
    expect(JSON.stringify(num)).toBe('123')
    
    const bool = new StringTemplateFinalValue(true)
    expect(JSON.stringify(bool)).toBe('true')
    
    const nil = new StringTemplateFinalValue(null)
    expect(JSON.stringify(nil)).toBe('null')
  })

  it('should be transparent for JSON.stringify with plain objects', () => {
    const obj = { a: 1, b: 'two' }
    const val = new StringTemplateFinalValue(obj)
    expect(JSON.stringify(val)).toBe(JSON.stringify(obj))
  })

  it('should be transparent for JSON.stringify with Date', () => {
    const d = new Date('2025-04-07T12:00:00.000Z')
    const val = new StringTemplateFinalValue(d)
    expect(JSON.stringify(val)).toBe(JSON.stringify(d))
  })

  it('should call custom toJSON of the wrapped value', () => {
    const custom = {
      toJSON: () => 'CUSTOM'
    }
    const val = new StringTemplateFinalValue(custom)
    expect(JSON.stringify(val)).toBe('"CUSTOM"')
  })

  it('should handle nested StringTemplateFinalValue', () => {
    const inner = new StringTemplateFinalValue('inner')
    const outer = new StringTemplateFinalValue(inner)
    expect(JSON.stringify(outer)).toBe('"inner"')
  })

  it('should correctly handle undefined in objects and arrays', () => {
    const obj = { prop: new StringTemplateFinalValue(undefined) }
    expect(JSON.stringify(obj)).toBe('{}')
    
    const arr = [new StringTemplateFinalValue(undefined)]
    expect(JSON.stringify(arr)).toBe('[null]')
  })
})
