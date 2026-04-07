[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / HFEnvironment

# Class: HFEnvironment

Defined in: [packages/template-engines/src/template/jinja/src/environment-ex.ts:3](https://github.com/isdk/template-engines.js/blob/7dade55e7c19979497e3b2db807022ef515c1e84/src/template/jinja/src/environment-ex.ts#L3)

## Extends

- `Environment`

## Constructors

### Constructor

> **new HFEnvironment**(`parent?`): `EnvironmentEx`

Defined in: [packages/template-engines/src/template/jinja/src/environment-ex.ts:4](https://github.com/isdk/template-engines.js/blob/7dade55e7c19979497e3b2db807022ef515c1e84/src/template/jinja/src/environment-ex.ts#L4)

#### Parameters

##### parent?

`EnvironmentEx`

#### Returns

`EnvironmentEx`

#### Overrides

`Environment.constructor`

## Properties

### parent?

> `optional` **parent**: `EnvironmentEx`

Defined in: [packages/template-engines/src/template/jinja/src/environment-ex.ts:4](https://github.com/isdk/template-engines.js/blob/7dade55e7c19979497e3b2db807022ef515c1e84/src/template/jinja/src/environment-ex.ts#L4)

#### Inherited from

`Environment.parent`

***

### tests

> **tests**: `Map`\<`string`, (...`value`) => `boolean`\>

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:385](https://github.com/isdk/template-engines.js/blob/7dade55e7c19979497e3b2db807022ef515c1e84/src/template/jinja/src/runtime.ts#L385)

The tests available in this environment.

#### Inherited from

`Environment.tests`

***

### variables

> **variables**: `Map`\<`string`, `AnyRuntimeValue`\>

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:365](https://github.com/isdk/template-engines.js/blob/7dade55e7c19979497e3b2db807022ef515c1e84/src/template/jinja/src/runtime.ts#L365)

The variables declared in this environment.

#### Inherited from

`Environment.variables`

## Methods

### assign()

> **assign**(`items`): `void`

Defined in: [packages/template-engines/src/template/jinja/src/environment-ex.ts:8](https://github.com/isdk/template-engines.js/blob/7dade55e7c19979497e3b2db807022ef515c1e84/src/template/jinja/src/environment-ex.ts#L8)

#### Parameters

##### items

`Record`\<`string`, `unknown`\>

#### Returns

`void`

***

### clear()

> **clear**(): `void`

Defined in: [packages/template-engines/src/template/jinja/src/environment-ex.ts:14](https://github.com/isdk/template-engines.js/blob/7dade55e7c19979497e3b2db807022ef515c1e84/src/template/jinja/src/environment-ex.ts#L14)

#### Returns

`void`

***

### lookupVariable()

> **lookupVariable**(`name`): `AnyRuntimeValue`

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:504](https://github.com/isdk/template-engines.js/blob/7dade55e7c19979497e3b2db807022ef515c1e84/src/template/jinja/src/runtime.ts#L504)

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

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:456](https://github.com/isdk/template-engines.js/blob/7dade55e7c19979497e3b2db807022ef515c1e84/src/template/jinja/src/runtime.ts#L456)

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

Defined in: [packages/template-engines/src/template/jinja/src/runtime.ts:481](https://github.com/isdk/template-engines.js/blob/7dade55e7c19979497e3b2db807022ef515c1e84/src/template/jinja/src/runtime.ts#L481)

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
