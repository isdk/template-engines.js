[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / HFBuiltins

# Variable: HFBuiltins

> `const` **HFBuiltins**: `object`

Defined in: [packages/template-engines/src/template/jinja/src/builtins.ts:68](https://github.com/isdk/template-engines.js/blob/cb1445972f4290df93d1730f7569a7c44b07e85e/src/template/jinja/src/builtins.ts#L68)

## Type declaration

### join()

> **join**: (`value`, `separator`) => `any`

#### Parameters

##### value

`any`

##### separator

`string` = `','`

#### Returns

`any`

### randomInt()

> **randomInt**: (`to`, `from`) => `number`

#### Parameters

##### to

`number`

##### from

`number` = `0`

#### Returns

`number`

### select()

> **select**: (`obj`, `index`?) => `any`

Selects an element from the given object, array, or string.

#### Parameters

##### obj

`any`

Can be an object, array, or string to select from.

##### index?

Optional, specifies the index or key to select. Negative values indicate indices from the end.

`string` | `number`

#### Returns

`any`

The selected element, or `undefined` if the input is empty or not provided.

#### Examples

```ts
// Selecting an element from an array
const array = ['apple', 'banana', 'cherry']
console.log(select(array)) // Random element from the array
console.log(select(array, 1)) // Second element
console.log(select(array, -1)) // Last element
```

```ts
// Selecting a property from an object
const obj = { fruit1: 'apple', fruit2: 'banana', fruit3: 'cherry' }
console.log(select(obj)) // Random property from the object
console.log(select(obj, 'fruit2')) // Property with key 'fruit2'
```

```ts
// Selecting a character from a string
const str = 'hello'
console.log(select(str)) // Random character from the string
console.log(select(str, 1)) // Second character
console.log(select(str, -1)) // Last character
```

### tojson()

> **tojson**: (`value`, `indent`?, `depth`?) => `string`

#### Parameters

##### value

`any`

##### indent?

`number` | \{ `depth`: `number`; `indent`: `number`; \}

##### depth?

`number`

#### Returns

`string`
