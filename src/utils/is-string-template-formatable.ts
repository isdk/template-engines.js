import { StringTemplateFinalValue } from '../string-template-final-value'

/**
 * Checks if a value is suitable for use in StringTemplate formatting.
 *
 * Formatable values include:
 * - Primitives: string, number, boolean, bigint, symbol, null, undefined
 * - Functions (used for dynamic data)
 * - Arrays
 * - Plain Objects (prototype is Object.prototype or null)
 * - StringTemplateFinalValue instances
 * - Built-in wrapper objects: String, Number, Boolean, Date, RegExp
 *
 * Non-formatable values include:
 * - Error instances
 * - Other custom class instances (unless they are StringTemplateFinalValue)
 * - Map, Set, Promise (not directly supported by current template engines)
 *
 * @param val - The value to check.
 * @returns True if the value is formatable; otherwise, false.
 */
export function isStringTemplateFormatable(val: any): boolean {
  if (val === null || val === undefined) return true
  const type = typeof val
  if (type !== 'object') {
    // string, number, boolean, bigint, symbol, function
    // Note: functions are explicitly allowed as they are used for dynamic data in StringTemplate
    return true
  }

  if (val instanceof StringTemplateFinalValue) return true
  if (Array.isArray(val)) return true

  // Check for allowed built-in objects and their subclasses
  if (
    val instanceof String ||
    val instanceof Number ||
    val instanceof Boolean ||
    val instanceof Date ||
    val instanceof RegExp
  ) {
    return true
  }

  // Check for plain object
  const proto = Object.getPrototypeOf(val)
  if (proto === null || proto === Object.prototype) return true

  // For other objects (Map, Set, Error, Promise, Custom classes), we return false to be safe
  return false
}
