import { BaseFactory } from 'custom-factory';
import { filterNullUndefined } from 'util-ex'

import { CommonError, ErrorCode, NotImplementationError } from '@isdk/common-error'
// import { type PromptTemplateType } from './consts'

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

export class StringTemplate extends BaseFactory {
  declare compiledTemplate: any
  declare template: string
  declare templateFormat: string|undefined
  declare data:Record<string, any>|undefined
  declare inputVariables: string[]|undefined

  static from(template?: string|StringTemplateOptions, options?: StringTemplateOptions) {
    return new this(template, options)
  }

  static async format(options: StringTemplateOptions) {
    const template = new this(options)
    return template.format()
  }

  /**
   * If the given options.template is the template, perform formatting using that template.
   * @param options - The options object to check for being a template and to format.
   * @returns A Promise that resolves to the formatted result if options is a template; otherwise, no value is returned.
   */
  static async formatIf(options: StringTemplateOptions) {
    if (this.isTemplate(options)) {
      const template = new this(options)
      return template.format()
    }
  }

  static isTemplate(templateOpt: StringTemplateOptions) {
    if (templateOpt?.template) {
      const templateType = templateOpt.templateFormat || defaultTemplateFormat
      const MyTemplate = StringTemplate.get(templateType) as typeof StringTemplate
      // const Template = (this === PromptTemplate) ? PromptTemplate.get(templateType) as typeof PromptTemplate : this
      return MyTemplate!.isTemplate !== StringTemplate.isTemplate && MyTemplate!.isTemplate(templateOpt)
    }
  }

  /**
   * Validate/filter the data in inputVariables
   * @param data
   * @returns
   */
  filterData(data: Record<string, any>) {
    if (Array.isArray(this.inputVariables)) {
      data = Object.fromEntries(Object.entries(data).filter(([key]) => this.inputVariables!.includes(key)))
    }
    return data
  }

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

  _initialize(options?: StringTemplateOptions) {
    throw new NotImplementationError('Not implemented', 'PromptTemplate')
  }

  initialize(options?: StringTemplateOptions) {
    if (this.constructor !== StringTemplate) {
      Object.assign(this, this.toJSON(options))
      if (!options?.ignoreInitialize) {
        this._initialize(options)
      }
    }
  }

  _format(data: Record<string, any>): string|Promise<string> {
    throw new NotImplementationError('Not implemented', 'PromptTemplate')
  }

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
   * it can make sense to "partial" a prompt template - eg pass in a subset of the required values, as to create a new prompt template which expects only the remaining subset of values.
   * @param data the partial data
   * @returns the new partial PromptTemplate instance
   */
  partial(data: Record<string, any>): StringTemplate {
    data = { ...this.data, ...data }
    const options = this.toJSON()
    options.data = data
    options.ignoreInitialize = true
    return new (this.constructor as any)(options)
  }

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
