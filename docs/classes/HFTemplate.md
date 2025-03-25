[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / HFTemplate

# Class: HFTemplate

Defined in: [packages/template-engines/src/template/jinja/src/index.ts:22](https://github.com/isdk/template-engines.js/blob/cb1445972f4290df93d1730f7569a7c44b07e85e/src/template/jinja/src/index.ts#L22)

## Constructors

### new HFTemplate()

> **new HFTemplate**(`template`, `options`): [`HFTemplate`](HFTemplate.md)

Defined in: [packages/template-engines/src/template/jinja/src/index.ts:30](https://github.com/isdk/template-engines.js/blob/cb1445972f4290df93d1730f7569a7c44b07e85e/src/template/jinja/src/index.ts#L30)

#### Parameters

##### template

`string`

The template string

##### options

`PreprocessOptions` = `{}`

#### Returns

[`HFTemplate`](HFTemplate.md)

## Properties

### parsed

> **parsed**: `Program`

Defined in: [packages/template-engines/src/template/jinja/src/index.ts:23](https://github.com/isdk/template-engines.js/blob/cb1445972f4290df93d1730f7569a7c44b07e85e/src/template/jinja/src/index.ts#L23)

***

### global

> `static` **global**: [`HFEnvironment`](HFEnvironment.md)

Defined in: [packages/template-engines/src/template/jinja/src/index.ts:25](https://github.com/isdk/template-engines.js/blob/cb1445972f4290df93d1730f7569a7c44b07e85e/src/template/jinja/src/index.ts#L25)

## Methods

### render()

> **render**(`items`?): `string`

Defined in: [packages/template-engines/src/template/jinja/src/index.ts:40](https://github.com/isdk/template-engines.js/blob/cb1445972f4290df93d1730f7569a7c44b07e85e/src/template/jinja/src/index.ts#L40)

#### Parameters

##### items?

`Record`\<`string`, `unknown`\>

#### Returns

`string`
