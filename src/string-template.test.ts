import { HfStringTemplate } from './hf-template'
import { StringTemplate, StringTemplateOptions } from './string-template'
import { getValueByPath } from './template/util'

class TestStringTemplate extends StringTemplate {
  _initialize(options?: StringTemplateOptions | undefined): void {}
  _format(data: any) {
    return data
  }
  static matchTemplateSegment(templateOpt: StringTemplateOptions, index = 0) {
    const regex = /{{(.*?)}}/g
    const template =
      typeof templateOpt === 'string' ? templateOpt : templateOpt.template
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
    expect(
      new StringTemplate('{{text}}', { templateFormat: 'Test' })
    ).toBeInstanceOf(TestStringTemplate)
  })

  it('should test isTemplate', () => {
    expect(
      StringTemplate.isTemplate({ template: `a {{genre }}.` })
    ).toBeTruthy()
  })

  it('should get partial PromptTemplate(string)', async () => {
    const promptTemplate = new StringTemplate('{{role}}:{{text}}', {
      templateFormat: 'Test',
    })
    const p = promptTemplate.partial({ role: 'user' })
    expect(p).toBeInstanceOf(TestStringTemplate)
    expect(p.data).toStrictEqual({ role: 'user' })
    expect(await p.format({ text: 'hello' })).toStrictEqual({
      role: 'user',
      text: 'hello',
    })
  })

  it('should get partial PromptTemplate(function)', async () => {
    const promptTemplate = new StringTemplate('{{role}}:{{date}}', {
      templateFormat: 'Test',
    })
    const dt = new Date()
    function getDate() {
      // console.log('getDate......', arguments)
      return dt
    }
    const p = promptTemplate.partial({ date: getDate })
    expect(p).toBeInstanceOf(TestStringTemplate)
    expect(p.data).toStrictEqual({ date: getDate })
    expect(await p.format({ role: 'user' })).toStrictEqual({
      role: 'user',
      date: dt,
    })
  })

  describe('isPurePlaceholder', () => {
    it('should test isPurePlaceholder on instance', () => {
      const template = StringTemplate.from('{{text}}', {
        templateFormat: 'Test',
      })
      expect(template.isPurePlaceholder()).toBe(true)

      const mixed = StringTemplate.from('Hello {{text}}', {
        templateFormat: 'Test',
      })
      expect(mixed.isPurePlaceholder()).toBe(false)
    })
  })

  describe('getPurePlaceholderVariable', () => {
    it('should get variable name from pure placeholder', () => {
      expect(
        StringTemplate.getPurePlaceholderVariable({
          template: '{{text}}',
          templateFormat: 'Test',
        })
      ).toBe('text')
      // Note: TestStringTemplate doesn't trim, so it's ' text '
      expect(
        StringTemplate.getPurePlaceholderVariable({
          template: '  {{ text }}  ',
          templateFormat: 'Test',
        })
      ).toBe(' text ')

      const template = StringTemplate.from('{{text}}', {
        templateFormat: 'Test',
      })
      expect(template.getPurePlaceholderVariable()).toBe('text')
    })

    it('should return undefined for non-pure placeholder', () => {
      expect(
        StringTemplate.getPurePlaceholderVariable({
          template: 'Hello {{text}}',
          templateFormat: 'Test',
        })
      ).toBeUndefined()
    })
  })

  describe('format with raw option', () => {
    it('should return raw object for pure placeholder', async () => {
      const data = { user: { name: 'Alice', age: 30 } }
      const result = await StringTemplate.format({
        template: '{{user}}',
        data,
        templateFormat: 'Test',
        raw: true,
      })
      expect(result).toStrictEqual(data.user)
    })

    it('should return raw boolean for pure placeholder', async () => {
      const data = { active: true }
      const result = await StringTemplate.format({
        template: '{{active}}',
        data,
        templateFormat: 'Test',
        raw: true,
      })
      expect(result).toBe(true)
    })

    it('should return raw value from deep path', async () => {
      const data = { a: { b: { c: 123 } } }
      const result = await StringTemplate.format({
        template: '{{a.b.c}}',
        data,
        templateFormat: 'Test',
        raw: true,
      })
      expect(result).toBe(123)
    })

    it('should handle nested templates with raw option', async () => {
      const subTemplate = new StringTemplate('{{value}}', {
        templateFormat: 'Test',
      })
      const data = { item: subTemplate, value: { id: 1 } }
      const result = await StringTemplate.format({
        template: '{{item}}',
        data,
        templateFormat: 'Test',
        raw: true,
      })
      expect(result).toStrictEqual(data.value)
    })

    it('should fallback to string if not pure placeholder even with raw: true', async () => {
      const data = { name: 'Alice' }
      const result = await StringTemplate.format({
        template: 'Hello {{name}}',
        data,
        templateFormat: 'hf',
        raw: true,
      })
      expect(result).toBe('Hello Alice')
    })

    it('should fallback to normal format if raw value is undefined', async () => {
      const result = await StringTemplate.format({
        template: '{{nonexistent}}',
        data: {},
        templateFormat: 'hf',
        raw: true,
      })
      expect(result).toBe('')
    })
  })
})
