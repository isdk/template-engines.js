[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / pickStringTemplateData

# Function: pickStringTemplateData()

> **pickStringTemplateData**(`val`, `options?`): `any`

Defined in: [@isdk/ai-tools/packages/template-engines/src/utils/pick-string-template-data.ts:30](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/utils/pick-string-template-data.ts#L30)

Recursively picks and cleans data to ensure all values are suitable for StringTemplate.

It deep-cleans:
- Arrays: filters or replaces invalid elements.
- Plain Objects: filters or replaces invalid properties.

It preserves:
- Primitives, Functions, StringTemplateFinalValue instances,
  StringTemplateFinalString instances, and built-in wrappers.

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
