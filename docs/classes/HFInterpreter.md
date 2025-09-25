[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / HFInterpreter

# Class: HFInterpreter

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:455](https://github.com/isdk/template-engines.js/blob/ac967510ba7106fd9435480a9cf25b40e72c30bc/src/template/jinja/src/runtime.ts#L455)

## Constructors

### Constructor

> **new HFInterpreter**(`env?`): `Interpreter`

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:458](https://github.com/isdk/template-engines.js/blob/ac967510ba7106fd9435480a9cf25b40e72c30bc/src/template/jinja/src/runtime.ts#L458)

#### Parameters

##### env?

`Environment`

#### Returns

`Interpreter`

## Properties

### global

> **global**: `Environment`

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:456](https://github.com/isdk/template-engines.js/blob/ac967510ba7106fd9435480a9cf25b40e72c30bc/src/template/jinja/src/runtime.ts#L456)

## Methods

### evaluate()

> **evaluate**(`statement`, `environment`): `AnyRuntimeValue`

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:1147](https://github.com/isdk/template-engines.js/blob/ac967510ba7106fd9435480a9cf25b40e72c30bc/src/template/jinja/src/runtime.ts#L1147)

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

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:465](https://github.com/isdk/template-engines.js/blob/ac967510ba7106fd9435480a9cf25b40e72c30bc/src/template/jinja/src/runtime.ts#L465)

Run the program.

#### Parameters

##### program

`Program`

#### Returns

`AnyRuntimeValue`
