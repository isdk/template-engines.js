[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / FINAL\_STRING\_SYMBOL

# Variable: FINAL\_STRING\_SYMBOL

> `const` **FINAL\_STRING\_SYMBOL**: *typeof* `FINAL_STRING_SYMBOL`

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template-final-string.ts:6](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template-final-string.ts#L6)

The brand symbol used to mark `StringTemplateFinalString` instances.
`Symbol.for` is used so that the marker works across realms (multiple copies
of this library loaded at the same time).
