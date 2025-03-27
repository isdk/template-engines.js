[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / GolangStringTemplate

# Class: GolangStringTemplate

Defined in: [packages/template-engines/src/golang-template.ts:5](https://github.com/isdk/template-engines.js/blob/466ebe226b36554b365e0202c4f1d42ff9f95a09/src/golang-template.ts#L5)

The `StringTemplate` class is a versatile template engine that supports dynamic template creation,
formatting, and partial data processing. It extends the `BaseFactory` class and provides methods
for handling template strings, validating input variables, and managing template configurations.

## Example

```typescript
import { StringTemplate } from './template';

// Register a custom template class
class CustomTemplate extends StringTemplate {
  _initialize(options?: StringTemplateOptions): void {}
  _format(data: Record<string, any>): string {
    return `Formatted: ${data.text}`;
  }
}
StringTemplate.register(CustomTemplate);

// Create a new instance with a custom template format
const template = new StringTemplate("{{text}}", { templateFormat: "Custom" });
console.log(template instanceof CustomTemplate); // Output: true

// Format the template with data
const result = await template.format({ text: "Hello World" });
console.log(result); // Output: "Formatted: Hello World"
```

## Extends

- [`StringTemplate`](StringTemplate.md)

## Constructors

### new GolangStringTemplate()

> **new GolangStringTemplate**(`template`?, `options`?): [`GolangStringTemplate`](GolangStringTemplate.md)

Defined in: [packages/template-engines/src/string-template.ts:187](https://github.com/isdk/template-engines.js/blob/466ebe226b36554b365e0202c4f1d42ff9f95a09/src/string-template.ts#L187)

Initializes a new instance of the `StringTemplate` class.

#### Parameters

##### template?

Either a template string or an options object.

`string` | [`StringTemplateOptions`](../interfaces/StringTemplateOptions.md)

##### options?

[`StringTemplateOptions`](../interfaces/StringTemplateOptions.md)

Additional configuration options for the template.

#### Returns

[`GolangStringTemplate`](GolangStringTemplate.md)

#### Example

```typescript
const template = new StringTemplate("{{text}}", {
  templateFormat: "Test",
  inputVariables: ['text']
});
console.log(template instanceof TestStringTemplate); // Output: true
```

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`constructor`](StringTemplate.md#constructors)

## Properties

### compiledTemplate

> **compiledTemplate**: `any`

Defined in: [packages/template-engines/src/string-template.ts:50](https://github.com/isdk/template-engines.js/blob/466ebe226b36554b365e0202c4f1d42ff9f95a09/src/string-template.ts#L50)

Declares the compiled template instance.

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`compiledTemplate`](StringTemplate.md#compiledtemplate)

***

### data

> **data**: `undefined` \| `Record`\<`string`, `any`\>

Defined in: [packages/template-engines/src/string-template.ts:62](https://github.com/isdk/template-engines.js/blob/466ebe226b36554b365e0202c4f1d42ff9f95a09/src/string-template.ts#L62)

Declares the data object used for template interpolation.

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`data`](StringTemplate.md#data)

***

### inputVariables

> **inputVariables**: `undefined` \| `string`[]

Defined in: [packages/template-engines/src/string-template.ts:66](https://github.com/isdk/template-engines.js/blob/466ebe226b36554b365e0202c4f1d42ff9f95a09/src/string-template.ts#L66)

Declares the list of input variables expected by the template.

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`inputVariables`](StringTemplate.md#inputvariables)

***

### template

> **template**: `string`

Defined in: [packages/template-engines/src/string-template.ts:54](https://github.com/isdk/template-engines.js/blob/466ebe226b36554b365e0202c4f1d42ff9f95a09/src/string-template.ts#L54)

Declares the raw template string.

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`template`](StringTemplate.md#template-1)

***

### templateFormat

> **templateFormat**: `undefined` \| `string`

Defined in: [packages/template-engines/src/string-template.ts:58](https://github.com/isdk/template-engines.js/blob/466ebe226b36554b365e0202c4f1d42ff9f95a09/src/string-template.ts#L58)

Declares the format of the template (e.g., 'default').

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`templateFormat`](StringTemplate.md#templateformat)

***

### \_aliases

> `abstract` `static` **\_aliases**: \[`string`\]

Defined in: node\_modules/.pnpm/custom-factory@2.3.0/node\_modules/custom-factory/lib/base-factory.d.ts:59

**`Internal`**

the registered alias items object.
the key is alias name, the value is the registered name

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`_aliases`](StringTemplate.md#_aliases)

***

### \_baseNameOnly

> `static` **\_baseNameOnly**: `number`

Defined in: node\_modules/.pnpm/custom-factory@2.3.0/node\_modules/custom-factory/lib/base-factory.d.ts:82

**`Internal`**

Extracts a specified number of words from a PascalCase class name to use as a base name for registration,
only if no `name` is specified. The parameter value indicates the maximum depth of the word extraction.

In JavaScript, class names use `PascalCase` convention where each word starts with a capital letter.
The baseNameOnly parameter is a number that specifies which words to extract from the class name as the base name.
If the value is 1, it extracts the first word, 2 extracts the first two words, and 0 uses the entire class name.
The base name is used to register the class to the factory.

#### Example

```ts
such as "JsonTextCodec" if baseNameOnly is 1, the first word "Json" will be extracted from "JsonTextCodec" as
  the base name. If baseNameOnly is 2, the first two words "JsonText" will be extracted as the base name. If
  baseNameOnly is 0, the entire class name "JsonTextCodec" will be used as the base name.
```

#### Name

_baseNameOnly

#### Default

```ts
1
@internal
```

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`_baseNameOnly`](StringTemplate.md#_basenameonly)

***

### \_children

> `abstract` `static` **\_children**: `object`

Defined in: node\_modules/.pnpm/custom-factory@2.3.0/node\_modules/custom-factory/lib/base-factory.d.ts:49

**`Internal`**

The registered classes in the Factory

#### Index Signature

\[`name`: `string`\]: `any`

#### Name

_children

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`_children`](StringTemplate.md#_children)

***

### \_Factory

> `abstract` `static` **\_Factory**: *typeof* `BaseFactory`

Defined in: node\_modules/.pnpm/custom-factory@2.3.0/node\_modules/custom-factory/lib/base-factory.d.ts:41

**`Internal`**

The Root Factory class

#### Name

_Factory

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`_Factory`](StringTemplate.md#_factory)

## Accessors

### aliases

#### Get Signature

> **get** `static` **aliases**(): `string`[]

Defined in: node\_modules/.pnpm/custom-factory@2.3.0/node\_modules/custom-factory/lib/base-factory.d.ts:200

the aliases of itself

##### Returns

`string`[]

#### Set Signature

> **set** `static` **aliases**(`value`): `void`

Defined in: node\_modules/.pnpm/custom-factory@2.3.0/node\_modules/custom-factory/lib/base-factory.d.ts:196

##### Parameters

###### value

`string`[]

##### Returns

`void`

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`aliases`](StringTemplate.md#aliases)

***

### Factory

#### Get Signature

> **get** `static` **Factory**(): *typeof* `BaseFactory`

Defined in: node\_modules/.pnpm/custom-factory@2.3.0/node\_modules/custom-factory/lib/base-factory.d.ts:63

The Root Factory class

##### Returns

*typeof* `BaseFactory`

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`Factory`](StringTemplate.md#factory)

## Methods

### \_format()

> **\_format**(`data`): `string`

Defined in: [packages/template-engines/src/golang-template.ts:26](https://github.com/isdk/template-engines.js/blob/466ebe226b36554b365e0202c4f1d42ff9f95a09/src/golang-template.ts#L26)

Placeholder method for formatting the template. Must be implemented by subclasses.

#### Parameters

##### data

`Record`\<`string`, `any`\>

The data object used for interpolation.

#### Returns

`string`

A formatted string or a promise resolving to the formatted string.

#### Overrides

[`StringTemplate`](StringTemplate.md).[`_format`](StringTemplate.md#_format)

***

### \_initialize()

> **\_initialize**(`options`?): `void`

Defined in: [packages/template-engines/src/golang-template.ts:18](https://github.com/isdk/template-engines.js/blob/466ebe226b36554b365e0202c4f1d42ff9f95a09/src/golang-template.ts#L18)

Placeholder method for initializing the template. Must be implemented by subclasses.

#### Parameters

##### options?

[`StringTemplateOptions`](../interfaces/StringTemplateOptions.md)

Configuration options for initialization.

#### Returns

`void`

#### Overrides

[`StringTemplate`](StringTemplate.md).[`_initialize`](StringTemplate.md#_initialize)

***

### filterData()

> **filterData**(`data`): `Record`\<`string`, `any`\>

Defined in: [packages/template-engines/src/string-template.ts:166](https://github.com/isdk/template-engines.js/blob/466ebe226b36554b365e0202c4f1d42ff9f95a09/src/string-template.ts#L166)

Filters the input data to include only the specified input variables.

#### Parameters

##### data

`Record`\<`string`, `any`\>

The data object to validate and filter.

#### Returns

`Record`\<`string`, `any`\>

The filtered data object containing only the allowed keys.

#### Example

```typescript
const template = new StringTemplate({
  inputVariables: ['name']
});
const filteredData = template.filterData({ name: "Alice", age: 30 });
console.log(filteredData); // Output: { name: "Alice" }
```

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`filterData`](StringTemplate.md#filterdata)

***

### format()

> **format**(`data`?): `Promise`\<`string`\>

Defined in: [packages/template-engines/src/string-template.ts:255](https://github.com/isdk/template-engines.js/blob/466ebe226b36554b365e0202c4f1d42ff9f95a09/src/string-template.ts#L255)

Formats the template using the provided data, supporting asynchronous processing.

#### Parameters

##### data?

`Record`\<`string`, `any`\>

The data object used for interpolation.

#### Returns

`Promise`\<`string`\>

A promise that resolves to the formatted template string.

#### Example

```typescript
const template = new StringTemplate("{{text}}", {
  templateFormat: "Test",
  inputVariables: ['text']
});
const result = await template.format({ text: "Hello" });
console.log(result); // Output: "Hello"
```

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`format`](StringTemplate.md#format)

***

### getVariables()

> **getVariables**(`template`): `string`[]

Defined in: [packages/template-engines/src/golang-template.ts:12](https://github.com/isdk/template-engines.js/blob/466ebe226b36554b365e0202c4f1d42ff9f95a09/src/golang-template.ts#L12)

#### Parameters

##### template

`string`

#### Returns

`string`[]

***

### initialize()

> **initialize**(`options`?): `void`

Defined in: [packages/template-engines/src/string-template.ts:222](https://github.com/isdk/template-engines.js/blob/466ebe226b36554b365e0202c4f1d42ff9f95a09/src/string-template.ts#L222)

Initializes the template instance with the provided options.

#### Parameters

##### options?

[`StringTemplateOptions`](../interfaces/StringTemplateOptions.md)

Configuration options for initialization.

#### Returns

`void`

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`initialize`](StringTemplate.md#initialize)

***

### partial()

> **partial**(`data`): [`StringTemplate`](StringTemplate.md)

Defined in: [packages/template-engines/src/string-template.ts:307](https://github.com/isdk/template-engines.js/blob/466ebe226b36554b365e0202c4f1d42ff9f95a09/src/string-template.ts#L307)

Creates a new `StringTemplate` instance with partially filled data.
This is useful for pre-filling some variables while leaving others to be filled later.

#### Parameters

##### data

`Record`\<`string`, `any`\>

The partial data to pre-fill in the new template.

#### Returns

[`StringTemplate`](StringTemplate.md)

A new `StringTemplate` instance with the partial data applied.

#### Example

```typescript
const template = new StringTemplate("{{role}}:{{text}}", {
  templateFormat: "Test",
  inputVariables: ['role', 'text']
});
const partialTemplate = template.partial({ role: "user" });
console.log(partialTemplate.data); // Output: { role: "user" }
const result = await partialTemplate.format({ text: "Hello" });
console.log(result); // Output: { role: "user", text: "Hello" }

// Example with a function
function getDate() {
  return new Date();
}
const dateTemplate = template.partial({ date: getDate });
console.log(dateTemplate.data); // Output: { date: getDate }
const dateResult = await dateTemplate.format({ role: "user" });
console.log(dateResult.date instanceof Date); // Output: true
```

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`partial`](StringTemplate.md#partial)

***

### toJSON()

> **toJSON**(`options`): [`StringTemplateOptions`](../interfaces/StringTemplateOptions.md)

Defined in: [packages/template-engines/src/string-template.ts:331](https://github.com/isdk/template-engines.js/blob/466ebe226b36554b365e0202c4f1d42ff9f95a09/src/string-template.ts#L331)

Serializes the `StringTemplate` instance into a JSON-compatible object.

#### Parameters

##### options

[`StringTemplateOptions`](../interfaces/StringTemplateOptions.md) = `...`

Optional configuration for serialization.

#### Returns

[`StringTemplateOptions`](../interfaces/StringTemplateOptions.md)

A JSON-compatible object representing the template's state.

#### Example

```typescript
const template = new StringTemplate("{{text}}", {
  templateFormat: "Test",
  inputVariables: ['text']
});
const serialized = template.toJSON();
console.log(serialized);
// Output: { template: "{{text}}", templateFormat: "Test", inputVariables: ['text'] }
```

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`toJSON`](StringTemplate.md#tojson)

***

### \_findRootFactory()

> `static` **\_findRootFactory**(`aClass`): `undefined` \| *typeof* `BaseFactory`

Defined in: node\_modules/.pnpm/custom-factory@2.3.0/node\_modules/custom-factory/lib/base-factory.d.ts:99

**`Internal`**

find the real root factory

#### Parameters

##### aClass

*typeof* `BaseFactory`

the abstract root factory class

#### Returns

`undefined` \| *typeof* `BaseFactory`

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`_findRootFactory`](StringTemplate.md#_findrootfactory)

***

### \_get()

> `static` **\_get**(`name`): `any`

Defined in: node\_modules/.pnpm/custom-factory@2.3.0/node\_modules/custom-factory/lib/base-factory.d.ts:234

#### Parameters

##### name

`any`

#### Returns

`any`

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`_get`](StringTemplate.md#_get)

***

### \_register()

> `static` **\_register**(`aClass`, `aOptions`?): `boolean`

Defined in: node\_modules/.pnpm/custom-factory@2.3.0/node\_modules/custom-factory/lib/base-factory.d.ts:145

**`Internal`**

register the aClass to the factory

#### Parameters

##### aClass

*typeof* `BaseFactory`

the class to register the Factory

##### aOptions?

`any`

the options for the class and the factory

#### Returns

`boolean`

return true if successful.

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`_register`](StringTemplate.md#_register)

***

### cleanAliases()

> `static` **cleanAliases**(`aName`): `void`

Defined in: node\_modules/.pnpm/custom-factory@2.3.0/node\_modules/custom-factory/lib/base-factory.d.ts:162

remove all aliases of the registered item or itself

#### Parameters

##### aName

the registered item or name

`undefined` | `string` | *typeof* `BaseFactory`

#### Returns

`void`

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`cleanAliases`](StringTemplate.md#cleanaliases)

***

### createObject()

> `static` **createObject**(`aName`, `aOptions`): `undefined` \| `BaseFactory`

Defined in: node\_modules/.pnpm/custom-factory@2.3.0/node\_modules/custom-factory/lib/base-factory.d.ts:241

Create a new object instance of Factory

#### Parameters

##### aName

`string` | `BaseFactory`

##### aOptions

`any`

#### Returns

`undefined` \| `BaseFactory`

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`createObject`](StringTemplate.md#createobject)

***

### findRootFactory()

> `abstract` `static` **findRootFactory**(): `undefined` \| *typeof* `BaseFactory`

Defined in: node\_modules/.pnpm/custom-factory@2.3.0/node\_modules/custom-factory/lib/base-factory.d.ts:92

**`Internal`**

find the real root factory

You can overwrite it to specify your root factory class
or set _Factory directly.

#### Returns

`undefined` \| *typeof* `BaseFactory`

the root factory class

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`findRootFactory`](StringTemplate.md#findrootfactory)

***

### forEach()

> `static` **forEach**(`cb`): `any`

Defined in: node\_modules/.pnpm/custom-factory@2.3.0/node\_modules/custom-factory/lib/base-factory.d.ts:227

executes a provided callback function once for each registered element.

#### Parameters

##### cb

(`ctor`, `name`) => `undefined` \| `string`

the forEach callback function

#### Returns

`any`

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`forEach`](StringTemplate.md#foreach)

***

### format()

> `static` **format**(`options`): `Promise`\<`string`\>

Defined in: [packages/template-engines/src/string-template.ts:102](https://github.com/isdk/template-engines.js/blob/466ebe226b36554b365e0202c4f1d42ff9f95a09/src/string-template.ts#L102)

Formats a template using the provided options.

#### Parameters

##### options

[`StringTemplateOptions`](../interfaces/StringTemplateOptions.md)

Configuration options for the template.

#### Returns

`Promise`\<`string`\>

A promise that resolves to the formatted template string.

#### Example

```typescript
const result = await StringTemplate.format({
  template: "{{text}}",
  data: { text: "Hello" },
  templateFormat: "Test"
});
console.log(result); // Output: "Hello"
```

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`format`](StringTemplate.md#format-2)

***

### formatIf()

> `static` **formatIf**(`options`): `Promise`\<`undefined` \| `string`\>

Defined in: [packages/template-engines/src/string-template.ts:122](https://github.com/isdk/template-engines.js/blob/466ebe226b36554b365e0202c4f1d42ff9f95a09/src/string-template.ts#L122)

Formats a template if the provided options represent a valid template.

#### Parameters

##### options

[`StringTemplateOptions`](../interfaces/StringTemplateOptions.md)

Configuration options to check and format.

#### Returns

`Promise`\<`undefined` \| `string`\>

A promise that resolves to the formatted template string if valid; otherwise, undefined.

#### Example

```typescript
const result = await StringTemplate.formatIf({
  template: "{{text}}",
  data: { text: "Valid Template" },
  templateFormat: "Test"
});
console.log(result); // Output: "Valid Template"
```

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`formatIf`](StringTemplate.md#formatif)

***

### formatName()

> `abstract` `static` **formatName**(`aName`): `string`

Defined in: node\_modules/.pnpm/custom-factory@2.3.0/node\_modules/custom-factory/lib/base-factory.d.ts:116

**`Internal`**

format(transform) the name to be registered.

defaults to returning the name unchanged. By overloading this method, case-insensitive names can be achieved.

#### Parameters

##### aName

`string`

#### Returns

`string`

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`formatName`](StringTemplate.md#formatname)

***

### formatNameFromClass()

> `static` **formatNameFromClass**(`aClass`, `aBaseNameOnly`?): `string`

Defined in: node\_modules/.pnpm/custom-factory@2.3.0/node\_modules/custom-factory/lib/base-factory.d.ts:130

**`Internal`**

format(transform) the name to be registered for the aClass

#### Parameters

##### aClass

`any`

##### aBaseNameOnly?

`number`

#### Returns

`string`

the name to register

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`formatNameFromClass`](StringTemplate.md#formatnamefromclass)

***

### from()

> `static` **from**(`template`?, `options`?): [`StringTemplate`](StringTemplate.md)

Defined in: [packages/template-engines/src/string-template.ts:83](https://github.com/isdk/template-engines.js/blob/466ebe226b36554b365e0202c4f1d42ff9f95a09/src/string-template.ts#L83)

Creates a new instance of the `StringTemplate` class.

#### Parameters

##### template?

Either a template string or an options object.

`string` | [`StringTemplateOptions`](../interfaces/StringTemplateOptions.md)

##### options?

[`StringTemplateOptions`](../interfaces/StringTemplateOptions.md)

Additional configuration options for the template.

#### Returns

[`StringTemplate`](StringTemplate.md)

A new `StringTemplate` instance.

#### Example

```typescript
const template = StringTemplate.from("{{text}}", {
  templateFormat: "Test",
  inputVariables: ['text']
});
console.log(template instanceof TestStringTemplate); // Output: true
```

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`from`](StringTemplate.md#from)

***

### get()

> `static` **get**(`name`): `undefined` \| *typeof* `BaseFactory`

Defined in: node\_modules/.pnpm/custom-factory@2.3.0/node\_modules/custom-factory/lib/base-factory.d.ts:233

Get the registered class via name

#### Parameters

##### name

`any`

#### Returns

`undefined` \| *typeof* `BaseFactory`

return the registered class if found the name

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`get`](StringTemplate.md#get)

***

### getAliases()

> `static` **getAliases**(`aClass`): `string`[]

Defined in: node\_modules/.pnpm/custom-factory@2.3.0/node\_modules/custom-factory/lib/base-factory.d.ts:195

get the aliases of the aClass

#### Parameters

##### aClass

the class or name to get aliases, means itself if no aClass specified

`undefined` | `string` | *typeof* `BaseFactory`

#### Returns

`string`[]

aliases

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`getAliases`](StringTemplate.md#getaliases)

***

### getDisplayName()

> `static` **getDisplayName**(`aClass`): `undefined` \| `string`

Defined in: node\_modules/.pnpm/custom-factory@2.3.0/node\_modules/custom-factory/lib/base-factory.d.ts:206

Get the display name from aClass

#### Parameters

##### aClass

the class, name or itself, means itself if no aClass

`undefined` | `string` | `Function`

#### Returns

`undefined` \| `string`

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`getDisplayName`](StringTemplate.md#getdisplayname)

***

### getNameFrom()

> `static` **getNameFrom**(`aClass`): `string`

Defined in: node\_modules/.pnpm/custom-factory@2.3.0/node\_modules/custom-factory/lib/base-factory.d.ts:122

Get the unique(registered) name in the factory

#### Parameters

##### aClass

`string` | `Function`

#### Returns

`string`

the unique name in the factory

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`getNameFrom`](StringTemplate.md#getnamefrom)

***

### getRealName()

> `static` **getRealName**(`name`): `any`

Defined in: node\_modules/.pnpm/custom-factory@2.3.0/node\_modules/custom-factory/lib/base-factory.d.ts:100

#### Parameters

##### name

`any`

#### Returns

`any`

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`getRealName`](StringTemplate.md#getrealname)

***

### getRealNameFromAlias()

> `static` **getRealNameFromAlias**(`alias`): `undefined` \| `string`

Defined in: node\_modules/.pnpm/custom-factory@2.3.0/node\_modules/custom-factory/lib/base-factory.d.ts:106

get the unique name in the factory from an alias name

#### Parameters

##### alias

`string`

the alias name

#### Returns

`undefined` \| `string`

the unique name in the factory

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`getRealNameFromAlias`](StringTemplate.md#getrealnamefromalias)

***

### isTemplate()

> `static` **isTemplate**(`templateOpt`): `undefined` \| `boolean`

Defined in: [packages/template-engines/src/golang-template.ts:7](https://github.com/isdk/template-engines.js/blob/466ebe226b36554b365e0202c4f1d42ff9f95a09/src/golang-template.ts#L7)

Determines whether the given options represent a valid template.

#### Parameters

##### templateOpt

The options object to evaluate.

`string` | [`StringTemplateOptions`](../interfaces/StringTemplateOptions.md)

#### Returns

`undefined` \| `boolean`

A boolean indicating whether the options represent a valid template.

#### Example

```typescript
const isValid = StringTemplate.isTemplate({
  template: "{{text}}",
  templateFormat: "Test"
});
console.log(isValid); // Output: true
```

#### Overrides

[`StringTemplate`](StringTemplate.md).[`isTemplate`](StringTemplate.md#istemplate)

***

### register()

> `static` **register**(...`args`): `boolean`

Defined in: node\_modules/.pnpm/custom-factory@2.3.0/node\_modules/custom-factory/lib/base-factory.d.ts:137

register the aClass to the factory

#### Parameters

##### args

...`any`[]

#### Returns

`boolean`

return true if successful.

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`register`](StringTemplate.md#register)

***

### registeredClass()

> `static` **registeredClass**(`aName`): `false` \| *typeof* `BaseFactory`

Defined in: node\_modules/.pnpm/custom-factory@2.3.0/node\_modules/custom-factory/lib/base-factory.d.ts:151

Check the name, alias or itself whether registered.

#### Parameters

##### aName

the class name

`undefined` | `string`

#### Returns

`false` \| *typeof* `BaseFactory`

the registered class if registered, otherwise returns false

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`registeredClass`](StringTemplate.md#registeredclass)

***

### removeAlias()

> `static` **removeAlias**(...`aliases`): `void`

Defined in: node\_modules/.pnpm/custom-factory@2.3.0/node\_modules/custom-factory/lib/base-factory.d.ts:167

remove specified aliases

#### Parameters

##### aliases

...`string`[]

the aliases to remove

#### Returns

`void`

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`removeAlias`](StringTemplate.md#removealias)

***

### setAlias()

> `static` **setAlias**(`aClass`, `alias`): `void`

Defined in: node\_modules/.pnpm/custom-factory@2.3.0/node\_modules/custom-factory/lib/base-factory.d.ts:189

set alias to a class

#### Parameters

##### aClass

the class to set alias

`undefined` | `string` | *typeof* `BaseFactory`

##### alias

`string`

#### Returns

`void`

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`setAlias`](StringTemplate.md#setalias)

***

### setAliases()

> `static` **setAliases**(`aClass`, ...`aAliases`): `void`

Defined in: node\_modules/.pnpm/custom-factory@2.3.0/node\_modules/custom-factory/lib/base-factory.d.ts:183

set aliases to a class

#### Parameters

##### aClass

the class to set aliases

`undefined` | `string` | *typeof* `BaseFactory`

##### aAliases

...`any`[]

#### Returns

`void`

#### Example

```ts
import { BaseFactory } from 'custom-factory'
  class Factory extends BaseFactory {}
  const register = Factory.register.bind(Factory)
  const aliases = Factory.setAliases.bind(Factory)
  class MyFactory {}
  register(MyFactory)
  aliases(MyFactory, 'my', 'MY')
```

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`setAliases`](StringTemplate.md#setaliases)

***

### setDisplayName()

> `static` **setDisplayName**(`aClass`, `aDisplayName`): `void`

Defined in: node\_modules/.pnpm/custom-factory@2.3.0/node\_modules/custom-factory/lib/base-factory.d.ts:212

Set the display name to the aClass

#### Parameters

##### aClass

the class, name or itself, means itself if no aClass

`undefined` | `string` | `Function`

##### aDisplayName

the display name to set

`string` | \{ `displayName`: `string`; \}

#### Returns

`void`

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`setDisplayName`](StringTemplate.md#setdisplayname)

***

### unregister()

> `static` **unregister**(`aName`): `boolean`

Defined in: node\_modules/.pnpm/custom-factory@2.3.0/node\_modules/custom-factory/lib/base-factory.d.ts:157

unregister this class in the factory

#### Parameters

##### aName

the registered name or class, no name means unregister itself.

`undefined` | `string` | `Function`

#### Returns

`boolean`

true means successful

#### Inherited from

[`StringTemplate`](StringTemplate.md).[`unregister`](StringTemplate.md#unregister)
