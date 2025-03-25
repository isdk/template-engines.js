[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / expandEnv

# Function: expandEnv()

> **expandEnv**(`options`): [`DotenvExpandOptions`](../interfaces/DotenvExpandOptions.md)

Defined in: [packages/template-engines/src/template/env.ts:98](https://github.com/isdk/template-engines.js/blob/cb1445972f4290df93d1730f7569a7c44b07e85e/src/template/env.ts#L98)

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
