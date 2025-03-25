import { BaseFactory } from 'custom-factory';
import { filterNullUndefined } from 'util-ex'

import { CommonError, ErrorCode, NotImplementationError } from '@isdk/common-error'

// register PromptTemplate alias as default.
export const defaultTemplateFormat = 'default'

export interface StringTemplateOptions {
  template?: string
  data?: Record<string, any>
  templateFormat?: string
  inputVariables?: string[]
  compiledTemplate?: any
  ignoreInitialize?: boolean
  [name: string]: any
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
  declare templateFormat: string|undefined
  /**
   * Declares the data object used for template interpolation.
   */
  declare data:Record<string, any>|undefined
  /**
   * Declares the list of input variables expected by the template.
   */
  declare inputVariables: string[]|undefined

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
  static from(template?: string|StringTemplateOptions, options?: StringTemplateOptions) {
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
   * console.log(result); // Output: { text: "Hello" }
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
   * console.log(result); // Output: { text: "Valid Template" }
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
      const MyTemplate = StringTemplate.get(templateType) as typeof StringTemplate
      // const Template = (this === PromptTemplate) ? PromptTemplate.get(templateType) as typeof PromptTemplate : this
      return MyTemplate!.isTemplate !== StringTemplate.isTemplate && MyTemplate!.isTemplate(templateOpt)
    }
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
      data = Object.fromEntries(Object.entries(data).filter(([key]) => this.inputVariables!.includes(key)))
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
  constructor(template?: string|StringTemplateOptions, options?: StringTemplateOptions) {
    if (typeof template === 'string') {
      if (!options) { options = {} }
      options.template = template
    } else if (template) {
      options = template
      template = options.template
    }

    const { templateFormat: templateType } = options || {}

    super(options)

    if (this.constructor === StringTemplate) {
      const TemplateClass = StringTemplate.get(templateType || defaultTemplateFormat)
      if (TemplateClass) {
        return Reflect.construct(TemplateClass, arguments)
      } else {
        throw new CommonError(`Prompt template type ${templateType} not found`, 'PromptTemplate', ErrorCode.InvalidArgument)
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
  _format(data: Record<string, any>): string|Promise<string> {
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
   * console.log(result); // Output: { text: "Hello" }
   * ```
   */
  async format(data?: Record<string, any>): Promise<string> {
    const partialData = this.data
    data = { ...partialData, ...data, }
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
      if (value instanceof StringTemplate) {
        // avoid infinite loop
        delete data[key]
        data[key] = await value.format(data)
      }
    }
    return this._format(data)
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
    }
    if (options.templateFormat && StringTemplate.get(options.templateFormat) !== this.constructor) {
      result.templateFormat = options.templateFormat
    }
    result = filterNullUndefined(result)
    return result
  }
}
