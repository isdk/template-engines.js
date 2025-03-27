[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / HFEnvironment

# Class: HFEnvironment

Defined in: [packages/template-engines/src/template/jinja/src/environment-ex.ts:3](https://github.com/isdk/template-engines.js/blob/466ebe226b36554b365e0202c4f1d42ff9f95a09/src/template/jinja/src/environment-ex.ts#L3)

## Extends

- `Environment`

## Constructors

### new HFEnvironment()

> **new HFEnvironment**(`parent`?): [`HFEnvironment`](HFEnvironment.md)

Defined in: [packages/template-engines/src/template/jinja/src/environment-ex.ts:4](https://github.com/isdk/template-engines.js/blob/466ebe226b36554b365e0202c4f1d42ff9f95a09/src/template/jinja/src/environment-ex.ts#L4)

#### Parameters

##### parent?

[`HFEnvironment`](HFEnvironment.md)

#### Returns

[`HFEnvironment`](HFEnvironment.md)

#### Overrides

`Environment.constructor`

## Properties

### parent?

> `optional` **parent**: [`HFEnvironment`](HFEnvironment.md)

Defined in: [packages/template-engines/src/template/jinja/src/environment-ex.ts:4](https://github.com/isdk/template-engines.js/blob/466ebe226b36554b365e0202c4f1d42ff9f95a09/src/template/jinja/src/environment-ex.ts#L4)

#### Inherited from

`Environment.parent`

***

### tests

> **tests**: `Map`\<`string`, (...`value`) => `boolean`\>

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:320](https://github.com/isdk/template-engines.js/blob/466ebe226b36554b365e0202c4f1d42ff9f95a09/src/template/jinja/src/runtime.ts#L320)

The tests available in this environment.

#### Inherited from

`Environment.tests`

***

### variables

> **variables**: `Map`\<`string`, `AnyRuntimeValue`\>

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:302](https://github.com/isdk/template-engines.js/blob/466ebe226b36554b365e0202c4f1d42ff9f95a09/src/template/jinja/src/runtime.ts#L302)

The variables declared in this environment.

#### Inherited from

`Environment.variables`

## Methods

### assign()

> **assign**(`items`): `void`

Defined in: [packages/template-engines/src/template/jinja/src/environment-ex.ts:8](https://github.com/isdk/template-engines.js/blob/466ebe226b36554b365e0202c4f1d42ff9f95a09/src/template/jinja/src/environment-ex.ts#L8)

#### Parameters

##### items

`Record`\<`string`, `unknown`\>

#### Returns

`void`

***

### clear()

> **clear**(): `void`

Defined in: [packages/template-engines/src/template/jinja/src/environment-ex.ts:14](https://github.com/isdk/template-engines.js/blob/466ebe226b36554b365e0202c4f1d42ff9f95a09/src/template/jinja/src/environment-ex.ts#L14)

#### Returns

`void`

***

### lookupVariable()

> **lookupVariable**(`name`): `AnyRuntimeValue`

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:419](https://github.com/isdk/template-engines.js/blob/466ebe226b36554b365e0202c4f1d42ff9f95a09/src/template/jinja/src/runtime.ts#L419)

#### Parameters

##### name

`string`

#### Returns

`AnyRuntimeValue`

#### Inherited from

`Environment.lookupVariable`

***

### set()

> **set**(`name`, `value`): `AnyRuntimeValue`

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:374](https://github.com/isdk/template-engines.js/blob/466ebe226b36554b365e0202c4f1d42ff9f95a09/src/template/jinja/src/runtime.ts#L374)

Set the value of a variable in the current environment.

#### Parameters

##### name

`string`

##### value

`unknown`

#### Returns

`AnyRuntimeValue`

#### Inherited from

`Environment.set`

***

### setVariable()

> **setVariable**(`name`, `value`): `AnyRuntimeValue`

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:396](https://github.com/isdk/template-engines.js/blob/466ebe226b36554b365e0202c4f1d42ff9f95a09/src/template/jinja/src/runtime.ts#L396)

Set variable in the current scope.
See https://jinja.palletsprojects.com/en/3.0.x/templates/#assignments for more information.

#### Parameters

##### name

`string`

##### value

`AnyRuntimeValue`

#### Returns

`AnyRuntimeValue`

#### Inherited from

`Environment.setVariable`
