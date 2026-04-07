[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / expandEnv

# Function: expandEnv()

> **expandEnv**(`options`): [`DotenvExpandOptions`](../interfaces/DotenvExpandOptions.md)

Defined in: [packages/template-engines/src/template/env.ts:121](https://github.com/isdk/template-engines.js/blob/7dade55e7c19979497e3b2db807022ef515c1e84/src/template/env.ts#L121)

Expand environment variables in the parsed object

## Parameters

### options

[`DotenvExpandOptions`](../interfaces/DotenvExpandOptions.md)

## Returns

[`DotenvExpandOptions`](../interfaces/DotenvExpandOptions.md)

## Example

```ts
const myEnv = {}
const env = {
  processEnv: myEnv,
  parsed: {
    WORD: 'World',
    HELLO: 'Hello ${WORD}'
  }
}
expandEnv.expand(env)

console.log(myEnv.HELLO) // Hello World
console.log(process.env.HELLO) // undefined
```
