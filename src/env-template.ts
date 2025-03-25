import { CommonError, ErrorCode } from "@isdk/common-error";
import { StringTemplate, type StringTemplateOptions } from "./template";
import { getEnvVairables as getVariables, interpolateEnv } from './template/env'

export class EnvStringTemplate extends StringTemplate {

  static isTemplate(templateOpt: StringTemplateOptions|string) {
    let template: string
    let result = false

    if (typeof templateOpt === 'object') {
      template = templateOpt.template as string
    } else {
      template = templateOpt as string
    }

    const vars = getVariables(template)
    result = vars.length > 0

    return result
  }

  getVariables(template = this.template) {
    return getVariables(template)
  }

  _initialize(options?: StringTemplateOptions) {
    const template = options?.template
    if (typeof template !== 'string') {
      throw new CommonError('Prompt template must be a string', 'PromptTemplate', ErrorCode.InvalidArgument)
    }
    this.inputVariables = Array.isArray(options?.inputVariables) ? options.inputVariables : this.getVariables()
  }

  _format(data: Record<string, any>): string {
    const processEnv = {...process.env}
    return interpolateEnv(this.template, processEnv, data)
  }
}

StringTemplate.register(EnvStringTemplate, {name: 'env', aliases: ['js', 'javascript']})
