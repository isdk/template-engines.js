[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / expandEnv

# Function: expandEnv()

> **expandEnv**(`options`): [`DotenvExpandOptions`](../interfaces/DotenvExpandOptions.md)

Defined in: [packages/template-engines/src/template/env.ts:111](https://github.com/isdk/template-engines.js/blob/e7fd5627a87b9ce2ab4df5ca32d567c23479ef12/src/template/env.ts#L111)

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
