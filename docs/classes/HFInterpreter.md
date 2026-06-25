[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / HFInterpreter

# Class: HFInterpreter

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:513](https://github.com/isdk/template-engines.js/blob/9a37394fbf9a3672b2153ff6cd2da9a24463dcd5/src/template/jinja/src/runtime.ts#L513)

## Constructors

### Constructor

> **new HFInterpreter**(`env?`): `Interpreter`

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:516](https://github.com/isdk/template-engines.js/blob/9a37394fbf9a3672b2153ff6cd2da9a24463dcd5/src/template/jinja/src/runtime.ts#L516)

#### Parameters

##### env?

`Environment`

#### Returns

`Interpreter`

## Properties

### global

> **global**: `Environment`

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:514](https://github.com/isdk/template-engines.js/blob/9a37394fbf9a3672b2153ff6cd2da9a24463dcd5/src/template/jinja/src/runtime.ts#L514)

## Methods

### evaluate()

> **evaluate**(`statement`, `environment`): `AnyRuntimeValue`

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:1320](https://github.com/isdk/template-engines.js/blob/9a37394fbf9a3672b2153ff6cd2da9a24463dcd5/src/template/jinja/src/runtime.ts#L1320)

#### Parameters

##### statement

`Statement` \| `undefined`

##### environment

`Environment`

#### Returns

`AnyRuntimeValue`

***

### run()

> **run**(`program`): `AnyRuntimeValue`

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:523](https://github.com/isdk/template-engines.js/blob/9a37394fbf9a3672b2153ff6cd2da9a24463dcd5/src/template/jinja/src/runtime.ts#L523)

Run the program.

#### Parameters

##### program

`Program`

#### Returns

`AnyRuntimeValue`
