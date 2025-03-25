import {FStringTemplate} from './f-string-template'
import {StringTemplate} from './template'

describe('FStringTemplate', () => {
  it('should get inputVariables from template', () => {
    let template = FStringTemplate.from(`{strings}: {a} + {b}`)
    expect(template.inputVariables).toStrictEqual(['strings', 'a', 'b'])
  })

  it('should get registered PromptTemplate', () => {
    expect(StringTemplate.get('fstring')).toStrictEqual(FStringTemplate)
    expect(StringTemplate.get('python')).toStrictEqual(FStringTemplate)
    expect(StringTemplate.get('f-string')).toStrictEqual(FStringTemplate)
    expect(StringTemplate.get('langchain')).toStrictEqual(FStringTemplate)
    expect(new StringTemplate('{text}', {templateFormat: 'fstring'})).toBeInstanceOf(FStringTemplate)
  })

  it('should pass PromptTemplate to value', async () => {
    const systemTemplate = FStringTemplate.from(`You are a helpful assistant that translates {input_language} to {output_language}.`)
    const humanTemplate = FStringTemplate.from(`{text}`)
    const template = FStringTemplate.from(`{system_template}\n{human_template}`)
    let result = await template.format({
      system_template: systemTemplate,
      human_template: humanTemplate,
      input_language: 'English',
      output_language: 'Chinese',
      text: 'Hello, how are you?'
    })
    expect(result).toStrictEqual(`You are a helpful assistant that translates English to Chinese.\nHello, how are you?`)
  })

  it('should format text without required variables', async () => {
    expect(await FStringTemplate.from(`hi{text}`).format({})).toStrictEqual('hi')
  })

  it('should format text with required variables', async () => {
    expect(await FStringTemplate.from(`hi {text}`).format({text: 'world'})).toStrictEqual('hi world')
    expect(await FStringTemplate.from(`hi {text}`, {data: {text: 'world'}}).format()).toStrictEqual('hi world')
  })

  it('should get partial PromptTemplate(string)', async () => {
    const promptTemplate = new StringTemplate('{role}:{text}', {templateFormat: 'fstring'})
    const p = promptTemplate.partial({role: 'user'})
    expect(p).toBeInstanceOf(FStringTemplate)
    expect(p.data).toStrictEqual({role: 'user'})
    expect(await p.format({text: 'hello'})).toStrictEqual('user:hello')
  })

  it('should get partial PromptTemplate(function)', async () => {
    const promptTemplate = new StringTemplate('{role}:{date}', {templateFormat: 'fstring'})
    const dt = new Date()
    function getDate() {
      // console.log('getDate......', arguments)
      return dt.toISOString()
    }
    const p = promptTemplate.partial({date: getDate})
    expect(p).toBeInstanceOf(FStringTemplate)
    expect(p.data).toStrictEqual({date: getDate})
    expect(await p.format({role: 'user'})).toStrictEqual('user:'+dt.toISOString())
  })
  it('should format directly by PromptTemplate', async () => {
    expect(await StringTemplate.format({template: '{text} world', data: {text: 'hello'}, templateFormat: 'langchain'})).toStrictEqual('hello world')
  })

  it('should format directly by PromptTemplate without template variable', async () => {
    expect(await StringTemplate.format({template: 'hello world', data: {text: 'hello'}, templateFormat: 'langchain'})).toStrictEqual('hello world')
  })

  it('should test isTemplate', () => {
    expect(FStringTemplate.isTemplate({template: '{strings}: {a} + {b}'})).toBeTruthy()
    expect(FStringTemplate.isTemplate({template: 'a {strings '})).toBeFalsy()
  })

  it('should test isTemplate directly by PromptTemplate', async () => {
    expect(StringTemplate.isTemplate({template: '{text} world', templateFormat: 'langchain'})).toBeTruthy()
  })

})