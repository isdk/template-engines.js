[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / StringTemplate

# Class: StringTemplate

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:96](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L96)

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

- `BaseFactory`

## Extended by

- [`HfStringTemplate`](HfStringTemplate.md)
- [`FStringTemplate`](FStringTemplate.md)
- [`GolangStringTemplate`](GolangStringTemplate.md)
- [`EnvStringTemplate`](EnvStringTemplate.md)

## Constructors

### Constructor

> **new StringTemplate**(`template?`, `options?`): `StringTemplate`

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:555](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L555)

Initializes a new instance of the `StringTemplate` class.

#### Parameters

##### template?

`string` \| [`StringTemplateOptions`](../interfaces/StringTemplateOptions.md)

Either a template string or an options object.

##### options?

[`StringTemplateOptions`](../interfaces/StringTemplateOptions.md)

Additional configuration options for the template.

#### Returns

`StringTemplate`

#### Example

```typescript
const template = new StringTemplate("{{text}}", {
  templateFormat: "Test",
  inputVariables: ['text']
});
console.log(template instanceof TestStringTemplate); // Output: true
```

#### Overrides

`BaseFactory.constructor`

## Properties

### compiledTemplate

> **compiledTemplate**: `any`

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:100](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L100)

Declares the compiled template instance.

***

### data

> **data**: `Record`\<`string`, `any`\> \| `undefined`

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:112](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L112)

Declares the data object used for template interpolation.

***

### expandValue

> **expandValue**: `boolean` \| `undefined`

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:124](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L124)

Declares whether to expand the value as a template if it is a string and matches the template format.

***

### inputVariables

> **inputVariables**: `string`[] \| `undefined`

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:116](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L116)

Declares the list of input variables expected by the template.

***

### raw

> **raw**: `boolean` \| `undefined`

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:120](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L120)

Declares whether to return the raw value if the template is a pure placeholder.

***

### tagFinalString

> **tagFinalString**: `boolean` \| `undefined`

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:129](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L129)

Declares whether to tag the rendering result as a `StringTemplateFinalString`
when it still contains template literals.

***

### template

> **template**: `string`

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:104](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L104)

Declares the raw template string.

***

### templateFormat

> **templateFormat**: `string` \| `undefined`

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:108](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L108)

Declares the format of the template (e.g., 'default').

***

### \_aliases

> `abstract` `static` **\_aliases**: \[`string`\]

Defined in: custom-factory.js/lib/index.d.ts:62

**`Internal`**

the registered alias items object.
the key is alias name, the value is the registered name

#### Inherited from

`BaseFactory._aliases`

***

### \_baseNameOnly

> `static` **\_baseNameOnly**: `number`

Defined in: custom-factory.js/lib/index.d.ts:92

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

`BaseFactory._baseNameOnly`

***

### \_children

> `abstract` `static` **\_children**: `object`

Defined in: custom-factory.js/lib/index.d.ts:52

**`Internal`**

The registered classes in the Factory

#### Index Signature

\[`name`: `string`\]: `any`

#### Name

_children

#### Inherited from

`BaseFactory._children`

***

### \_Factory

> `abstract` `static` **\_Factory**: *typeof* `BaseFactory`

Defined in: custom-factory.js/lib/index.d.ts:44

**`Internal`**

The Root Factory class

#### Name

_Factory

#### Inherited from

`BaseFactory._Factory`

***

### \_isFactory

> `static` **\_isFactory**: `boolean`

Defined in: custom-factory.js/lib/index.d.ts:69

**`Internal`**

The default isFactory value

#### Default

```ts
true
@internal
```

#### Inherited from

`BaseFactory._isFactory`

## Accessors

### aliases

#### Get Signature

> **get** `static` **aliases**(): `string`[]

Defined in: custom-factory.js/lib/index.d.ts:210

the aliases of itself

##### Returns

`string`[]

#### Set Signature

> **set** `static` **aliases**(`value`): `void`

Defined in: custom-factory.js/lib/index.d.ts:206

##### Parameters

###### value

`string`[]

##### Returns

`void`

#### Inherited from

`BaseFactory.aliases`

***

### Factory

#### Get Signature

> **get** `static` **Factory**(): *typeof* `BaseFactory`

Defined in: custom-factory.js/lib/index.d.ts:73

The Root Factory class

##### Returns

*typeof* `BaseFactory`

#### Inherited from

`BaseFactory.Factory`

## Methods

### \_format()

> **\_format**(`data`): `string` \| `Promise`\<`string`\>

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:618](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L618)

Placeholder method for formatting the template. Must be implemented by subclasses.

#### Parameters

##### data

`Record`\<`string`, `any`\>

The data object used for interpolation.

#### Returns

`string` \| `Promise`\<`string`\>

A formatted string or a promise resolving to the formatted string.

***

### \_initialize()

> **\_initialize**(`options?`): `void`

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:596](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L596)

Placeholder method for initializing the template. Must be implemented by subclasses.

#### Parameters

##### options?

[`StringTemplateOptions`](../interfaces/StringTemplateOptions.md)

Configuration options for initialization.

#### Returns

`void`

***

### \_wrapFinalString()

> `protected` **\_wrapFinalString**(`result`): `any`

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:714](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L714)

Wraps a rendering result into a `StringTemplateFinalString` if it is a
non-empty string that still contains template literals (of this template's
format). Empty results and non-string results are returned as-is.

This is the automatic counterpart of `StringTemplateFinalValue`: the user
marks inputs that must never be expanded, the engine marks outputs that
must never be expanded again.

#### Parameters

##### result

`any`

The rendering result to wrap.

#### Returns

`any`

The wrapped result, or the result itself if no wrapping applies.

***

### filterData()

> **filterData**(`data`): `Record`\<`string`, `any`\>

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:530](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L530)

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

***

### format()

> **format**(`data?`, `visited?`): `Promise`\<`any`\>

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:637](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L637)

Formats the template using the provided data, supporting asynchronous processing.

#### Parameters

##### data?

`Record`\<`string`, `any`\>

The data object used for interpolation.

##### visited?

`Set`\<`any`\>

#### Returns

`Promise`\<`any`\>

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

***

### getPurePlaceholderVariable()

> **getPurePlaceholderVariable**(): `string` \| `undefined`

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:384](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L384)

Returns the variable name if this template instance is a pure placeholder.

#### Returns

`string` \| `undefined`

The variable name if the template is a pure placeholder, undefined otherwise.

***

### initialize()

> **initialize**(`options?`): `void`

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:604](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L604)

Initializes the template instance with the provided options.

#### Parameters

##### options?

[`StringTemplateOptions`](../interfaces/StringTemplateOptions.md)

Configuration options for initialization.

#### Returns

`void`

#### Overrides

`BaseFactory.initialize`

***

### isPurePlaceholder()

> **isPurePlaceholder**(): `boolean`

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:512](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L512)

Checks if this template instance is a pure placeholder.

#### Returns

`boolean`

True if the template is a pure placeholder, false otherwise.

***

### partial()

> **partial**(`data`): `StringTemplate`

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:760](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L760)

Creates a new `StringTemplate` instance with partially filled data.
This is useful for pre-filling some variables while leaving others to be filled later.

#### Parameters

##### data

`Record`\<`string`, `any`\>

The partial data to pre-fill in the new template.

#### Returns

`StringTemplate`

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

***

### renderRawValue()

> **renderRawValue**(`value`, `data`, `visited?`): `Promise`\<`any`\>

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:397](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L397)

Renders the raw value recursively, resolving any nested templates.

#### Parameters

##### value

`any`

The value to render.

##### data

`Record`\<`string`, `any`\>

The data object used for interpolation.

##### visited?

`Set`\<`any`\>

A set to track visited objects to avoid infinite recursion.

#### Returns

`Promise`\<`any`\>

A promise that resolves to the rendered raw value.

***

### toJSON()

> **toJSON**(`options?`): [`StringTemplateOptions`](../interfaces/StringTemplateOptions.md)

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:784](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L784)

Serializes the `StringTemplate` instance into a JSON-compatible object.

#### Parameters

##### options?

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

***

### \_findRootFactory()

> `static` **\_findRootFactory**(`aClass`): *typeof* `BaseFactory` \| `undefined`

Defined in: custom-factory.js/lib/index.d.ts:109

**`Internal`**

find the real root factory

#### Parameters

##### aClass

*typeof* `BaseFactory`

the abstract root factory class

#### Returns

*typeof* `BaseFactory` \| `undefined`

#### Inherited from

`BaseFactory._findRootFactory`

***

### \_get()

> `static` **\_get**(`name`): `any`

Defined in: custom-factory.js/lib/index.d.ts:244

#### Parameters

##### name

`any`

#### Returns

`any`

#### Inherited from

`BaseFactory._get`

***

### \_register()

> `static` **\_register**(`aClass`, `aOptions?`): `boolean`

Defined in: custom-factory.js/lib/index.d.ts:155

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

`BaseFactory._register`

***

### cleanAliases()

> `static` **cleanAliases**(`aName`): `void`

Defined in: custom-factory.js/lib/index.d.ts:172

remove all aliases of the registered item or itself

#### Parameters

##### aName

`string` \| *typeof* `BaseFactory` \| `undefined`

the registered item or name

#### Returns

`void`

#### Inherited from

`BaseFactory.cleanAliases`

***

### createObject()

> `static` **createObject**(`aName`, `aOptions`): `BaseFactory` \| `undefined`

Defined in: custom-factory.js/lib/index.d.ts:251

Create a new object instance of Factory

#### Parameters

##### aName

`string` \| `BaseFactory`

##### aOptions

`any`

#### Returns

`BaseFactory` \| `undefined`

#### Inherited from

`BaseFactory.createObject`

***

### findRootFactory()

> `abstract` `static` **findRootFactory**(): *typeof* `BaseFactory` \| `undefined`

Defined in: custom-factory.js/lib/index.d.ts:102

**`Internal`**

find the real root factory

You can overwrite it to specify your root factory class
or set _Factory directly.

#### Returns

*typeof* `BaseFactory` \| `undefined`

the root factory class

#### Inherited from

`BaseFactory.findRootFactory`

***

### forEach()

> `static` **forEach**(`cb`): `this`

Defined in: custom-factory.js/lib/index.d.ts:237

executes a provided callback function once for each registered element.

#### Parameters

##### cb

(`ctor`, `name`) => `string` \| `undefined`

the forEach callback function

#### Returns

`this`

#### Inherited from

`BaseFactory.forEach`

***

### format()

> `static` **format**(`options`): `Promise`\<`any`\>

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:168](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L168)

Formats a template using the provided options.

#### Parameters

##### options

[`StringTemplateOptions`](../interfaces/StringTemplateOptions.md)

Configuration options for the template.

#### Returns

`Promise`\<`any`\>

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

***

### formatIf()

> `static` **formatIf**(`options`): `Promise`\<`any`\>

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:188](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L188)

Formats a template if the provided options represent a valid template.

#### Parameters

##### options

[`StringTemplateOptions`](../interfaces/StringTemplateOptions.md)

Configuration options to check and format.

#### Returns

`Promise`\<`any`\>

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

***

### formatName()

> `abstract` `static` **formatName**(`aName`): `string`

Defined in: custom-factory.js/lib/index.d.ts:126

**`Internal`**

format(transform) the name to be registered.

defaults to returning the name unchanged. By overloading this method, case-insensitive names can be achieved.

#### Parameters

##### aName

`string`

#### Returns

`string`

#### Inherited from

`BaseFactory.formatName`

***

### formatNameFromClass()

> `static` **formatNameFromClass**(`aClass`, `aBaseNameOnly?`): `string`

Defined in: custom-factory.js/lib/index.d.ts:140

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

`BaseFactory.formatNameFromClass`

***

### from()

> `static` **from**(`template?`, `options?`): `StringTemplate`

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:146](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L146)

Creates a new instance of the `StringTemplate` class.

#### Parameters

##### template?

`string` \| [`StringTemplateOptions`](../interfaces/StringTemplateOptions.md)

Either a template string or an options object.

##### options?

[`StringTemplateOptions`](../interfaces/StringTemplateOptions.md)

Additional configuration options for the template.

#### Returns

`StringTemplate`

A new `StringTemplate` instance.

#### Example

```typescript
const template = StringTemplate.from("{{text}}", {
  templateFormat: "Test",
  inputVariables: ['text']
});
console.log(template instanceof TestStringTemplate); // Output: true
```

***

### get()

> `static` **get**(`name`): *typeof* `BaseFactory` \| `undefined`

Defined in: custom-factory.js/lib/index.d.ts:243

Get the registered class via name

#### Parameters

##### name

`any`

#### Returns

*typeof* `BaseFactory` \| `undefined`

return the registered class if found the name

#### Inherited from

`BaseFactory.get`

***

### getAliases()

> `static` **getAliases**(`aClass`): `string`[]

Defined in: custom-factory.js/lib/index.d.ts:205

get the aliases of the aClass

#### Parameters

##### aClass

`string` \| *typeof* `BaseFactory` \| `undefined`

the class or name to get aliases, means itself if no aClass specified

#### Returns

`string`[]

aliases

#### Inherited from

`BaseFactory.getAliases`

***

### getDisplayName()

> `static` **getDisplayName**(`aClass`): `string` \| `undefined`

Defined in: custom-factory.js/lib/index.d.ts:216

Get the display name from aClass

#### Parameters

##### aClass

`string` \| `Function` \| `undefined`

the class, name or itself, means itself if no aClass

#### Returns

`string` \| `undefined`

#### Inherited from

`BaseFactory.getDisplayName`

***

### getNameFrom()

> `static` **getNameFrom**(`aClass`): `string`

Defined in: custom-factory.js/lib/index.d.ts:132

Get the unique(registered) name in the factory

#### Parameters

##### aClass

`string` \| `Function`

#### Returns

`string`

the unique name in the factory

#### Inherited from

`BaseFactory.getNameFrom`

***

### getPurePlaceholderVariable()

> `static` **getPurePlaceholderVariable**(`templateOpt`): `string` \| `undefined`

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:289](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L289)

Returns the variable name if the template is a pure placeholder.

#### Parameters

##### templateOpt

`string` \| [`StringTemplateOptions`](../interfaces/StringTemplateOptions.md)

The template options or template string to check.

#### Returns

`string` \| `undefined`

The variable name if the template is a pure placeholder, undefined otherwise.

#### Example

```typescript
StringTemplate.getPurePlaceholderVariable("{{text}}"); // "text"
StringTemplate.getPurePlaceholderVariable("  {{text}}  "); // "text"
StringTemplate.getPurePlaceholderVariable("Hello {{text}}"); // undefined
```

***

### getRealName()

> `static` **getRealName**(`name`): `any`

Defined in: custom-factory.js/lib/index.d.ts:110

#### Parameters

##### name

`any`

#### Returns

`any`

#### Inherited from

`BaseFactory.getRealName`

***

### getRealNameFromAlias()

> `static` **getRealNameFromAlias**(`alias`): `string` \| `undefined`

Defined in: custom-factory.js/lib/index.d.ts:116

get the unique name in the factory from an alias name

#### Parameters

##### alias

`string`

the alias name

#### Returns

`string` \| `undefined`

the unique name in the factory

#### Inherited from

`BaseFactory.getRealNameFromAlias`

***

### isPurePlaceholder()

> `static` **isPurePlaceholder**(`templateOpt`): `boolean`

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:353](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L353)

Checks if the template string is a pure placeholder (optionally surrounded by whitespace).
A pure placeholder means the template contains only one template segment and no other text.

#### Parameters

##### templateOpt

`string` \| [`StringTemplateOptions`](../interfaces/StringTemplateOptions.md)

The template options or template string to check.

#### Returns

`boolean`

True if the template is a pure placeholder, false otherwise.

#### Example

```typescript
StringTemplate.isPurePlaceholder("{{text}}"); // true
StringTemplate.isPurePlaceholder("  {{text}}  "); // true
StringTemplate.isPurePlaceholder("Hello {{text}}"); // false
StringTemplate.isPurePlaceholder("{{text1}}{{text2}}"); // false
```

***

### isTemplate()

> `static` **isTemplate**(`templateOpt`): `any`

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:209](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L209)

Determines whether the given options represent a valid template.

#### Parameters

##### templateOpt

[`StringTemplateOptions`](../interfaces/StringTemplateOptions.md)

The options object to evaluate.

#### Returns

`any`

A boolean indicating whether the options represent a valid template.

#### Example

```typescript
const isValid = StringTemplate.isTemplate({
  template: "{{text}}",
  templateFormat: "Test"
});
console.log(isValid); // Output: true
```

***

### matchTemplateSegment()

> `static` **matchTemplateSegment**(`templateOpt`, `index?`): `RegExpExecArray` \| `undefined`

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:248](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L248)

Matches and extracts a single template segment from the provided template options.
This method is designed to identify individual segments of a template string.

#### Parameters

##### templateOpt

`string` \| [`StringTemplateOptions`](../interfaces/StringTemplateOptions.md)

The template options containing the template string and related configurations.

`string`

***

[`StringTemplateOptions`](../interfaces/StringTemplateOptions.md)

##### index?

`number` = `0`

The default starting position in the template string to begin matching (default: 0).
               This value is used only if `templateOpt.index` is not provided or invalid.

#### Returns

`RegExpExecArray` \| `undefined`

A `RegExpExecArray` representing the matched template segment, or `undefined` if no match is found.
         The `index` property of the result can be used to calculate the next position for iteration.

#### Example

```typescript
const template = "{{name}} is {{age}} years old";
let match = StringTemplate.matchTemplateSegment({ template });
while (match) {
  console.log(match[0]); // Output: "{{name}}"
  match = StringTemplate.matchTemplateSegment({ template }, match.index + match[0].length);
}
```

***

### register()

> `static` **register**(...`args`): `boolean`

Defined in: custom-factory.js/lib/index.d.ts:147

register the aClass to the factory

#### Parameters

##### args

...`any`[]

#### Returns

`boolean`

return true if successful.

#### Inherited from

`BaseFactory.register`

***

### registeredClass()

> `static` **registeredClass**(`aName`): `false` \| *typeof* `BaseFactory`

Defined in: custom-factory.js/lib/index.d.ts:161

Check the name, alias or itself whether registered.

#### Parameters

##### aName

`string` \| `undefined`

the class name

#### Returns

`false` \| *typeof* `BaseFactory`

the registered class if registered, otherwise returns false

#### Inherited from

`BaseFactory.registeredClass`

***

### removeAlias()

> `static` **removeAlias**(...`aliases`): `void`

Defined in: custom-factory.js/lib/index.d.ts:177

remove specified aliases

#### Parameters

##### aliases

...`string`[]

the aliases to remove

#### Returns

`void`

#### Inherited from

`BaseFactory.removeAlias`

***

### setAlias()

> `static` **setAlias**(`aClass`, `alias`): `void`

Defined in: custom-factory.js/lib/index.d.ts:199

set alias to a class

#### Parameters

##### aClass

`string` \| *typeof* `BaseFactory` \| `undefined`

the class to set alias

##### alias

`string`

#### Returns

`void`

#### Inherited from

`BaseFactory.setAlias`

***

### setAliases()

> `static` **setAliases**(`aClass`, ...`aAliases`): `void`

Defined in: custom-factory.js/lib/index.d.ts:193

set aliases to a class

#### Parameters

##### aClass

`string` \| *typeof* `BaseFactory` \| `undefined`

the class to set aliases

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

`BaseFactory.setAliases`

***

### setDisplayName()

> `static` **setDisplayName**(`aClass`, `aDisplayName`): `void`

Defined in: custom-factory.js/lib/index.d.ts:222

Set the display name to the aClass

#### Parameters

##### aClass

`string` \| `Function` \| `undefined`

the class, name or itself, means itself if no aClass

##### aDisplayName

`string` \| \{ `displayName`: `string`; \}

the display name to set

#### Returns

`void`

#### Inherited from

`BaseFactory.setDisplayName`

***

### unregister()

> `static` **unregister**(`aName`): `boolean`

Defined in: custom-factory.js/lib/index.d.ts:167

unregister this class in the factory

#### Parameters

##### aName

`string` \| `Function` \| `undefined`

the registered name or class, no name means unregister itself.

#### Returns

`boolean`

true means successful

#### Inherited from

`BaseFactory.unregister`
