[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / HFInterpreter

# Class: HFInterpreter

Defined in: [@isdk/ai-tools/packages/template-engines/src/template/jinja/src/runtime.ts:513](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/template/jinja/src/runtime.ts#L513)

## Constructors

### Constructor

> **new HFInterpreter**(`env?`): `Interpreter`

Defined in: [@isdk/ai-tools/packages/template-engines/src/template/jinja/src/runtime.ts:516](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/template/jinja/src/runtime.ts#L516)

#### Parameters

##### env?

`Environment`

#### Returns

`Interpreter`

## Properties

### global

> **global**: `Environment`

Defined in: [@isdk/ai-tools/packages/template-engines/src/template/jinja/src/runtime.ts:514](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/template/jinja/src/runtime.ts#L514)

## Methods

### evaluate()

> **evaluate**(`statement`, `environment`): `AnyRuntimeValue`

Defined in: [@isdk/ai-tools/packages/template-engines/src/template/jinja/src/runtime.ts:1320](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/template/jinja/src/runtime.ts#L1320)

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

Defined in: [@isdk/ai-tools/packages/template-engines/src/template/jinja/src/runtime.ts:523](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/template/jinja/src/runtime.ts#L523)

Run the program.

#### Parameters

##### program

`Program`

#### Returns

`AnyRuntimeValue`
