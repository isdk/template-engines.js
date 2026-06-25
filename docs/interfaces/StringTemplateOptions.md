[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / StringTemplateOptions

# Interface: StringTemplateOptions

Defined in: [packages/template-engines/src/string-template.ts:16](https://github.com/isdk/template-engines.js/blob/9a37394fbf9a3672b2153ff6cd2da9a24463dcd5/src/string-template.ts#L16)

## Indexable

> \[`name`: `string`\]: `any`

## Properties

### compiledTemplate?

> `optional` **compiledTemplate?**: `any`

Defined in: [packages/template-engines/src/string-template.ts:26](https://github.com/isdk/template-engines.js/blob/9a37394fbf9a3672b2153ff6cd2da9a24463dcd5/src/string-template.ts#L26)

Pre-compiled template object to speed up formatting.

***

### data?

> `optional` **data?**: `Record`\<`string`, `any`\>

Defined in: [packages/template-engines/src/string-template.ts:20](https://github.com/isdk/template-engines.js/blob/9a37394fbf9a3672b2153ff6cd2da9a24463dcd5/src/string-template.ts#L20)

The data object used for template interpolation.

***

### expandValue?

> `optional` **expandValue?**: `boolean`

Defined in: [packages/template-engines/src/string-template.ts:48](https://github.com/isdk/template-engines.js/blob/9a37394fbf9a3672b2153ff6cd2da9a24463dcd5/src/string-template.ts#L48)

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

> `optional` **ignoreInitialize?**: `boolean`

Defined in: [packages/template-engines/src/string-template.ts:28](https://github.com/isdk/template-engines.js/blob/9a37394fbf9a3672b2153ff6cd2da9a24463dcd5/src/string-template.ts#L28)

If true, skips the initialization phase.

***

### index?

> `optional` **index?**: `number`

Defined in: [packages/template-engines/src/string-template.ts:30](https://github.com/isdk/template-engines.js/blob/9a37394fbf9a3672b2153ff6cd2da9a24463dcd5/src/string-template.ts#L30)

Starting index for template segment matching.

***

### inputVariables?

> `optional` **inputVariables?**: `string`[]

Defined in: [packages/template-engines/src/string-template.ts:24](https://github.com/isdk/template-engines.js/blob/9a37394fbf9a3672b2153ff6cd2da9a24463dcd5/src/string-template.ts#L24)

The list of input variables expected by the template.

***

### raw?

> `optional` **raw?**: `boolean`

Defined in: [packages/template-engines/src/string-template.ts:35](https://github.com/isdk/template-engines.js/blob/9a37394fbf9a3672b2153ff6cd2da9a24463dcd5/src/string-template.ts#L35)

If true, returns the raw value (Object, Array, Boolean, etc.) instead of a string
if the template is a pure placeholder (e.g., "{{user}}").

***

### template?

> `optional` **template?**: `string`

Defined in: [packages/template-engines/src/string-template.ts:18](https://github.com/isdk/template-engines.js/blob/9a37394fbf9a3672b2153ff6cd2da9a24463dcd5/src/string-template.ts#L18)

The template string to be formatted.

***

### templateFormat?

> `optional` **templateFormat?**: `string`

Defined in: [packages/template-engines/src/string-template.ts:22](https://github.com/isdk/template-engines.js/blob/9a37394fbf9a3672b2153ff6cd2da9a24463dcd5/src/string-template.ts#L22)

The format of the template (e.g., 'hf', 'golang', 'fstring', 'env'). Defaults to 'default'.
