[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / isStringTemplateFormatable

# Function: isStringTemplateFormatable()

> **isStringTemplateFormatable**(`val`): `boolean`

Defined in: [packages/template-engines/src/utils/is-string-template-formatable.ts:22](https://github.com/isdk/template-engines.js/blob/9a37394fbf9a3672b2153ff6cd2da9a24463dcd5/src/utils/is-string-template-formatable.ts#L22)

Checks if a value is suitable for use in StringTemplate formatting.

Formatable values include:
- Primitives: string, number, boolean, bigint, symbol, null, undefined
- Functions (used for dynamic data)
- Arrays
- Plain Objects (prototype is Object.prototype or null)
- StringTemplateFinalValue instances
- Built-in wrapper objects: String, Number, Boolean, Date, RegExp

Non-formatable values include:
- Error instances
- Other custom class instances (unless they are StringTemplateFinalValue)
- Map, Set, Promise (not directly supported by current template engines)

## Parameters

### val

`any`

The value to check.

## Returns

`boolean`

True if the value is formatable; otherwise, false.
