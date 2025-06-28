[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / HFInterpreter

# Class: HFInterpreter

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:435](https://github.com/isdk/template-engines.js/blob/3fa19a5e2f28080ee5224b7dd1b89ad779956584/src/template/jinja/src/runtime.ts#L435)

## Constructors

### new HFInterpreter()

> **new HFInterpreter**(`env`?): [`HFInterpreter`](HFInterpreter.md)

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:438](https://github.com/isdk/template-engines.js/blob/3fa19a5e2f28080ee5224b7dd1b89ad779956584/src/template/jinja/src/runtime.ts#L438)

#### Parameters

##### env?

`Environment`

#### Returns

[`HFInterpreter`](HFInterpreter.md)

## Properties

### global

> **global**: `Environment`

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:436](https://github.com/isdk/template-engines.js/blob/3fa19a5e2f28080ee5224b7dd1b89ad779956584/src/template/jinja/src/runtime.ts#L436)

## Methods

### evaluate()

> **evaluate**(`statement`, `environment`): `AnyRuntimeValue`

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:1127](https://github.com/isdk/template-engines.js/blob/3fa19a5e2f28080ee5224b7dd1b89ad779956584/src/template/jinja/src/runtime.ts#L1127)

#### Parameters

##### statement

`undefined` | `Statement`

##### environment

`Environment`

#### Returns

`AnyRuntimeValue`

***

### run()

> **run**(`program`): `AnyRuntimeValue`

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:445](https://github.com/isdk/template-engines.js/blob/3fa19a5e2f28080ee5224b7dd1b89ad779956584/src/template/jinja/src/runtime.ts#L445)

Run the program.

#### Parameters

##### program

`Program`

#### Returns

`AnyRuntimeValue`
