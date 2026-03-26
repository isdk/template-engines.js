[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / HFInterpreter

# Class: HFInterpreter

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:513](https://github.com/isdk/template-engines.js/blob/8468b3d69f22c554f3c3c1a209861ed95f2c96bb/src/template/jinja/src/runtime.ts#L513)

## Constructors

### Constructor

> **new HFInterpreter**(`env?`): `Interpreter`

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:516](https://github.com/isdk/template-engines.js/blob/8468b3d69f22c554f3c3c1a209861ed95f2c96bb/src/template/jinja/src/runtime.ts#L516)

#### Parameters

##### env?

`Environment`

#### Returns

`Interpreter`

## Properties

### global

> **global**: `Environment`

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:514](https://github.com/isdk/template-engines.js/blob/8468b3d69f22c554f3c3c1a209861ed95f2c96bb/src/template/jinja/src/runtime.ts#L514)

## Methods

### evaluate()

> **evaluate**(`statement`, `environment`): `AnyRuntimeValue`

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:1316](https://github.com/isdk/template-engines.js/blob/8468b3d69f22c554f3c3c1a209861ed95f2c96bb/src/template/jinja/src/runtime.ts#L1316)

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

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:523](https://github.com/isdk/template-engines.js/blob/8468b3d69f22c554f3c3c1a209861ed95f2c96bb/src/template/jinja/src/runtime.ts#L523)

Run the program.

#### Parameters

##### program

`Program`

#### Returns

`AnyRuntimeValue`
