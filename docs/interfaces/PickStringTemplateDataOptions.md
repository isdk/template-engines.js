[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / PickStringTemplateDataOptions

# Interface: PickStringTemplateDataOptions

Defined in: [packages/template-engines/src/utils/pick-string-template-data.ts:4](https://github.com/isdk/template-engines.js/blob/9a37394fbf9a3672b2153ff6cd2da9a24463dcd5/src/utils/pick-string-template-data.ts#L4)

## Properties

### invalidUsage?

> `optional` **invalidUsage?**: `"undefined"` \| `"null"` \| `"remove"`

Defined in: [packages/template-engines/src/utils/pick-string-template-data.ts:11](https://github.com/isdk/template-engines.js/blob/9a37394fbf9a3672b2153ff6cd2da9a24463dcd5/src/utils/pick-string-template-data.ts#L11)

What to do with non-formatable values.
- 'remove' (default): Remove the property from objects or element from arrays.
- 'null': Set the value to null.
- 'undefined': Set the value to undefined.
