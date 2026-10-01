[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / PickStringTemplateDataOptions

# Interface: PickStringTemplateDataOptions

Defined in: [@isdk/ai-tools/packages/template-engines/src/utils/pick-string-template-data.ts:5](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/utils/pick-string-template-data.ts#L5)

## Properties

### invalidUsage?

> `optional` **invalidUsage?**: `"undefined"` \| `"null"` \| `"remove"`

Defined in: [@isdk/ai-tools/packages/template-engines/src/utils/pick-string-template-data.ts:12](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/utils/pick-string-template-data.ts#L12)

What to do with non-formatable values.
- 'remove' (default): Remove the property from objects or element from arrays.
- 'null': Set the value to null.
- 'undefined': Set the value to undefined.
