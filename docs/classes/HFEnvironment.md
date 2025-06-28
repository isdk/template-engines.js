[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / HFEnvironment

# Class: HFEnvironment

Defined in: [packages/template-engines/src/template/jinja/src/environment-ex.ts:3](https://github.com/isdk/template-engines.js/blob/3fa19a5e2f28080ee5224b7dd1b89ad779956584/src/template/jinja/src/environment-ex.ts#L3)

## Extends

- `Environment`

## Constructors

### new HFEnvironment()

> **new HFEnvironment**(`parent`?): [`HFEnvironment`](HFEnvironment.md)

Defined in: [packages/template-engines/src/template/jinja/src/environment-ex.ts:4](https://github.com/isdk/template-engines.js/blob/3fa19a5e2f28080ee5224b7dd1b89ad779956584/src/template/jinja/src/environment-ex.ts#L4)

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

Defined in: [packages/template-engines/src/template/jinja/src/environment-ex.ts:4](https://github.com/isdk/template-engines.js/blob/3fa19a5e2f28080ee5224b7dd1b89ad779956584/src/template/jinja/src/environment-ex.ts#L4)

#### Inherited from

`Environment.parent`

***

### tests

> **tests**: `Map`\<`string`, (...`value`) => `boolean`\>

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:327](https://github.com/isdk/template-engines.js/blob/3fa19a5e2f28080ee5224b7dd1b89ad779956584/src/template/jinja/src/runtime.ts#L327)

The tests available in this environment.

#### Inherited from

`Environment.tests`

***

### variables

> **variables**: `Map`\<`string`, `AnyRuntimeValue`\>

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:309](https://github.com/isdk/template-engines.js/blob/3fa19a5e2f28080ee5224b7dd1b89ad779956584/src/template/jinja/src/runtime.ts#L309)

The variables declared in this environment.

#### Inherited from

`Environment.variables`

## Methods

### assign()

> **assign**(`items`): `void`

Defined in: [packages/template-engines/src/template/jinja/src/environment-ex.ts:8](https://github.com/isdk/template-engines.js/blob/3fa19a5e2f28080ee5224b7dd1b89ad779956584/src/template/jinja/src/environment-ex.ts#L8)

#### Parameters

##### items

`Record`\<`string`, `unknown`\>

#### Returns

`void`

***

### clear()

> **clear**(): `void`

Defined in: [packages/template-engines/src/template/jinja/src/environment-ex.ts:14](https://github.com/isdk/template-engines.js/blob/3fa19a5e2f28080ee5224b7dd1b89ad779956584/src/template/jinja/src/environment-ex.ts#L14)

#### Returns

`void`

***

### lookupVariable()

> **lookupVariable**(`name`): `AnyRuntimeValue`

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:426](https://github.com/isdk/template-engines.js/blob/3fa19a5e2f28080ee5224b7dd1b89ad779956584/src/template/jinja/src/runtime.ts#L426)

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

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:381](https://github.com/isdk/template-engines.js/blob/3fa19a5e2f28080ee5224b7dd1b89ad779956584/src/template/jinja/src/runtime.ts#L381)

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

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:403](https://github.com/isdk/template-engines.js/blob/3fa19a5e2f28080ee5224b7dd1b89ad779956584/src/template/jinja/src/runtime.ts#L403)

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
