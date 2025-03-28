[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / DotenvExpandOptions

# Interface: DotenvExpandOptions

Defined in: [packages/template-engines/src/template/env.ts:203](https://github.com/isdk/template-engines.js/blob/466ebe226b36554b365e0202c4f1d42ff9f95a09/src/template/env.ts#L203)

## Properties

### error?

> `optional` **error**: `Error`

Defined in: [packages/template-engines/src/template/env.ts:204](https://github.com/isdk/template-engines.js/blob/466ebe226b36554b365e0202c4f1d42ff9f95a09/src/template/env.ts#L204)

***

### parsed?

> `optional` **parsed**: [`DotenvParseInput`](DotenvParseInput.md)

Defined in: [packages/template-engines/src/template/env.ts:220](https://github.com/isdk/template-engines.js/blob/466ebe226b36554b365e0202c4f1d42ff9f95a09/src/template/env.ts#L220)

Default: `object`

Object coming from dotenv's parsed result.

***

### processEnv?

> `optional` **processEnv**: [`DotenvPopulateInput`](DotenvPopulateInput.md)

Defined in: [packages/template-engines/src/template/env.ts:213](https://github.com/isdk/template-engines.js/blob/466ebe226b36554b365e0202c4f1d42ff9f95a09/src/template/env.ts#L213)

Default: `process.env`

Specify an object to write your secrets to. Defaults to process.env environment variables.

example: `const processEnv = {}; require('dotenv').config({ processEnv: processEnv })`
