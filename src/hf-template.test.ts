import {HfStringTemplate, createHfValueFunc} from './hf-template'
import {StringTemplate} from './string-template'
import { HFTemplate } from './template/jinja'

describe('HfStringTemplate', () => {
  it('should use global env', async ()=> {
    HFTemplate.global.assign({
      say() {
        return 'hello'
      }
    })
    expect(await HfStringTemplate.from('{{say()}}').format()).toStrictEqual('hello')
    HFTemplate.global.clear()
  })
  it('should get inputVariables from template', () => {
    let template = HfStringTemplate.from(`{% for s in strings[:] %}{{ s }}{% endfor %} {{strings}} {{a+b}}`)
    expect(template.inputVariables).toStrictEqual(['strings', 'a', 'b'])
    template = HfStringTemplate.from(`{% if aa == 2 %}{{ aa }}{% else %}{{ bb }}{% endif %}{{ cc }}`)
    expect(template.inputVariables).toStrictEqual(['aa', 'bb', 'cc'])
    template = HfStringTemplate.from(`{% set aa = 2 %} {% if aa == 2 %}{{ aa }}{% else %}{{ bb }}{% endif %}{{ cc }}`)
    expect(template.inputVariables).toStrictEqual(['bb', 'cc'])
    template = HfStringTemplate.from(`{{ cc.abc }}`)
    expect(template.inputVariables).toStrictEqual(['cc'])
  })

  it('should get registered PromptTemplate', () => {
    expect(StringTemplate.get('hf')).toStrictEqual(HfStringTemplate)
    expect(StringTemplate.get('internal')).toStrictEqual(HfStringTemplate)
    expect(StringTemplate.get('huggingface')).toStrictEqual(HfStringTemplate)
    expect(StringTemplate.get('default')).toStrictEqual(HfStringTemplate)
    expect(new StringTemplate('{{text}}', {templateFormat: 'hf'})).toBeInstanceOf(HfStringTemplate)
    expect(new StringTemplate('{{text}}')).toBeInstanceOf(HfStringTemplate)
  })

  it('should pass PromptTemplate to value', async () => {
    const systemTemplate = HfStringTemplate.from(`You are a helpful assistant that translates {{input_language}} to {{output_language}}.`)
    const humanTemplate = HfStringTemplate.from(`{{text}}`)
    const template = HfStringTemplate.from(`{{system_template}}\n{{human_template}}`)
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
    expect(await HfStringTemplate.from(`hi{{text}}`).format({})).toStrictEqual('hi')
  })

  it('should format text with required variables', async () => {
    expect(await HfStringTemplate.from(`hi {{text}}`).format({text: 'world'})).toStrictEqual('hi world')
    expect(await HfStringTemplate.from(`hi {{text}}`, {data: {text: 'world'}}).format()).toStrictEqual('hi world')
  })

  it('should get partial PromptTemplate(string)', async () => {
    const promptTemplate = new StringTemplate('{{role}}:{{text}}', {templateFormat: 'hf'})
    const p = promptTemplate.partial({role: 'user'})
    expect(p).toBeInstanceOf(HfStringTemplate)
    expect(p.data).toStrictEqual({role: 'user'})
    expect(await p.format({text: 'hello'})).toStrictEqual('user:hello')
  })

  it('should get partial PromptTemplate(function)', async () => {
    const promptTemplate = new StringTemplate('{{role}}:{{date}}', {templateFormat: 'hf'})
    const dt = new Date()
    function getDate() {
      // console.log('getDate......', arguments)
      return dt.toISOString()
    }
    const p = promptTemplate.partial({date: getDate})
    expect(p).toBeInstanceOf(HfStringTemplate)
    expect(p.data).toStrictEqual({date: getDate})
    expect(await p.format({role: 'user'})).toStrictEqual('user:'+dt.toISOString())
  })

  it('should format directly by PromptTemplate', async () => {
    expect(await StringTemplate.format({template: '{{text}} world', data: {text: 'hello'}})).toStrictEqual('hello world')
  })

  it('should format directly by PromptTemplate without template variable', async () => {
    expect(await StringTemplate.format({template: 'hello world', data: {text: 'hello'}})).toStrictEqual('hello world')
  })

  it('should format directly by PromptTemplate array last message', async () => {
    expect(await StringTemplate.format({
      template: `{{messages[-1]}}{% for message in messages %}{% if loop.last %}{{messages[-1]}}{% endif %}{% endfor %}`,
      data: {messages: ['hello', 'world', '!']},
    })).toStrictEqual('!!')
  })

  it('should format directly by PromptTemplate with custom functions', async () => {
    // note:
    //  1. the value in func is the hf template runtime value: AnyRuntimeValue(it not exported)
    //  2. the PromptTemplate will call the func first to get the init data, so you must return the function to execute in HF-template
    interface AnyRuntimeValue {
      value: any
      type: string
      builtins?: Map<string, AnyRuntimeValue>
    }

    expect(await StringTemplate.format({
      template: `{{ func(content) }}`,
      data: {
        content: ['hello', 'world', '!'],
        x:1,
        apple: 'pear',
        func: () => (content: string[]) => content.join(' ')
        // func: () => (content: AnyRuntimeValue) => content.value.map(i => i.value).join(' ')
        // func: function(...args) {
        //   return (content) => {
        //     console.log('func run...', content)
        //     return content.map(i => i.value).join(' ')
        //   }
        // },
      },
    })).toStrictEqual('hello world !')
  })

  it('should format directly by PromptTemplate with createHfValueFunc', async () => {
    // note:
    //  ~~1. the value in func is the hf template runtime value: AnyRuntimeValue(it not exported)~~ merged into jinja
    //  2. the PromptTemplate will call the func first to get the init data, so you must return the function to execute in HF-template
    interface AnyRuntimeValue {
      value: any
      type: string
      builtins?: Map<string, AnyRuntimeValue>
    }

    expect(await StringTemplate.format({
      template: `{{ func(content) }}`,
      data: {
        content: ['hello', 'world', '!'],
        x:1,
        apple: 'pear',
        func: createHfValueFunc(content => content.join(' '))
      },
    })).toStrictEqual('hello world !')
  })

  it('should format directly by PromptTemplate with createHfValueFunc for obj', async () => {
    expect(await StringTemplate.format({
      template: `{{ func(content) }}`,
      data: {
        content: {hi: 'world', x: 2, a: [1,29]},
        x:1,
        apple: 'pear',
        func: createHfValueFunc(content => Object.entries(content).flat().join(' '))
      },
    })).toStrictEqual('hi world x 2 a 1,29')
  })

  it('should format with createHfValueFunc by filter', async () => {
    expect(await StringTemplate.format({
      template: `{{ content | func }}`,
      data: {
        content: {hi: 'world', x: 2, a: [1,29]},
        x:1,
        apple: 'pear',
        func: createHfValueFunc(content => Object.entries(content).flat().join(' '))
      },
    })).toStrictEqual('hi world x 2 a 1,29')
  })

  it('should format with object::toString', async () => {
    const obj: any = {hi: 'world', x: 2}
    Object.defineProperty(obj, 'toString', {
      value: function() {
        return Object.entries(this).map(([k,v]) => `* ${k}: ${v}`).join('\n')
      },
      writable: true,
      enumerable: false,
      configurable: true,
    })
    const expected = obj.toString()

    expect(await StringTemplate.format({
      template: `{{ content }}`,
      data: {
        content: obj,
      },
    })).toStrictEqual(expected)
  })

  it('should format directly by PromptTemplate with obj', async () => {
    expect(await StringTemplate.format({
      template: `{{ content }}`,
      data: {
        content: {hi: 'world', x: 2, a: [1,29]},
        x:1,
        apple: 'pear',
      },
    })).toStrictEqual('{"hi":"world","x":2,"a":[1,29]}')
  })

  it('should format string with undefined value', async () => {
    const template = `{{name}}{{i['0']}}{{i['no']}}`
    //
    let result = await StringTemplate.format({
      template,
      data: {templateFormat: 'hf',
        type: 'char',
        name: '知识专家',
        i:{0: undefined}
      },
    });
    expect(result).toStrictEqual('知识专家')
  })

  it('should format string with shortcut or value', async () => {
    const template = `{{result or name}}`
    //
    let result = await StringTemplate.format({
      template,
      data: {templateFormat: 'hf',
        type: 'char',
        result: 'Yes',
        name: '知识专家',
        i:{0: undefined}
      },
    });
    expect(result).toStrictEqual('Yes')
  })

  describe('isTemplate', () => {
    it('should test isTemplate true', () => {
      expect(HfStringTemplate.isTemplate({template: '{{ strings }}: {{a}} + {b}'})).toBeTruthy()
      expect(HfStringTemplate.isTemplate({template: '{{ "hello world" }}'})).toBeTruthy()
      expect(HfStringTemplate.isTemplate({template: '{% if true %}hi{%endif%}'})).toBeTruthy()
    })

    it('should test isTemplate false', () => {
      expect(HfStringTemplate.isTemplate({template: 'Hi world\n'})).toBeFalsy()
      expect(HfStringTemplate.isTemplate({template: 'a {{strings '})).toBeFalsy()
      expect(HfStringTemplate.isTemplate({template: 'a {{strings }'})).toBeFalsy()
      expect(HfStringTemplate.isTemplate({template: '{{ "hello world }}'})).toBeFalsy()
    })

    it('should test isTemplate directly by PromptTemplate true', async () => {
      expect(StringTemplate.isTemplate({template: '{{text}} world'})).toBeTruthy()
    })

    it('should test isTemplate directly by PromptTemplate false', async () => {
      expect(StringTemplate.isTemplate({template: 'Hi world'})).toBeFalsy()
    })
  })

  describe('matchTemplateSegment', () => {
    it('should test matchTemplateSegment', () => {
      const templateStr = '{{  strings }}: {%- a%} + {{b}'
      let result = HfStringTemplate.matchTemplateSegment({template: templateStr})
      expect(result).toBeDefined()
      expect(result!.index).toStrictEqual(0)
      expect(result![0]).toBe('{{  strings }}')
      let pos = result![0].length
      result = HfStringTemplate.matchTemplateSegment({template: templateStr}, pos)
      expect(result).toBeDefined()
      expect(result!.index).toStrictEqual(pos+2)
      expect(result![0]).toBe('{%- a%}')
      pos = result!.index + result![0].length
      result = HfStringTemplate.matchTemplateSegment({template: templateStr}, pos)
      expect(result).toBeUndefined()
      expect(HfStringTemplate.matchTemplateSegment({template: 'a {{strings '})).toBeUndefined()
    })

    it('should test matchTemplateSegment by StringTemplate', () => {
      const templateStr = '{{  strings }}: {{a}} + {{b}'
      let result = StringTemplate.matchTemplateSegment({template: templateStr})
      expect(result).toBeDefined()
      expect(result!.index).toStrictEqual(0)
      expect(result![0]).toBe('{{  strings }}')
      let pos = result![0].length
      result = StringTemplate.matchTemplateSegment({template: templateStr}, pos)
      expect(result).toBeDefined()
      expect(result!.index).toStrictEqual(pos+2)
      expect(result![0]).toBe('{{a}}')
      pos = result!.index + result![0].length
      result = StringTemplate.matchTemplateSegment({template: templateStr}, pos)
      expect(result).toBeUndefined()
      expect(StringTemplate.matchTemplateSegment({template: 'a {{strings '})).toBeUndefined()
    })
  })
})
