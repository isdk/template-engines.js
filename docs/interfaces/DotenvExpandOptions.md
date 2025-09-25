[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / DotenvExpandOptions

# Interface: DotenvExpandOptions

Defined in: [packages/template-engines/src/template/env.ts:216](https://github.com/isdk/template-engines.js/blob/ac967510ba7106fd9435480a9cf25b40e72c30bc/src/template/env.ts#L216)

## Properties

### error?

> `optional` **error**: `Error`

Defined in: [packages/template-engines/src/template/env.ts:217](https://github.com/isdk/template-engines.js/blob/ac967510ba7106fd9435480a9cf25b40e72c30bc/src/template/env.ts#L217)

***

### parsed?

> `optional` **parsed**: [`DotenvParseInput`](DotenvParseInput.md)

Defined in: [packages/template-engines/src/template/env.ts:233](https://github.com/isdk/template-engines.js/blob/ac967510ba7106fd9435480a9cf25b40e72c30bc/src/template/env.ts#L233)

Default: `object`

Object coming from dotenv's parsed result.

***

### processEnv?

> `optional` **processEnv**: [`DotenvPopulateInput`](DotenvPopulateInput.md)

Defined in: [packages/template-engines/src/template/env.ts:226](https://github.com/isdk/template-engines.js/blob/ac967510ba7106fd9435480a9cf25b40e72c30bc/src/template/env.ts#L226)

Default: `process.env`

Specify an object to write your secrets to. Defaults to process.env environment variables.

example: `const processEnv = {}; require('dotenv').config({ processEnv: processEnv })`
