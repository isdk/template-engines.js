[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / isProtectedEnvValue

# Function: isProtectedEnvValue()

> **isProtectedEnvValue**(`value`): `boolean`

Defined in: [@isdk/ai-tools/packages/template-engines/src/template/env.ts:34](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/template/env.ts#L34)

Checks whether a value must be kept literally by environment interpolation.

Both markers mean "this content is already final, never expand it again":
- `StringTemplateFinalString`: a rendering result tagged by the engine.
- `StringTemplateFinalValue`: a value explicitly protected by the user.

The env engine interpolates data values recursively on its own
(see `interpolateEnv`), so it has to honor these markers itself — otherwise
the protection set by `StringTemplate` is silently bypassed.

## Parameters

### value

`unknown`

The value to check.

## Returns

`boolean`
