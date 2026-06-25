[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / pickStringTemplateData

# Function: pickStringTemplateData()

> **pickStringTemplateData**(`val`, `options?`): `any`

Defined in: [packages/template-engines/src/utils/pick-string-template-data.ts:28](https://github.com/isdk/template-engines.js/blob/9a37394fbf9a3672b2153ff6cd2da9a24463dcd5/src/utils/pick-string-template-data.ts#L28)

Recursively picks and cleans data to ensure all values are suitable for StringTemplate.

It deep-cleans:
- Arrays: filters or replaces invalid elements.
- Plain Objects: filters or replaces invalid properties.

It preserves:
- Primitives, Functions, StringTemplateFinalValue instances, and built-in wrappers.

## Parameters

### val

`any`

The data to clean.

### options?

[`PickStringTemplateDataOptions`](../interfaces/PickStringTemplateDataOptions.md) = `{}`

Options for handling invalid values.

## Returns

`any`

The cleaned data.
