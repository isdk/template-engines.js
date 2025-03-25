import { CommonError, ErrorCode } from "@isdk/common-error";
import { StringTemplate, StringTemplateOptions } from "./template";
import { interpolateGolangTemplate } from "./template/golang";

export class GolangStringTemplate extends StringTemplate {

  static isTemplate(templateOpt: StringTemplateOptions|string) {
    const template = typeof templateOpt === 'string' ? templateOpt : templateOpt.template
    return template?.includes('{{') && template.includes('}}')
  }

  getVariables(template: string) {
    const result = {}
    interpolateGolangTemplate(template, result, true)
    return [...Object.keys(result)]
  }

  _initialize(options?: StringTemplateOptions) {
    const template = options?.template
    if (typeof template !== 'string') {
      throw new CommonError('Prompt template must be a string', 'PromptTemplate', ErrorCode.InvalidArgument)
    }
    this.inputVariables = Array.isArray(options?.inputVariables) ? options.inputVariables : this.getVariables(template)
  }

  _format(data: Record<string, any>): string {
    return interpolateGolangTemplate(this.template, data)
  }
}

StringTemplate.register(GolangStringTemplate,{name: 'golang', aliases: ['localai', 'ollama']})
