[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / isStringTemplateFormatable

# Function: isStringTemplateFormatable()

> **isStringTemplateFormatable**(`val`): `boolean`

Defined in: [@isdk/ai-tools/packages/template-engines/src/utils/is-string-template-formatable.ts:24](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/utils/is-string-template-formatable.ts#L24)

Checks if a value is suitable for use in StringTemplate formatting.

Formatable values include:
- Primitives: string, number, boolean, bigint, symbol, null, undefined
- Functions (used for dynamic data)
- Arrays
- Plain Objects (prototype is Object.prototype or null)
- StringTemplateFinalValue instances
- StringTemplateFinalString instances (previous rendering results)
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
