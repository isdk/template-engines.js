[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / isStringTemplateFinalString

# Function: isStringTemplateFinalString()

> **isStringTemplateFinalString**(`value`): `value is StringTemplateFinalString`

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template-final-string.ts:18](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template-final-string.ts#L18)

Checks whether a value is a `StringTemplateFinalString`.

It relies on the brand symbol placed on the class prototype instead of
`instanceof`, so that instances created in another realm (another copy of
this library) are still recognized.

## Parameters

### value

`unknown`

The value to check.

## Returns

`value is StringTemplateFinalString`

True if the value is a `StringTemplateFinalString`.
