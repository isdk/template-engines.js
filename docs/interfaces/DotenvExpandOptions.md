[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / DotenvExpandOptions

# Interface: DotenvExpandOptions

Defined in: [@isdk/ai-tools/packages/template-engines/src/template/env.ts:275](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/template/env.ts#L275)

## Properties

### error?

> `optional` **error?**: `Error`

Defined in: [@isdk/ai-tools/packages/template-engines/src/template/env.ts:276](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/template/env.ts#L276)

***

### parsed?

> `optional` **parsed?**: [`DotenvParseInput`](DotenvParseInput.md)

Defined in: [@isdk/ai-tools/packages/template-engines/src/template/env.ts:292](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/template/env.ts#L292)

Default: `object`

Object coming from dotenv's parsed result.

***

### processEnv?

> `optional` **processEnv?**: [`DotenvPopulateInput`](DotenvPopulateInput.md)

Defined in: [@isdk/ai-tools/packages/template-engines/src/template/env.ts:285](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/template/env.ts#L285)

Default: `process.env`

Specify an object to write your secrets to. Defaults to process.env environment variables.

example: `const processEnv = {}; require('dotenv').config({ processEnv: processEnv })`
