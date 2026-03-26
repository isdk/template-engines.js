[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / FStringTemplateNode

# Type Alias: FStringTemplateNode

> **FStringTemplateNode** = \{ `index`: `number`; `len`: `number`; `text`: `string`; `type`: `"literal"`; \} \| \{ `index`: `number`; `len`: `number`; `name`: `string`; `type`: `"variable"`; \}

Defined in: [packages/template-engines/src/template/python.ts:6](https://github.com/isdk/template-engines.js/blob/8468b3d69f22c554f3c3c1a209861ed95f2c96bb/src/template/python.ts#L6)

Type that represents a node in a parsed format string. It can be either
a literal text or a variable name.
