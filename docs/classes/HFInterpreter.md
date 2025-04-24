[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / HFInterpreter

# Class: HFInterpreter

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:428](https://github.com/isdk/template-engines.js/blob/24b1ccbec627480811c0e55e7b0aa8bfa87438e3/src/template/jinja/src/runtime.ts#L428)

## Constructors

### new HFInterpreter()

> **new HFInterpreter**(`env`?): [`HFInterpreter`](HFInterpreter.md)

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:431](https://github.com/isdk/template-engines.js/blob/24b1ccbec627480811c0e55e7b0aa8bfa87438e3/src/template/jinja/src/runtime.ts#L431)

#### Parameters

##### env?

`Environment`

#### Returns

[`HFInterpreter`](HFInterpreter.md)

## Properties

### global

> **global**: `Environment`

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:429](https://github.com/isdk/template-engines.js/blob/24b1ccbec627480811c0e55e7b0aa8bfa87438e3/src/template/jinja/src/runtime.ts#L429)

## Methods

### evaluate()

> **evaluate**(`statement`, `environment`): `AnyRuntimeValue`

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:1111](https://github.com/isdk/template-engines.js/blob/24b1ccbec627480811c0e55e7b0aa8bfa87438e3/src/template/jinja/src/runtime.ts#L1111)

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

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:438](https://github.com/isdk/template-engines.js/blob/24b1ccbec627480811c0e55e7b0aa8bfa87438e3/src/template/jinja/src/runtime.ts#L438)

Run the program.

#### Parameters

##### program

`Program`

#### Returns

`AnyRuntimeValue`
