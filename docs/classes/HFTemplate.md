[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / HFTemplate

# Class: HFTemplate

Defined in: [@isdk/ai-tools/packages/template-engines/src/template/jinja/src/index.ts:22](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/template/jinja/src/index.ts#L22)

## Constructors

### Constructor

> **new HFTemplate**(`template`, `options?`): `Template`

Defined in: [@isdk/ai-tools/packages/template-engines/src/template/jinja/src/index.ts:30](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/template/jinja/src/index.ts#L30)

#### Parameters

##### template

`string`

The template string

##### options?

`PreprocessOptions` = `{}`

#### Returns

`Template`

## Properties

### parsed

> **parsed**: `Program`

Defined in: [@isdk/ai-tools/packages/template-engines/src/template/jinja/src/index.ts:23](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/template/jinja/src/index.ts#L23)

***

### global

> `static` **global**: [`HFEnvironment`](HFEnvironment.md)

Defined in: [@isdk/ai-tools/packages/template-engines/src/template/jinja/src/index.ts:25](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/template/jinja/src/index.ts#L25)

## Methods

### render()

> **render**(`items?`): `string`

Defined in: [@isdk/ai-tools/packages/template-engines/src/template/jinja/src/index.ts:40](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/template/jinja/src/index.ts#L40)

#### Parameters

##### items?

`Record`\<`string`, `unknown`\>

#### Returns

`string`
