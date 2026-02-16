import {HfStringTemplate} from './hf-template'
import {StringTemplate, StringTemplateOptions} from './string-template'

class TestStringTemplate extends StringTemplate {
  _initialize(options?: StringTemplateOptions | undefined): void {

  }
  _format(data: any) {
    return data
  }
  static matchTemplateSegment(templateOpt: StringTemplateOptions, index = 0) {
    const regex = /{{(.*?)}}/g
    const template = typeof templateOpt === 'string' ? templateOpt : templateOpt.template
    regex.lastIndex = index
    return regex.exec(template!) as any
  }
}

describe('Template', () => {
  beforeAll(() => {
    // @ts-ignore
    StringTemplate.register(TestStringTemplate)
    StringTemplate.register(HfStringTemplate)
  })
  afterAll(() => {
    // @ts-ignore
    StringTemplate.unregister(TestStringTemplate)
    StringTemplate.unregister(HfStringTemplate)
  })

  it('should get registered PromptTemplate', () => {
    expect(StringTemplate.get('Test')).toStrictEqual(TestStringTemplate)
    expect(new StringTemplate('{{text}}', {templateFormat: 'Test'})).toBeInstanceOf(TestStringTemplate)
  })

  it('should test isTemplate', () => {
    expect(StringTemplate.isTemplate({template: `a {{genre }}.`})).toBeTruthy()
  })

  it('should get partial PromptTemplate(string)', async () => {
    const promptTemplate = new StringTemplate('{{role}}:{{text}}', {templateFormat: 'Test'})
    const p = promptTemplate.partial({role: 'user'})
    expect(p).toBeInstanceOf(TestStringTemplate)
    expect(p.data).toStrictEqual({role: 'user'})
    expect(await p.format({text: 'hello'})).toStrictEqual({role: 'user', text: 'hello'})
  })

  it('should get partial PromptTemplate(function)', async () => {
    const promptTemplate = new StringTemplate('{{role}}:{{date}}', {templateFormat: 'Test'})
    const dt = new Date()
    function getDate() {
      // console.log('getDate......', arguments)
      return dt
    }
    const p = promptTemplate.partial({date: getDate})
    expect(p).toBeInstanceOf(TestStringTemplate)
    expect(p.data).toStrictEqual({date: getDate})
    expect(await p.format({role: 'user'})).toStrictEqual({role: 'user', date: dt})
  })

  describe('isPurePlaceholder', () => {
    it('should test isPurePlaceholder on instance', () => {
      const template = StringTemplate.from('{{text}}', { templateFormat: 'Test' })
      expect(template.isPurePlaceholder()).toBe(true)

      const mixed = StringTemplate.from('Hello {{text}}', { templateFormat: 'Test' })
      expect(mixed.isPurePlaceholder()).toBe(false)
    })
  })
})
