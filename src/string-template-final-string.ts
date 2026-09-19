/**
 * The brand symbol used to mark `StringTemplateFinalString` instances.
 * `Symbol.for` is used so that the marker works across realms (multiple copies
 * of this library loaded at the same time).
 */
export const FINAL_STRING_SYMBOL = Symbol.for('@isdk/string-template/final')

/**
 * Checks whether a value is a `StringTemplateFinalString`.
 *
 * It relies on the brand symbol placed on the class prototype instead of
 * `instanceof`, so that instances created in another realm (another copy of
 * this library) are still recognized.
 *
 * @param value - The value to check.
 * @returns True if the value is a `StringTemplateFinalString`.
 */
export function isStringTemplateFinalString(
  value: unknown
): value is StringTemplateFinalString {
  return (
    !!value &&
    typeof value === 'object' &&
    (Object.getPrototypeOf(value) as any)?.[FINAL_STRING_SYMBOL] === true
  )
}

/**
 * The `StringTemplateFinalString` class represents a rendering result that
 * still contains template-like literals (e.g. `{{ name }}`) which must NOT be
 * expanded by any subsequent rendering pass.
 *
 * It is produced automatically by `StringTemplate.format()` when the output
 * contains preserved template syntax, and it is a transparent string for all
 * practical purposes:
 *
 * - It extends `String`, so `toString()`, `valueOf()`, template literals,
 *   concatenation and `String(...)` all yield the plain string content.
 * - `JSON.stringify()` serializes it as a plain string, so it is safe to send
 *   over the wire or store in a database.
 * - Non-empty results are always truthy (empty results are never wrapped).
 *
 * When such a value is used as data in a later `StringTemplate.format()` call,
 * its content is kept literally: it will never be expanded as a template
 * again. To opt back into expansion, unwrap it explicitly with `String(value)`.
 *
 * @example
 * ```typescript
 * // First pass: the value contains template syntax and expansion is disabled
 * const first = await StringTemplate.format({
 *   template: '{{ code }}',
 *   data: { code: 'return "{{ x }}"' },
 *   expandValue: false,
 * })
 * // first is a StringTemplateFinalString holding 'return "{{ x }}"'
 *
 * // Second pass: the protected value is NOT expanded
 * const second = await StringTemplate.format({
 *   template: '{{ code }}',
 *   data: { code: first },
 * })
 * String(second) // 'return "{{ x }}"' - preserved literally
 *
 * // Opt back into expansion explicitly:
 * await StringTemplate.format({ template: String(first), data: { x: '1' } })
 * ```
 */
export class StringTemplateFinalString extends String {
  constructor(value: string | String) {
    super(value)
  }
}

Object.defineProperty(StringTemplateFinalString.prototype, FINAL_STRING_SYMBOL, {
  value: true,
  enumerable: false,
  writable: false,
  configurable: false,
})
