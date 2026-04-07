import { BaseFactory } from 'custom-factory'
import { filterNullUndefined } from 'util-ex'

import {
  CommonError,
  ErrorCode,
  NotImplementationError,
} from '@isdk/common-error'

import { getValueByPath } from './template/util'

// register PromptTemplate alias as default.
export const defaultTemplateFormat = 'default'

export interface StringTemplateOptions {
  /** The template string to be formatted. */
  template?: string
  /** The data object used for template interpolation. */
  data?: Record<string, any>
  /** The format of the template (e.g., 'hf', 'golang', 'fstring', 'env'). Defaults to 'default'. */
  templateFormat?: string
  /** The list of input variables expected by the template. */
  inputVariables?: string[]
  /** Pre-compiled template object to speed up formatting. */
  compiledTemplate?: any
  /** If true, skips the initialization phase. */
  ignoreInitialize?: boolean
  /** Starting index for template segment matching. */
  index?: number
  /**
   * If true, returns the raw value (Object, Array, Boolean, etc.) instead of a string
   * if the template is a pure placeholder (e.g., "{{user}}").
   */
  raw?: boolean
  /**
   * Whether to expand the value as a template if it is a string and matches the template format.
   * This enables recursive rendering where a variable's value can itself be a template.
   * Defaults to true.
   *
   * @example
   * ```typescript
   * const data = { name: "World", msg: "Hello, {{name}}!" };
   * await StringTemplate.format({ template: "{{msg}}", data }); // "Hello, World!"
   * await StringTemplate.format({ template: "{{msg}}", data, expandValue: false }); // "Hello, {{name}}!"
   * ```
   */
  expandValue?: boolean
  [name: string]: any
}

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

/**
 * The `StringTemplate` class is a versatile template engine that supports dynamic template creation,
 * formatting, and partial data processing. It extends the `BaseFactory` class and provides methods
 * for handling template strings, validating input variables, and managing template configurations.
 *
 * @example
 * ```typescript
 * import { StringTemplate } from './template';
 *
 * // Register a custom template class
 * class CustomTemplate extends StringTemplate {
 *   _initialize(options?: StringTemplateOptions): void {}
 *   _format(data: Record<string, any>): string {
 *     return `Formatted: ${data.text}`;
 *   }
 * }
 * StringTemplate.register(CustomTemplate);
 *
 * // Create a new instance with a custom template format
 * const template = new StringTemplate("{{text}}", { templateFormat: "Custom" });
 * console.log(template instanceof CustomTemplate); // Output: true
 *
 * // Format the template with data
 * const result = await template.format({ text: "Hello World" });
 * console.log(result); // Output: "Formatted: Hello World"
 * ```
 */
export class StringTemplate extends BaseFactory {
  /**
   * Declares the compiled template instance.
   */
  declare compiledTemplate: any
  /**
   * Declares the raw template string.
   */
  declare template: string
  /**
   * Declares the format of the template (e.g., 'default').
   */
  declare templateFormat: string | undefined
  /**
   * Declares the data object used for template interpolation.
   */
  declare data: Record<string, any> | undefined
  /**
   * Declares the list of input variables expected by the template.
   */
  declare inputVariables: string[] | undefined
  /**
   * Declares whether to return the raw value if the template is a pure placeholder.
   */
  declare raw: boolean | undefined
  /**
   * Declares whether to expand the value as a template if it is a string and matches the template format.
   */
  declare expandValue: boolean | undefined

  /**
   * Creates a new instance of the `StringTemplate` class.
   * @param template - Either a template string or an options object.
   * @param options - Additional configuration options for the template.
   * @returns A new `StringTemplate` instance.
   *
   * @example
   * ```typescript
   * const template = StringTemplate.from("{{text}}", {
   *   templateFormat: "Test",
   *   inputVariables: ['text']
   * });
   * console.log(template instanceof TestStringTemplate); // Output: true
   * ```
   */
  static from(
    template?: string | StringTemplateOptions,
    options?: StringTemplateOptions
  ) {
    return new this(template, options)
  }

  /**
   * Formats a template using the provided options.
   * @param options - Configuration options for the template.
   * @returns A promise that resolves to the formatted template string.
   *
   * @example
   * ```typescript
   * const result = await StringTemplate.format({
   *   template: "{{text}}",
   *   data: { text: "Hello" },
   *   templateFormat: "Test"
   * });
   * console.log(result); // Output: "Hello"
   * ```
   */
  static async format(options: StringTemplateOptions) {
    const template = new this(options)
    return template.format()
  }

  /**
   * Formats a template if the provided options represent a valid template.
   * @param options - Configuration options to check and format.
   * @returns A promise that resolves to the formatted template string if valid; otherwise, undefined.
   *
   * @example
   * ```typescript
   * const result = await StringTemplate.formatIf({
   *   template: "{{text}}",
   *   data: { text: "Valid Template" },
   *   templateFormat: "Test"
   * });
   * console.log(result); // Output: "Valid Template"
   * ```
   */
  static async formatIf(options: StringTemplateOptions) {
    if (this.isTemplate(options)) {
      const template = new this(options)
      return template.format()
    }
  }

  /**
   * Determines whether the given options represent a valid template.
   * @param templateOpt - The options object to evaluate.
   * @returns A boolean indicating whether the options represent a valid template.
   *
   * @example
   * ```typescript
   * const isValid = StringTemplate.isTemplate({
   *   template: "{{text}}",
   *   templateFormat: "Test"
   * });
   * console.log(isValid); // Output: true
   * ```
   */
  static isTemplate(templateOpt: StringTemplateOptions) {
    if (templateOpt?.template) {
      const templateType = templateOpt.templateFormat || defaultTemplateFormat
      const MyTemplate =
        this === StringTemplate
          ? (StringTemplate.get(templateType) as typeof StringTemplate)
          : this
      // const Template = (this === PromptTemplate) ? PromptTemplate.get(templateType) as typeof PromptTemplate : this
      const hasIsTemplate = MyTemplate!.isTemplate !== StringTemplate.isTemplate
      if (hasIsTemplate) return MyTemplate!.isTemplate(templateOpt)
      else {
        return !!this.matchTemplateSegment(templateOpt)
      }
    }
  }

  /**
   * Matches and extracts a single template segment from the provided template options.
   * This method is designed to identify individual segments of a template string.
   *
   * @param templateOpt - The template options containing the template string and related configurations.
   * @param templateOpt.template - The required template string to be matched.
   * @param templateOpt.index - The optional starting position in the template string to begin matching.
   *                            If provided, this value takes precedence over the `index` parameter.
   * @param index - The default starting position in the template string to begin matching (default: 0).
   *                This value is used only if `templateOpt.index` is not provided or invalid.
   * @returns A `RegExpExecArray` representing the matched template segment, or `undefined` if no match is found.
   *          The `index` property of the result can be used to calculate the next position for iteration.
   *
   * @example
   * ```typescript
   * const template = "{{name}} is {{age}} years old";
   * let match = StringTemplate.matchTemplateSegment({ template });
   * while (match) {
   *   console.log(match[0]); // Output: "{{name}}"
   *   match = StringTemplate.matchTemplateSegment({ template }, match.index + match[0].length);
   * }
   * ```
   */
  static matchTemplateSegment(
    templateOpt: StringTemplateOptions | string,
    index = 0
  ): RegExpExecArray | undefined {
    let options: StringTemplateOptions
    if (typeof templateOpt === 'string') {
      options = { template: templateOpt }
    } else {
      options = templateOpt
    }

    if (options?.template) {
      const templateType = options.templateFormat || defaultTemplateFormat
      const MyTemplate =
        this === StringTemplate
          ? (StringTemplate.get(templateType) as typeof StringTemplate)
          : this
      if (options.index! > 0) {
        index = options.index!
      }
      const hasMatchTemplateSegment =
        MyTemplate!.matchTemplateSegment !== StringTemplate.matchTemplateSegment
      if (hasMatchTemplateSegment) {
        return MyTemplate!.matchTemplateSegment(options, index)
      }
    }
  }

  /**
   * Returns the variable name if the template is a pure placeholder.
   *
   * @param templateOpt - The template options or template string to check.
   * @returns The variable name if the template is a pure placeholder, undefined otherwise.
   *
   * @example
   * ```typescript
   * StringTemplate.getPurePlaceholderVariable("{{text}}"); // "text"
   * StringTemplate.getPurePlaceholderVariable("  {{text}}  "); // "text"
   * StringTemplate.getPurePlaceholderVariable("Hello {{text}}"); // undefined
   * ```
   */
  static getPurePlaceholderVariable(
    templateOpt: StringTemplateOptions | string
  ): string | undefined {
    let template: string | undefined
    let options: StringTemplateOptions

    if (typeof templateOpt === 'object') {
      options = templateOpt
      template = options.template
    } else {
      template = templateOpt
      options = { template }
    }

    if (!template) return undefined

    // Dispatch to subclass if called from StringTemplate base class
    if (this === StringTemplate) {
      const templateType = options.templateFormat || defaultTemplateFormat
      const MyTemplate = StringTemplate.get(
        templateType
      ) as typeof StringTemplate
      if (
        MyTemplate &&
        MyTemplate.getPurePlaceholderVariable !==
          StringTemplate.getPurePlaceholderVariable
      ) {
        return MyTemplate.getPurePlaceholderVariable(templateOpt)
      }
    }

    const trimmedTemplate = template.trim()
    if (!trimmedTemplate) return undefined

    const match = this.matchTemplateSegment(
      { ...options, template: trimmedTemplate },
      0
    )

    if (
      match &&
      match.index === 0 &&
      match[0].length === trimmedTemplate.length
    ) {
      return match[1] || match[0]
    }
    return undefined
  }

  /**
   * Checks if the template string is a pure placeholder (optionally surrounded by whitespace).
   * A pure placeholder means the template contains only one template segment and no other text.
   *
   * @param templateOpt - The template options or template string to check.
   * @returns True if the template is a pure placeholder, false otherwise.
   *
   * @example
   * ```typescript
   * StringTemplate.isPurePlaceholder("{{text}}"); // true
   * StringTemplate.isPurePlaceholder("  {{text}}  "); // true
   * StringTemplate.isPurePlaceholder("Hello {{text}}"); // false
   * StringTemplate.isPurePlaceholder("{{text1}}{{text2}}"); // false
   * ```
   */
  static isPurePlaceholder(
    templateOpt: StringTemplateOptions | string
  ): boolean {
    let options: StringTemplateOptions
    if (typeof templateOpt === 'object') {
      options = templateOpt
    } else {
      options = { template: templateOpt }
    }

    // Dispatch to subclass if called from StringTemplate base class
    if (this === StringTemplate) {
      const templateType = options.templateFormat || defaultTemplateFormat
      const MyTemplate = StringTemplate.get(
        templateType
      ) as typeof StringTemplate
      if (
        MyTemplate &&
        MyTemplate.isPurePlaceholder !== StringTemplate.isPurePlaceholder
      ) {
        return MyTemplate.isPurePlaceholder(templateOpt)
      }
    }

    return !!this.getPurePlaceholderVariable(templateOpt)
  }

  /**
   * Returns the variable name if this template instance is a pure placeholder.
   * @returns The variable name if the template is a pure placeholder, undefined otherwise.
   */
  getPurePlaceholderVariable(): string | undefined {
    return (
      this.constructor as typeof StringTemplate
    ).getPurePlaceholderVariable(this)
  }

  /**
   * Renders the raw value recursively, resolving any nested templates.
   * @param value - The value to render.
   * @param data - The data object used for interpolation.
   * @param visited - A set to track visited objects to avoid infinite recursion.
   * @returns A promise that resolves to the rendered raw value.
   */
  async renderRawValue(
    value: any,

    data: Record<string, any>,

    visited?: Set<any>
  ): Promise<any> {
    if (value instanceof StringTemplateFinalValue) {
      return value.value
    }

    if (value && typeof value === 'object') {
      if (value instanceof StringTemplate) {
        // ALWAYS format explicit StringTemplate objects as they represent a deliberate intent.
        // Propagation of expandValue flag will control implicit promotions inside the instance.
        value.raw = true
        if (value.expandValue === undefined) {
          value.expandValue = this.expandValue
        }

        return value.format(data, visited)
      }

      if (!visited) {
        visited = new Set()
      }

      if (visited.has(value)) {
        return value
      }

      const proto = Object.getPrototypeOf(value)
      const isPlainObject = proto === null || proto === Object.prototype
      const isArray = Array.isArray(value)

      if (isArray || isPlainObject) {
        visited.add(value)

        let result: any
        let changed = false

        if (isArray) {
          result = await Promise.all(
            value.map(async (v) => {
              const nv = await this.renderRawValue(v, data, visited)
              if (nv !== v) changed = true
              return nv
            })
          )
        } else {
          result = {}

          for (const [k, v] of Object.entries(value)) {
            const nv = await this.renderRawValue(v, data, visited)
            if (nv !== v) changed = true
            result[k] = nv
          }
        }

        visited.delete(value)

        return changed ? result : value
      }
    }

    if (typeof value === 'string' && this.expandValue !== false) {
      const MyClass = this.constructor as typeof StringTemplate

      if (MyClass.matchTemplateSegment(value)) {
        const options = this.toJSON()

        if (MyClass.isTemplate({ ...options, template: value })) {
          // NOTE: DO NOT add the string 'value' to 'visited' here.
          // StringTemplate.format will handle visited tracking for the template string on entry.
          // Tracking strings here will cause recursive resolution to fail because
          // t.format() would immediately detect a 'circular reference' to the same string.
          const t = new (this.constructor as any)({
            ...options,

            template: value,

            raw: true,

            expandValue: this.expandValue,
          })

          return t.format(data, visited)
        }
      }
    }


    return value
  }

  /**
   * Checks if this template instance is a pure placeholder.
   * @returns True if the template is a pure placeholder, false otherwise.
   */
  isPurePlaceholder(): boolean {
    return (this.constructor as typeof StringTemplate).isPurePlaceholder(this)
  }

  /**
   * Filters the input data to include only the specified input variables.
   * @param data - The data object to validate and filter.
   * @returns The filtered data object containing only the allowed keys.
   *
   * @example
   * ```typescript
   * const template = new StringTemplate({
   *   inputVariables: ['name']
   * });
   * const filteredData = template.filterData({ name: "Alice", age: 30 });
   * console.log(filteredData); // Output: { name: "Alice" }
   * ```
   */
  filterData(data: Record<string, any>) {
    if (Array.isArray(this.inputVariables)) {
      data = Object.fromEntries(
        Object.entries(data).filter(([key]) =>
          this.inputVariables!.includes(key)
        )
      )
    }
    return data
  }

  /**
   * Initializes a new instance of the `StringTemplate` class.
   * @param template - Either a template string or an options object.
   * @param options - Additional configuration options for the template.
   *
   * @example
   * ```typescript
   * const template = new StringTemplate("{{text}}", {
   *   templateFormat: "Test",
   *   inputVariables: ['text']
   * });
   * console.log(template instanceof TestStringTemplate); // Output: true
   * ```
   */
  constructor(
    template?: string | StringTemplateOptions,
    options?: StringTemplateOptions
  ) {
    if (typeof template === 'string') {
      if (!options) {
        options = {}
      }
      options.template = template
    } else if (template) {
      options = template
      template = options.template
    }

    const { templateFormat: templateType } = options || {}

    super(options)

    if (this.constructor === StringTemplate) {
      const TemplateClass = StringTemplate.get(
        templateType || defaultTemplateFormat
      )
      if (TemplateClass) {
        return Reflect.construct(TemplateClass, arguments)
      } else {
        throw new CommonError(
          `Prompt template type ${templateType} not found`,
          'PromptTemplate',
          ErrorCode.InvalidArgument
        )
      }
    }
  }

  /**
   * Placeholder method for initializing the template. Must be implemented by subclasses.
   * @param options - Configuration options for initialization.
   */
  _initialize(options?: StringTemplateOptions) {
    throw new NotImplementationError('Not implemented', 'PromptTemplate')
  }

  /**
   * Initializes the template instance with the provided options.
   * @param options - Configuration options for initialization.
   */
  initialize(options?: StringTemplateOptions) {
    if (this.constructor !== StringTemplate) {
      Object.assign(this, this.toJSON(options))
      if (!options?.ignoreInitialize) {
        this._initialize(options)
      }
    }
  }

  /**
   * Placeholder method for formatting the template. Must be implemented by subclasses.
   * @param data - The data object used for interpolation.
   * @returns A formatted string or a promise resolving to the formatted string.
   */
  _format(data: Record<string, any>): string | Promise<string> {
    throw new NotImplementationError('Not implemented', 'PromptTemplate')
  }

  /**
   * Formats the template using the provided data, supporting asynchronous processing.
   * @param data - The data object used for interpolation.
   * @returns A promise that resolves to the formatted template string.
   *
   * @example
   * ```typescript
   * const template = new StringTemplate("{{text}}", {
   *   templateFormat: "Test",
   *   inputVariables: ['text']
   * });
   * const result = await template.format({ text: "Hello" });
   * console.log(result); // Output: "Hello"
   * ```
   */
  async format(data?: Record<string, any>, visited?: Set<any>): Promise<any> {
    const partialData = this.data
    data = { ...partialData, ...data }

    if (!visited) {
      visited = new Set()
    }

    const template = this.template
    const isString = typeof template === 'string' && template.length > 0

    // Prevent infinite recursion:
    // 1. If we're already formatting this specific template instance.
    // 2. If we're already formatting this exact template string in the current path.
    // NOTE: Tracking the string is essential for catching loops like a: '{{a}}'
    // but it must be done here in format() so it's consistent for both root
    // and 'promoted' (from renderRawValue) templates.
    if (visited.has(this) || (isString && visited.has(template))) {
      return this.template
    }

    visited.add(this)
    if (isString) {
      visited.add(template)
    }

    try {
      if (this.raw) {
        const varName = this.getPurePlaceholderVariable()
        if (varName !== undefined) {
          const value = varName ? getValueByPath(data, varName) : data
          let result: any
          if (value !== undefined) {
            result = await this.renderRawValue(value, data, visited)
          }
          if (result !== undefined) {
            return result
          }
        }
      }

      if (partialData) {
        // process partial data
        for (const [key, value] of Object.entries(partialData)) {
          // no overwrite and it's function
          if (data[key] === value && typeof value === 'function') {
            // delete the key first to avoid infinite loop
            delete data[key]
            data[key] = await value(data)
          }
        }
      }

      for (const [key, value] of Object.entries(data)) {
        data[key] = await this.renderRawValue(value, data, visited)
      }
      return this._format(data)
    } finally {
      visited.delete(this)
      if (isString) {
        visited.delete(template)
      }
    }
  }

  /**
   * Creates a new `StringTemplate` instance with partially filled data.
   * This is useful for pre-filling some variables while leaving others to be filled later.
   * @param data - The partial data to pre-fill in the new template.
   * @returns A new `StringTemplate` instance with the partial data applied.
   *
   * @example
   * ```typescript
   * const template = new StringTemplate("{{role}}:{{text}}", {
   *   templateFormat: "Test",
   *   inputVariables: ['role', 'text']
   * });
   * const partialTemplate = template.partial({ role: "user" });
   * console.log(partialTemplate.data); // Output: { role: "user" }
   * const result = await partialTemplate.format({ text: "Hello" });
   * console.log(result); // Output: { role: "user", text: "Hello" }
   *
   * // Example with a function
   * function getDate() {
   *   return new Date();
   * }
   * const dateTemplate = template.partial({ date: getDate });
   * console.log(dateTemplate.data); // Output: { date: getDate }
   * const dateResult = await dateTemplate.format({ role: "user" });
   * console.log(dateResult.date instanceof Date); // Output: true
   * ```
   */
  partial(data: Record<string, any>): StringTemplate {
    data = { ...this.data, ...data }
    const options = this.toJSON()
    options.data = data
    options.ignoreInitialize = true
    return new (this.constructor as any)(options)
  }

  /**
   * Serializes the `StringTemplate` instance into a JSON-compatible object.
   * @param options - Optional configuration for serialization.
   * @returns A JSON-compatible object representing the template's state.
   *
   * @example
   * ```typescript
   * const template = new StringTemplate("{{text}}", {
   *   templateFormat: "Test",
   *   inputVariables: ['text']
   * });
   * const serialized = template.toJSON();
   * console.log(serialized);
   * // Output: { template: "{{text}}", templateFormat: "Test", inputVariables: ['text'] }
   * ```
   */
  toJSON(options: StringTemplateOptions = this) {
    let result: StringTemplateOptions = {
      template: options.template,
      data: options.data,
      inputVariables: options.inputVariables,
      compiledTemplate: options.compiledTemplate,
      raw: options.raw,
      expandValue: options.expandValue,
    }
    if (
      options.templateFormat &&
      StringTemplate.get(options.templateFormat) !== this.constructor
    ) {
      result.templateFormat = options.templateFormat
    }
    result = filterNullUndefined(result)
    return result
  }
}
