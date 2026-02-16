import { HFTemplate } from "./template/jinja"
import { StringTemplate, StringTemplateOptions } from "./string-template"
import { CommonError, ErrorCode, } from '@isdk/common-error'

function getVariable(statement: any, internalVars?: string[]) {
  let result: string|undefined
  switch (statement.type) {
    case 'Identifier': {
      result = statement.value
      break
    }
    case 'MemberExpression': {
      result = getVariable(statement.object, internalVars)
      break
    }
    case 'FilterExpression': {
      result = getVariable(statement.operand, internalVars)
      break
    }
    case 'Set': {
      if (!internalVars) {internalVars = []}
      const assignee = getVariable(statement.assignee)
      if (assignee) {internalVars.push(assignee)}
      result = getVariable(statement.value, internalVars)
      break
    }
  }

  if (result && internalVars?.includes(result)) {
    result = undefined
  }
  return result
}

function isTemplate(statement: any) {
  let result: boolean
  switch (statement.type) {
    case 'Program': {
      result = statement.body.some((item)=>isTemplate(item))
      break
    }
    default: {
      result = statement.isStatement
    }
  }
  return result
}

function getVariables(statement: any, internalVars?: string[]) {
  let result: string[] = []
  if (Array.isArray(statement)) {
    result = statement.map((item)=>getVariables(item, internalVars)).filter(Boolean).flat() as string[]
  } else {
    switch (statement.type) {
      case 'Program': {
        result = statement.body.map((item)=>getVariables(item, internalVars)).filter(Boolean).flat()
        break
      }
      case 'If': {
        result = [getVariable(statement.test, internalVars), ...getVariables(statement.body, internalVars), ...getVariables(statement.alternate, internalVars)].filter(Boolean) as string[]
        break
      }
      case 'BinaryExpression': {
        result = [getVariable(statement.left, internalVars), getVariable(statement.right, internalVars)].filter(Boolean) as string[]
        break
      }
      case 'For': {
        const loopVar = getVariable(statement.loopvar)
        if (loopVar) {
          if (!internalVars) {internalVars = []}
          internalVars.push(loopVar)
        }
        result = [getVariable(statement.iterable, internalVars), ...getVariables(statement.body, internalVars)].filter(Boolean) as string[]
        break
      }
      case 'CallExpression': {
        result = [getVariable(statement.callee, internalVars), ...getVariables(statement.args, internalVars)].filter(Boolean) as string[]
        break
      }
      default: {
        result = [getVariable(statement, internalVars)].filter(Boolean) as string[]
      }
    }
  }
  return result
}

export class HfStringTemplate extends StringTemplate {
  declare compiledTemplate: HFTemplate

  static matchTemplateSegment(template: StringTemplateOptions|string, index: number = 0) {
    if (typeof template === 'object') {
      if (template.index) index = template.index
      template = template.template!
    }
    const regex =/\{\{.+?\}\}|\{([%#]).*?\1\}/gs
    regex.lastIndex = index
    const matched = regex.exec(template)
    if (matched) {
      return matched
    }
  }

  static isPurePlaceholder(templateOpt: StringTemplateOptions | string): boolean {
    let template = typeof templateOpt === 'object' ? templateOpt.template : templateOpt
    if (!template) return false

    template = template.trim()
    const match = this.matchTemplateSegment(template, 0)
    // match[1] captures '%' for statements or '#' for comments in HfStringTemplate regex.
    // A pure placeholder must be an expression {{ ... }}, so match[1] should be undefined.
    return !!(match && match.index === 0 && match[0].length === template.length && !match[1])
  }

  static isTemplate(templateOpt: StringTemplateOptions|string): boolean {
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
        compiledTemplate = new HFTemplate(template)
      } catch (error) {
        // console.error(error)
      }
    }

    if (compiledTemplate) {
        result = isTemplate(compiledTemplate.parsed)
    }
    return result
  }

  getVariables(template: HFTemplate = this.compiledTemplate) {
    const internalVars = []
    // get variables and remove duplication items
    const result = getVariables(template.parsed, internalVars).filter((item, index, self) => self.indexOf(item) === index)
    return result
  }

  _initialize(options?: StringTemplateOptions) {
    const template = options?.template
    if (typeof template !== 'string') {
      throw new CommonError('Prompt template must be a string', 'PromptTemplate', ErrorCode.InvalidArgument)
    }
    this.compiledTemplate = new HFTemplate(template)
    this.inputVariables = Array.isArray(options?.inputVariables) ? options.inputVariables : this.getVariables()
  }

  _format(data: Record<string, any>): string {
    // throw error if self references object in the data
    detectCircularReference(data, '', new WeakMap())

    return this.compiledTemplate.render(data)
  }
}

StringTemplate.register(HfStringTemplate,{name: 'hf', aliases: ['huggingface', 'internal', 'default']})

// note:
//  the PromptTemplate will call the func first to get the init data, so you must return the function to execute in HF-template

export function createHfValueFunc(fn: Function) {
  return function(_data: any) {
    return fn
  }
}

/**
 * Checks if the given value contains a circular reference.
 * @throws {Error} If a circular reference is detected.
 * @param value - The value to check.
 * @param path - Current path in the object graph for error reporting.
 * @param visited - A map to track visited objects and their paths.
 */
function detectCircularReference(value: any, path: string, visited: WeakMap<object, string>) {
  if (!value || typeof value !== 'object') { return }
  const visitedPath = visited.get(value)
  visited.set(value, path)
  if (visitedPath !== undefined) {
    if (path.startsWith(visitedPath)) {
      throw new Error(`Circular reference detected: ${visitedPath} -> ${path}`)
    }
  }
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      detectCircularReference(value[i], `${path}[${i}]`, visited)
    }
  } else {
    for (const [key, val] of Object.entries(value)) {
      detectCircularReference(val, `${path}.${key}`, visited)
    }
  }
}
