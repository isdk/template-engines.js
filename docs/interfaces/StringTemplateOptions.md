[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / StringTemplateOptions

# Interface: StringTemplateOptions

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:20](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L20)

## Indexable

> \[`name`: `string`\]: `any`

## Properties

### compiledTemplate?

> `optional` **compiledTemplate?**: `any`

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:30](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L30)

Pre-compiled template object to speed up formatting.

***

### data?

> `optional` **data?**: `Record`\<`string`, `any`\>

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:24](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L24)

The data object used for template interpolation.

***

### expandValue?

> `optional` **expandValue?**: `boolean`

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:52](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L52)

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

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:32](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L32)

If true, skips the initialization phase.

***

### index?

> `optional` **index?**: `number`

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:34](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L34)

Starting index for template segment matching.

***

### inputVariables?

> `optional` **inputVariables?**: `string`[]

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:28](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L28)

The list of input variables expected by the template.

***

### raw?

> `optional` **raw?**: `boolean`

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:39](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L39)

If true, returns the raw value (Object, Array, Boolean, etc.) instead of a string
if the template is a pure placeholder (e.g., "{{user}}").

***

### tagFinalString?

> `optional` **tagFinalString?**: `boolean`

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:62](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L62)

Whether the rendering result should be tagged as a `StringTemplateFinalString`
when it still contains template literals. Defaults to true.

Set it to false to opt out of the automatic output tagging and always get a
plain string back (the pre-tagging behavior). Note that this only disables
*tagging*: protected values (`StringTemplateFinalValue` /
`StringTemplateFinalString`) are still never expanded when used as data.

***

### template?

> `optional` **template?**: `string`

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:22](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L22)

The template string to be formatted.

***

### templateFormat?

> `optional` **templateFormat?**: `string`

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template.ts:26](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template.ts#L26)

The format of the template (e.g., 'hf', 'golang', 'fstring', 'env'). Defaults to 'default'.
