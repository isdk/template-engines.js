[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / HFInterpreter

# Class: HFInterpreter

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:455](https://github.com/isdk/template-engines.js/blob/e7fd5627a87b9ce2ab4df5ca32d567c23479ef12/src/template/jinja/src/runtime.ts#L455)

## Constructors

### Constructor

> **new HFInterpreter**(`env?`): `Interpreter`

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:458](https://github.com/isdk/template-engines.js/blob/e7fd5627a87b9ce2ab4df5ca32d567c23479ef12/src/template/jinja/src/runtime.ts#L458)

#### Parameters

##### env?

`Environment`

#### Returns

`Interpreter`

## Properties

### global

> **global**: `Environment`

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:456](https://github.com/isdk/template-engines.js/blob/e7fd5627a87b9ce2ab4df5ca32d567c23479ef12/src/template/jinja/src/runtime.ts#L456)

## Methods

### evaluate()

> **evaluate**(`statement`, `environment`): `AnyRuntimeValue`

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:1147](https://github.com/isdk/template-engines.js/blob/e7fd5627a87b9ce2ab4df5ca32d567c23479ef12/src/template/jinja/src/runtime.ts#L1147)

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

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:465](https://github.com/isdk/template-engines.js/blob/e7fd5627a87b9ce2ab4df5ca32d567c23479ef12/src/template/jinja/src/runtime.ts#L465)

Run the program.

#### Parameters

##### program

`Program`

#### Returns

`AnyRuntimeValue`
