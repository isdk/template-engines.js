[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / expandObjEnv

# Function: expandObjEnv()

> **expandObjEnv**(`obj`, `options?`, `parsedObjs?`): `any`

Defined in: [@isdk/ai-tools/packages/template-engines/src/template/env.ts:214](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/template/env.ts#L214)

Expands environment variables in an object/array or string.

This function replaces placeholders like `${VAR}` in strings and recursively
processes objects and arrays with environment variable references.

## Parameters

### obj

`any`

The object/array or string to be processed. Can be any value, but
             primarily designed for objects, array and strings.

### options?

[`DotenvExpandOptions`](../interfaces/DotenvExpandOptions.md) = `{}`

Configuration options:
  - processEnv: - An object to source environment variables from, defaults to `process.env`.
  - parsed: - Specify an object to provide the value of environment variables.

### parsedObjs?

`WeakSet`\<`any`\>

## Returns

`any`

- Returns the expanded object or string.

## Example

```ts
const obj = {
  name: 'MyApp',
  envVar: '${ENV_VAR_NAME}',
  config: {
    url: 'http://${HOST}:${PORT}'
  },
  list: ['item1', '${ITEM2}']
};
// the expandedObj will have the actual values instead of placeholders.
const expandedObj = expandObjEnv(obj, { processEnv: myCustomEnv }); // Assuming 'ENV_VAR_NAME' is defined as 'Production' and 'HOST', 'PORT', 'ITEM2' are set,
```
