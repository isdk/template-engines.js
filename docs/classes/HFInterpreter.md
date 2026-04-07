[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / HFInterpreter

# Class: HFInterpreter

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:513](https://github.com/isdk/template-engines.js/blob/7dade55e7c19979497e3b2db807022ef515c1e84/src/template/jinja/src/runtime.ts#L513)

## Constructors

### Constructor

> **new HFInterpreter**(`env?`): `Interpreter`

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:516](https://github.com/isdk/template-engines.js/blob/7dade55e7c19979497e3b2db807022ef515c1e84/src/template/jinja/src/runtime.ts#L516)

#### Parameters

##### env?

`Environment`

#### Returns

`Interpreter`

## Properties

### global

> **global**: `Environment`

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:514](https://github.com/isdk/template-engines.js/blob/7dade55e7c19979497e3b2db807022ef515c1e84/src/template/jinja/src/runtime.ts#L514)

## Methods

### evaluate()

> **evaluate**(`statement`, `environment`): `AnyRuntimeValue`

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:1316](https://github.com/isdk/template-engines.js/blob/7dade55e7c19979497e3b2db807022ef515c1e84/src/template/jinja/src/runtime.ts#L1316)

#### Parameters

##### statement

`Statement` | `undefined`

##### environment

`Environment`

#### Returns

`AnyRuntimeValue`

***

### run()

> **run**(`program`): `AnyRuntimeValue`

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:523](https://github.com/isdk/template-engines.js/blob/7dade55e7c19979497e3b2db807022ef515c1e84/src/template/jinja/src/runtime.ts#L523)

Run the program.

#### Parameters

##### program

`Program`

#### Returns

`AnyRuntimeValue`
