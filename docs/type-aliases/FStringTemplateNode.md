[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / FStringTemplateNode

# Type Alias: FStringTemplateNode

> **FStringTemplateNode** = \{ `index`: `number`; `len`: `number`; `text`: `string`; `type`: `"literal"`; \} \| \{ `index`: `number`; `len`: `number`; `name`: `string`; `type`: `"variable"`; \}

Defined in: [packages/template-engines/src/template/python.ts:6](https://github.com/isdk/template-engines.js/blob/e7fd5627a87b9ce2ab4df5ca32d567c23479ef12/src/template/python.ts#L6)

Type that represents a node in a parsed format string. It can be either
a literal text or a variable name.
