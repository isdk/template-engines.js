/**
 * The `StringTemplateFinalValue` class is a wrapper for a value that should NOT be expanded as a template.
 * Use this to protect business data that might contain template-like syntax from being secondary rendered.
 *
 * It acts as a transparent wrapper:
 * - `toString()` returns the string representation of the underlying value.
 * - `valueOf()` returns the underlying value.
 * - `toJSON()` ensures that when the object is serialized via `JSON.stringify()`, it returns the
 *   underlying value (or calls the underlying value's `toJSON` if it exists), making it
 *   seamlessly compatible with JSON-based data transfers.
 *
 * @example
 * ```typescript
 * const data = {
 *   code: new StringTemplateFinalValue("function test() { return '{{val}}'; }"),
 *   val: "something"
 * };
 * const result = await StringTemplate.format({ template: "{{code}}", data });
 * console.log(result); // "function test() { return '{{val}}'; }" (preserved literally)
 *
 * // JSON serialization transparency:
 * console.log(JSON.stringify(data.code)); // "\"function test() { return '{{val}}'; }\""
 * ```
 */
export class StringTemplateFinalValue {
  constructor(public value: any) {}
  /**
   * Returns the string representation of the wrapped value.
   */
  toString() {
    return String(this.value)
  }
  /**
   * Returns the wrapped value itself.
   */
  valueOf() {
    return this.value
  }
  /**
   * Ensures transparent JSON serialization.
   * If the wrapped value has its own `toJSON` method, it will be called.
   * Otherwise, the wrapped value is returned directly.
   *
   * @param key - The key of the property being serialized (passed by JSON.stringify).
   */
  toJSON(key?: string) {
    return (this.value && typeof this.value.toJSON === 'function')
      ? this.value.toJSON(key)
      : this.value
  }
}
