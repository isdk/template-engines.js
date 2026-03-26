[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / DotenvExpandOptions

# Interface: DotenvExpandOptions

Defined in: [packages/template-engines/src/template/env.ts:240](https://github.com/isdk/template-engines.js/blob/8468b3d69f22c554f3c3c1a209861ed95f2c96bb/src/template/env.ts#L240)

## Properties

### error?

> `optional` **error**: `Error`

Defined in: [packages/template-engines/src/template/env.ts:241](https://github.com/isdk/template-engines.js/blob/8468b3d69f22c554f3c3c1a209861ed95f2c96bb/src/template/env.ts#L241)

***

### parsed?

> `optional` **parsed**: [`DotenvParseInput`](DotenvParseInput.md)

Defined in: [packages/template-engines/src/template/env.ts:257](https://github.com/isdk/template-engines.js/blob/8468b3d69f22c554f3c3c1a209861ed95f2c96bb/src/template/env.ts#L257)

Default: `object`

Object coming from dotenv's parsed result.

***

### processEnv?

> `optional` **processEnv**: [`DotenvPopulateInput`](DotenvPopulateInput.md)

Defined in: [packages/template-engines/src/template/env.ts:250](https://github.com/isdk/template-engines.js/blob/8468b3d69f22c554f3c3c1a209861ed95f2c96bb/src/template/env.ts#L250)

Default: `process.env`

Specify an object to write your secrets to. Defaults to process.env environment variables.

example: `const processEnv = {}; require('dotenv').config({ processEnv: processEnv })`
