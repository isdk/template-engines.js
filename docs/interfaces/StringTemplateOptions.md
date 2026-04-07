[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / StringTemplateOptions

# Interface: StringTemplateOptions

Defined in: [packages/template-engines/src/string-template.ts:15](https://github.com/isdk/template-engines.js/blob/7dade55e7c19979497e3b2db807022ef515c1e84/src/string-template.ts#L15)

## Indexable

\[`name`: `string`\]: `any`

## Properties

### compiledTemplate?

> `optional` **compiledTemplate**: `any`

Defined in: [packages/template-engines/src/string-template.ts:25](https://github.com/isdk/template-engines.js/blob/7dade55e7c19979497e3b2db807022ef515c1e84/src/string-template.ts#L25)

Pre-compiled template object to speed up formatting.

***

### data?

> `optional` **data**: `Record`\<`string`, `any`\>

Defined in: [packages/template-engines/src/string-template.ts:19](https://github.com/isdk/template-engines.js/blob/7dade55e7c19979497e3b2db807022ef515c1e84/src/string-template.ts#L19)

The data object used for template interpolation.

***

### expandValue?

> `optional` **expandValue**: `boolean`

Defined in: [packages/template-engines/src/string-template.ts:47](https://github.com/isdk/template-engines.js/blob/7dade55e7c19979497e3b2db807022ef515c1e84/src/string-template.ts#L47)

Whether to expand the value as a template if it is a string and matches the template format.
This enables recursive rendering where a variable's value can itself be a template.
Defaults to true.

#### Example

```typescript
const data = { name: "World", msg: "Hello, {{name}}!" };
await StringTemplate.format({ template: "{{msg}}", data }); // "Hello, World!"
await StringTemplate.format({ template: "{{msg}}", data, expandValue: false }); // "Hello, {{name}}!"
```

***

### ignoreInitialize?

> `optional` **ignoreInitialize**: `boolean`

Defined in: [packages/template-engines/src/string-template.ts:27](https://github.com/isdk/template-engines.js/blob/7dade55e7c19979497e3b2db807022ef515c1e84/src/string-template.ts#L27)

If true, skips the initialization phase.

***

### index?

> `optional` **index**: `number`

Defined in: [packages/template-engines/src/string-template.ts:29](https://github.com/isdk/template-engines.js/blob/7dade55e7c19979497e3b2db807022ef515c1e84/src/string-template.ts#L29)

Starting index for template segment matching.

***

### inputVariables?

> `optional` **inputVariables**: `string`[]

Defined in: [packages/template-engines/src/string-template.ts:23](https://github.com/isdk/template-engines.js/blob/7dade55e7c19979497e3b2db807022ef515c1e84/src/string-template.ts#L23)

The list of input variables expected by the template.

***

### raw?

> `optional` **raw**: `boolean`

Defined in: [packages/template-engines/src/string-template.ts:34](https://github.com/isdk/template-engines.js/blob/7dade55e7c19979497e3b2db807022ef515c1e84/src/string-template.ts#L34)

If true, returns the raw value (Object, Array, Boolean, etc.) instead of a string
if the template is a pure placeholder (e.g., "{{user}}").

***

### template?

> `optional` **template**: `string`

Defined in: [packages/template-engines/src/string-template.ts:17](https://github.com/isdk/template-engines.js/blob/7dade55e7c19979497e3b2db807022ef515c1e84/src/string-template.ts#L17)

The template string to be formatted.

***

### templateFormat?

> `optional` **templateFormat**: `string`

Defined in: [packages/template-engines/src/string-template.ts:21](https://github.com/isdk/template-engines.js/blob/7dade55e7c19979497e3b2db807022ef515c1e84/src/string-template.ts#L21)

The format of the template (e.g., 'hf', 'golang', 'fstring', 'env'). Defaults to 'default'.
