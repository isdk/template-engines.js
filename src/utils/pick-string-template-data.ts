import { isStringTemplateFormatable } from './is-string-template-formatable'
import { StringTemplateFinalValue } from '../string-template-final-value'

export interface PickStringTemplateDataOptions {
  /**
   * What to do with non-formatable values.
   * - 'remove' (default): Remove the property from objects or element from arrays.
   * - 'null': Set the value to null.
   * - 'undefined': Set the value to undefined.
   */
  invalidUsage?: 'remove' | 'null' | 'undefined'
}

/**
 * Recursively picks and cleans data to ensure all values are suitable for StringTemplate.
 *
 * It deep-cleans:
 * - Arrays: filters or replaces invalid elements.
 * - Plain Objects: filters or replaces invalid properties.
 *
 * It preserves:
 * - Primitives, Functions, StringTemplateFinalValue instances, and built-in wrappers.
 *
 * @param val - The data to clean.
 * @param options - Options for handling invalid values.
 * @returns The cleaned data.
 */
export function pickStringTemplateData(val: any, options: PickStringTemplateDataOptions = {}): any {
  return _pickStringTemplateData(val, options, new Map())
}

function _pickStringTemplateData(val: any, options: PickStringTemplateDataOptions, visited: Map<any, any>): any {
  const { invalidUsage = 'remove' } = options

  if (!isStringTemplateFormatable(val)) {
    return invalidUsage === 'remove' ? undefined : (invalidUsage === 'null' ? null : undefined)
  }

  // Handle primitives and "leaf" formatable objects (like FinalValue, Function, Built-in wrappers)
  if (val === null || val === undefined || typeof val !== 'object' || val instanceof StringTemplateFinalValue) {
    return val
  }

  // Prevent circular references and maintain reference identity
  if (visited.has(val)) {
    return visited.get(val)
  }

  // Handle Arrays
  if (Array.isArray(val)) {
    const result: any[] = []
    visited.set(val, result)
    for (const item of val) {
      if (isStringTemplateFormatable(item)) {
        const cleaned = _pickStringTemplateData(item, options, visited)
        result.push(cleaned)
      } else if (invalidUsage !== 'remove') {
        result.push(invalidUsage === 'null' ? null : undefined)
      }
    }
    return result
  }

  // Only recursively clean plain objects
  const proto = Object.getPrototypeOf(val)
  if (proto === null || proto === Object.prototype) {
    const result: any = proto === null ? Object.create(null) : {}
    visited.set(val, result)
    for (const key in val) {
      if (Object.prototype.hasOwnProperty.call(val, key)) {
        const value = val[key]
        if (isStringTemplateFormatable(value)) {
          const cleanedValue = _pickStringTemplateData(value, options, visited)
          result[key] = cleanedValue
        } else if (invalidUsage !== 'remove') {
          result[key] = invalidUsage === 'null' ? null : undefined
        }
      }
    }
    return result
  }

  // For other formatable objects (like String/Number/Boolean objects, Custom Inherited Date), return as-is
  return val
}
