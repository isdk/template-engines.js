import { CommonError, ErrorCode } from "@isdk/common-error";
import { StringTemplate, type StringTemplateOptions } from "./string-template";
import { FStringTemplateNode, parseFString, interpolateFString } from './template/python'

function getVariables(template: FStringTemplateNode[]) {
  const result = new Set<string>()
  template.forEach((node) => {
    if (node.type === "variable") {
      result.add(node.name);
    }
  });
  return [...result]
}

export class FStringTemplate extends StringTemplate {
  declare compiledTemplate: FStringTemplateNode[]

  static matchTemplateSegment(template: StringTemplateOptions|string, index = 0) {
    // f-string 的模板是 "{var}"，“{{”表示对"{"的转义，“}}表示对"}”的转义
    const regex = /\{(?!{)(.*?)(?<!})\}|{{|}}/g;
    if (typeof template === 'object') {
      if (template.index) index = template.index
      template = template.template!
    }
    regex.lastIndex = index;
    const match = regex.exec(template);
    if (match) {return match}
  }

  static isPurePlaceholder(templateOpt: StringTemplateOptions | string): boolean {
    let template = typeof templateOpt === 'object' ? templateOpt.template : templateOpt
    if (!template) return false

    template = template.trim()
    const match = this.matchTemplateSegment(template, 0)
    // In FStringTemplate, the regex is /\{(?!{)(.*?)(?<!})\}|{{|}}/g
    // match[1] captures the variable name if it's a real placeholder.
    // If match[1] is undefined, it means it matched '{{' or '}}' (escaped braces).
    return !!(match && match.index === 0 && match[0].length === template.length && match[1] !== undefined)
  }

  static isTemplate(templateOpt: StringTemplateOptions|string) {
    let compiledTemplate: any
    let template: string
    let result = false

    if (typeof templateOpt === 'object') {
      template = templateOpt.template as string
      compiledTemplate = templateOpt.compiledTemplate
    } else {
      template = templateOpt as string
    }

    if (!compiledTemplate && template) {
      try {
        compiledTemplate = parseFString(template)
      } catch (_err) {}
    }

    if (compiledTemplate) {
      const vars = getVariables(compiledTemplate)
      result = vars.length > 0
    }
    return result
  }

  getVariables(template: FStringTemplateNode[] = this.compiledTemplate) {
    return getVariables(template)
  }

  _initialize(options?: StringTemplateOptions) {
    const template = options?.template
    if (typeof template !== 'string') {
      throw new CommonError('Prompt template must be a string', 'PromptTemplate', ErrorCode.InvalidArgument)
    }
    this.compiledTemplate = parseFString(template)
    this.inputVariables = Array.isArray(options?.inputVariables) ? options.inputVariables : this.getVariables()
  }

  _format(data: Record<string, any>): string {
    return interpolateFString(this.compiledTemplate, data)
  }

}

StringTemplate.register(FStringTemplate,{name: 'fstring', aliases: ['python', 'f-string', 'langchain']})