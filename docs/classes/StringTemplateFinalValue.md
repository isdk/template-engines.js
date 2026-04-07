[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / StringTemplateFinalValue

# Class: StringTemplateFinalValue

Defined in: [packages/template-engines/src/string-template.ts:75](https://github.com/isdk/template-engines.js/blob/7dade55e7c19979497e3b2db807022ef515c1e84/src/string-template.ts#L75)

The `StringTemplateFinalValue` class is a wrapper for a value that should NOT be expanded as a template.
Use this to protect business data that might contain template-like syntax from being secondary rendered.

It acts as a transparent wrapper:
- `toString()` returns the string representation of the underlying value.
- `valueOf()` returns the underlying value.
- `toJSON()` ensures that when the object is serialized via `JSON.stringify()`, it returns the
  underlying value (or calls the underlying value's `toJSON` if it exists), making it
  seamlessly compatible with JSON-based data transfers.

## Example

```typescript
const data = {
  code: new StringTemplateFinalValue("function test() { return '{{val}}'; }"),
  val: "something"
};
const result = await StringTemplate.format({ template: "{{code}}", data });
console.log(result); // "function test() { return '{{val}}'; }" (preserved literally)

// JSON serialization transparency:
console.log(JSON.stringify(data.code)); // "\"function test() { return '{{val}}'; }\""
```

## Constructors

### Constructor

> **new StringTemplateFinalValue**(`value`): `StringTemplateFinalValue`

Defined in: [packages/template-engines/src/string-template.ts:76](https://github.com/isdk/template-engines.js/blob/7dade55e7c19979497e3b2db807022ef515c1e84/src/string-template.ts#L76)

#### Parameters

##### value

`any`

#### Returns

`StringTemplateFinalValue`

## Properties

### value

> **value**: `any`

Defined in: [packages/template-engines/src/string-template.ts:76](https://github.com/isdk/template-engines.js/blob/7dade55e7c19979497e3b2db807022ef515c1e84/src/string-template.ts#L76)

## Methods

### toJSON()

> **toJSON**(`key?`): `any`

Defined in: [packages/template-engines/src/string-template.ts:96](https://github.com/isdk/template-engines.js/blob/7dade55e7c19979497e3b2db807022ef515c1e84/src/string-template.ts#L96)

Ensures transparent JSON serialization.
If the wrapped value has its own `toJSON` method, it will be called.
Otherwise, the wrapped value is returned directly.

#### Parameters

##### key?

`string`

The key of the property being serialized (passed by JSON.stringify).

#### Returns

`any`

***

### toString()

> **toString**(): `string`

Defined in: [packages/template-engines/src/string-template.ts:80](https://github.com/isdk/template-engines.js/blob/7dade55e7c19979497e3b2db807022ef515c1e84/src/string-template.ts#L80)

Returns the string representation of the wrapped value.

#### Returns

`string`

***

### valueOf()

> **valueOf**(): `any`

Defined in: [packages/template-engines/src/string-template.ts:86](https://github.com/isdk/template-engines.js/blob/7dade55e7c19979497e3b2db807022ef515c1e84/src/string-template.ts#L86)

Returns the wrapped value itself.

#### Returns

`any`
