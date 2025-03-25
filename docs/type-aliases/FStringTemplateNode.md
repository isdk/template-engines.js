[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / FStringTemplateNode

# Type Alias: FStringTemplateNode

> **FStringTemplateNode**: \{ `text`: `string`; `type`: `"literal"`; \} \| \{ `name`: `string`; `type`: `"variable"`; \}

Defined in: [packages/template-engines/src/template/python.ts:6](https://github.com/isdk/template-engines.js/blob/cb1445972f4290df93d1730f7569a7c44b07e85e/src/template/python.ts#L6)

Type that represents a node in a parsed format string. It can be either
a literal text or a variable name.
