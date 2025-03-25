import {EnvStringTemplate} from './env-template'
import {StringTemplate} from './string-template'

describe('EnvStringTemplate', () => {
  it('should get inputVariables from template', () => {
    let template = EnvStringTemplate.from('${strings}: ${a} + ${b}')
    expect(template.inputVariables).toStrictEqual(['strings', 'a', 'b'])
  })

  it('should get registered PromptTemplate', () => {
    expect(StringTemplate.get('env')).toStrictEqual(EnvStringTemplate)
    expect(StringTemplate.get('js')).toStrictEqual(EnvStringTemplate)
    expect(StringTemplate.get('javascript')).toStrictEqual(EnvStringTemplate)
    expect(new StringTemplate('${text}', {templateFormat: 'env'})).toBeInstanceOf(EnvStringTemplate)
  })

  it('should pass PromptTemplate to value', async () => {
    const systemTemplate = EnvStringTemplate.from('You are a helpful assistant that translates ${input_language} to ${output_language}.')
    const humanTemplate = EnvStringTemplate.from('${text}')
    const template = EnvStringTemplate.from('${system_template}\n${human_template}')
    let result = await template.format({
      system_template: systemTemplate,
      human_template: humanTemplate,
      input_language: 'English',
      output_language: 'Chinese',
      text: 'Hello, how are you?'
    })
    expect(result).toStrictEqual('You are a helpful assistant that translates English to Chinese.\nHello, how are you?')
  })

  it('should format text without required variables', async () => {
    expect(await EnvStringTemplate.from('hi${text}').format({})).toStrictEqual('hi')
  })

  it('should format text with required variables', async () => {
    expect(await EnvStringTemplate.from('hi ${text}').format({text: 'world'})).toStrictEqual('hi world')
    expect(await EnvStringTemplate.from('hi ${text}', {data: {text: 'world'}}).format()).toStrictEqual('hi world')
  })

  it('should get partial PromptTemplate(string)', async () => {
    const promptTemplate = new StringTemplate('${role}:${text}', {templateFormat: 'js'})
    const p = promptTemplate.partial({role: 'user'})
    expect(p).toBeInstanceOf(EnvStringTemplate)
    expect(p.data).toStrictEqual({role: 'user'})
    expect(await p.format({text: 'hello'})).toStrictEqual('user:hello')
  })

  it('should get partial PromptTemplate(function)', async () => {
    const promptTemplate = new StringTemplate('${role}:${date}', {templateFormat: 'js'})
    const dt = new Date()
    function getDate() {
      // console.log('getDate......', arguments)
      return dt.toISOString()
    }
    const p = promptTemplate.partial({date: getDate})
    expect(p).toBeInstanceOf(EnvStringTemplate)
    expect(p.data).toStrictEqual({date: getDate})
    expect(await p.format({role: 'user'})).toStrictEqual('user:'+dt.toISOString())
  })
  it('should format directly by PromptTemplate', async () => {
    expect(await StringTemplate.format({template: '${text} world', data: {text: 'hello'}, templateFormat: 'env'})).toStrictEqual('hello world')
  })

  it('should format directly by PromptTemplate without template variable', async () => {
    expect(await StringTemplate.format({template: 'hello world', data: {text: 'hello'}, templateFormat: 'env'})).toStrictEqual('hello world')
  })

  it('should test isTemplate', () => {
    expect(EnvStringTemplate.isTemplate({template: '${strings}: ${a} + ${b}'})).toBeTruthy()
    expect(EnvStringTemplate.isTemplate({template: 'a ${strings '})).toBeFalsy()
  })

  it('should test isTemplate directly by PromptTemplate', async () => {
    expect(StringTemplate.isTemplate({template: '${text} world', templateFormat: 'js'})).toBeTruthy()
  })

})