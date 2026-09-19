# String Template Engines - @isdk/template-engines

This package contains the following template engines: jinja2(hf used), golang, python(f-string), env.

## Description

A versatile template engine library that supports multiple template formats including environment variables, HuggingFace templates, GoLang templates, and Python f-strings. The library provides a unified interface for working with different template systems.

## Features

- **Unified Interface**: Provide a consistent API (`format`, `from`, `isTemplate`) to interact with various template engines (Jinja2, GoLang, f-string, Env), making it easy to switch between formats without changing your logic.
- **Smart Placeholder Detection**: Effortlessly identify if a string is a "pure placeholder" (e.g., `{{name}}`). This is useful for detecting direct variable references.
- **Raw Value Preservation**: With the `raw` option, pure placeholders can return their original data types (objects, arrays, booleans) directly from the data source, bypassing string conversion—perfect for configuration management.
- **Advanced Partial Filling**: Supports pre-filling templates with static values or dynamic functions. Dynamic functions are executed at formatting time, allowing for real-time data like timestamps or session IDs.
- **Extensible Architecture**: Easily register new template formats and aliases using the built-in factory pattern, allowing the library to grow with your needs.
- **Partial Data Processing**: Reuse templates by creating new instances with pre-configured data context.
- **Recursive Rendering**: Automatically expand template variables if their values contain template-like syntax, supporting deeply nested data resolution.
- **Expansion Control**: Use `expandValue: false` or `StringTemplateFinalValue` to prevent secondary rendering, ensuring business data integrity.
- **Automatic Output Protection**: Rendering results that still contain template literals are returned as a `StringTemplateFinalString`, which behaves like a plain string in string contexts (interpolation, concatenation, JSON) but is never expanded again by later rendering passes.

## Installation

```bash
npm install @isdk/template-engines
```

## Usage

### 1. Basic Formatting

Simple variable replacement using the default engine (Jinja2).

```ts
import { StringTemplate } from '@isdk/template-engines'

const template = StringTemplate.from('Hello, {{name}}!')
const result = await template.format({ name: 'World' })
console.log(result) // "Hello, World!"
```

---

## Advanced Features

### 2. Placeholder Analysis

Identify if a string is a "pure placeholder" and extract the variable name. This is useful for building dynamic logic around template strings.

```ts
// Check for pure placeholders (ignores surrounding whitespace)
StringTemplate.isPurePlaceholder('{{name}}') // true
StringTemplate.isPurePlaceholder('Hello {{name}}') // false

// Extract variable names
StringTemplate.getPurePlaceholderVariable('{{user.profile.id}}') // "user.profile.id"
```

### 3. Data Type Preservation (Raw Mode)

Retrieve original data types (Objects, Arrays, Booleans) directly from the data source instead of converting them to strings.

```ts
const data = { active: true, config: { port: 8080 } }

// Returns boolean true
const active = await StringTemplate.format({
  template: '{{active}}',
  data,
  raw: true
})

// Returns the original object
const config = await StringTemplate.format({
  template: '{{config}}',
  data,
  raw: true
})
```

### 4. Partial Filling & Reusability

Create new template instances with pre-configured data context.

```ts
const base = StringTemplate.from('{{role}}: {{text}}')

// Pre-fill 'role'
const userMsg = base.partial({ role: 'user' })
const adminMsg = base.partial({ role: 'admin' })

console.log(await userMsg.format({ text: 'Hi' }))   // "user: Hi"
console.log(await adminMsg.format({ text: 'Reset' })) // "admin: Reset"
```

### 5. Dynamic Variables (Late Binding)

Inject dynamic data at formatting time using functions.

```ts
const template = StringTemplate.from('Time: {{now}}, Event: {{event}}')
const logger = template.partial({
  now: () => new Date().toISOString()
})

// 'now' function is executed every time format() is called
await logger.format({ event: 'Startup' }) // "Time: 2024-03-20..., Event: Startup"
```

### 6. Recursive Rendering

Automatically resolve templates nested inside variable values. This allows for deep data resolution.

```ts
const data = {
  name: 'Alice',
  greeting: 'Hello, {{name}}!', // This value is also a template
}

// "{{greeting}}" expands to "Hello, {{name}}!", then to "Hello, Alice!"
const result = await StringTemplate.format({
  template: 'System: {{greeting}}',
  data
})
console.log(result) // "System: Hello, Alice!"
```

### 7. Precise Rendering Control (Safety)

Control the recursive behavior to protect business data or performance.

```ts
import { StringTemplateFinalValue } from '@isdk/template-engines'

const data = {
  name: 'World',
  // Use expandValue: false to disable recursion for the entire operation
  msg: 'Template: {{name}}',
  // Use StringTemplateFinalValue to protect specific data
  code: new StringTemplateFinalValue('Code with {{syntax}}'),
}

// 1. Global control
await StringTemplate.format({ template: '{{msg}}', data, expandValue: false })
// Output: "Template: {{name}}"

// 2. Data-level protection
await StringTemplate.format({ template: '{{code}}', data })
// Output: "Code with {{syntax}}" (Preserved literally)

// 3. JSON Serialization Transparency (New)
// StringTemplateFinalValue automatically unwraps during JSON.stringify, 
// ensuring seamless data exchange.
console.log(JSON.stringify(data.code))
// Output: "Code with {{syntax}}"

// 4. Automatic output protection (StringTemplateFinalString)
// If a rendering result still contains template literals (expansion disabled,
// recursion blocked by a circular reference, or a consumed
// StringTemplateFinalValue), it is returned
// as a StringTemplateFinalString: a String object that interpolates, concatenates
// and serializes just like a plain string, but is never expanded again by later
// rendering passes.
const first = await StringTemplate.format({
  template: '{{code}}',
  data: { code: 'return "{{x}}"' },
  expandValue: false,
})
console.log(String(first)) // 'return "{{x}}"'

// A later pass renders it literally — no flags needed:
const second = await StringTemplate.format({
  template: 'CODE:\n{{code}}',
  data: { code: first, x: 'EXPANDED' },
})
console.log(String(second)) // 'CODE:\nreturn "{{x}}"'

// To opt back into expansion (multi-stage pipelines), unwrap it explicitly:
await StringTemplate.format({ template: String(first), data: { x: '1' } })
```

### 8. Extending the Engine (Custom Formats)

Register your own template implementation using the factory pattern.

```ts
import { StringTemplate, StringTemplateOptions } from '@isdk/template-engines'

class MySimpleTemplate extends StringTemplate {
  _initialize(options?: StringTemplateOptions) {
    // Custom initialization logic
  }

  _format(data: Record<string, any>): string {
    // Simple replacement: {var} -> data[var]
    return this.template.replace(/{(\w+)}/g, (_, key) => data[key] || '')
  }
}

// Register as 'myformat'
StringTemplate.register(MySimpleTemplate, { name: 'myformat' })

const result = await StringTemplate.format({
  template: 'Hello {name}',
  templateFormat: 'myformat',
  data: { name: 'Dev' }
})
console.log(result) // "Hello Dev"
```

---

## API Documentation

### StringTemplate Class

The main entry point for working with templates.

#### StringTemplateOptions

- `template?: string` The template string.
- `data?: Record<string, any>` The data for interpolation.
- `templateFormat?: string` The format of the template (e.g., 'hf', 'env', 'golang', 'f-string').
- `raw?: boolean` If true, returns the raw value for pure placeholders instead of a string.
- `expandValue?: boolean` If true (default), automatically expands template-like strings in variables.
- `inputVariables?: string[]` List of expected input variables.

#### Static Methods

- `from(template: string|StringTemplateOptions, options?: StringTemplateOptions)` Creates a new template instance.
- `async format(options: StringTemplateOptions)` Formats a template using provided options.
- `async formatIf(options: StringTemplateOptions)` Formats a template if it's valid.
- `isTemplate(templateOpt: StringTemplateOptions)` Checks if given options represent a valid template.
- `isPurePlaceholder(templateOpt: StringTemplateOptions|string)` Checks if the template is a pure placeholder (optionally surrounded by whitespace).
- `getPurePlaceholderVariable(templateOpt: StringTemplateOptions|string)` Returns the variable name if the template is a pure placeholder.

#### Instance Methods

- `filterData(data: Record<string, any>)` Filters input data to include only specified variables.
- `partial(data: Record<string, any>)` Creates a new template instance with partially filled data.
- `async format(data?: Record<string, any>):` Formats a template using provided options.
- `isPurePlaceholder()` Checks if the template instance is a pure placeholder.
- `getPurePlaceholderVariable()` Returns the variable name if the template instance is a pure placeholder.
- `toJSON()` Serializes the template instance to JSON.

### StringTemplateFinalString Class

A special string-like value returned by `format()` when the rendering result still contains template literals (e.g. `expandValue: false` was used, recursion was blocked by a circular reference, or a `StringTemplateFinalValue` was consumed). It is the automatic output counterpart of `StringTemplateFinalValue`:

- It extends `String`: `String(v)`, `v.toString()`, template literals and concatenation all yield the plain string content.
- `JSON.stringify(v)` serializes it as a plain string — safe to store or send over the wire.
- Empty results are never wrapped, so a `StringTemplateFinalString` value is always truthy.
- When used as data in a later `format()` call, its content is kept literally and never expanded again. Unwrap it with `String(v)` to opt back into expansion.
- Detection is cross-realm safe: use `isStringTemplateFinalString(v)` instead of `instanceof`.

```ts
import { isStringTemplateFinalString } from '@isdk/template-engines'

const first = await StringTemplate.format({
  template: '{{code}}',
  data: { code: 'return "{{x}}"' },
  expandValue: false,
})

isStringTemplateFinalString(first) // true
typeof first // 'object' — it is a String object; use String(first) for strict comparisons
```

#### Boundaries & Migration

**The tag lives on the value, not inside the string content**, so it travels with the value and is lost as soon as the value is converted to a plain string:

- **Works**: within one process, when each layer passes the result along by reference and does no string operation on it. Layers may be fully independent libraries, even loading separate copies of this package — detection uses a `Symbol.for` brand, so it works across realms.
- **Does not work**: across processes / services / databases / an LLM round-trip. After `JSON.stringify` it is a plain string again and the tag is gone.
- **Operations that drop the tag**: `+`, `slice` / `replace` / `trim` / `split`, `String(v)`, `structuredClone` — anything yielding a primitive string.
- **Position decides the role**: the same value still renders normally when passed as `template`; it is only protected when used as **data**. If a layer's output is meant to be the next layer's template, unwrap it explicitly with `String(v)`.

**The return type is a breaking change**: `format()` may now return a `String` object instead of a primitive string.

- `typeof result === 'string'` is now `'object'`;
- `result === '...'` fails — compare with `String(result)` instead;
- everything else (interpolation, `String()`, `JSON.stringify`, string methods) is unchanged.

To keep the previous behaviour, turn output tagging off with `tagFinalString: false` (this only disables *tagging* — protected values are still never expanded when used as data):

```ts
const result = await StringTemplate.format({
  template: '{{code}}',
  data: { code: 'return "{{x}}"' },
  expandValue: false,
  tagFinalString: false,
})

typeof result // 'string'
```

### Utilities

The library provides utility functions for identifying and cleaning template data.

#### `isStringTemplateFormatable(val: any): boolean`

Checks if a value is suitable for use in `StringTemplate` formatting.

- **Formatable values**:
  - **Primitives**: `string`, `number`, `boolean`, `bigint`, `symbol`, `null`, `undefined`.
  - **Functions**: Used as dynamic data sources.
  - **Arrays**: Recursively handled.
  - **Plain Objects**: Objects whose prototype is `Object.prototype` or `null`.
  - **Built-in Objects**: `Date`, `RegExp` (and their subclasses).
  - **Wrapper Objects**: `String`, `Number`, `Boolean`.
  - **`StringTemplateFinalValue`**: Special wrapper for literal protection.
  - **`StringTemplateFinalString`**: Rendering results tagged by the engine (previous output).
- **Non-formatable values**:
  - `Error` instances.
  - `Map`, `Set`, `Promise`.
  - Other custom class instances (not inheriting from allowed types).

#### `pickStringTemplateData(val: any, options?: PickStringTemplateDataOptions): any`

Recursively deep-cleans an object or array to ensure all values are formatable by `StringTemplate`.

- **Recursive Deep-Cleaning**:
  - Traverses Arrays and Plain Objects (enumerable properties only).
  - Handles circular references safely by maintaining reference identity.
  - Preserves `StringTemplateFinalValue` and `StringTemplateFinalString` as leaf nodes (no internal cleaning).
- **Options**:
  - `invalidUsage?: 'remove' | 'null' | 'undefined'`: Determines how to handle non-formatable values.
    - `'remove'` (default): Removes properties from objects or elements from arrays.
    - `'null'`: Sets non-formatable values to `null`.
    - `'undefined'`: Sets non-formatable values to `undefined`.

**Example Usage:**

```typescript
import { pickStringTemplateData } from '@isdk/template-engines';

const dirtyData = {
  name: 'Dev',
  logger: console.log, // Allowed as a function
  internal: new Map(), // Non-formatable
  error: new Error('fail'), // Non-formatable
  metadata: {
    tags: ['a', new Set()], // Nested non-formatable
  }
};

const cleaned = pickStringTemplateData(dirtyData);
// Result: { name: 'Dev', logger: console.log, metadata: { tags: ['a'] } }
```

### Template Engines

The library supports multiple template engines:

- Environment Variable Templates
  - Parses and interpolates environment variables
  - Supports variable extraction
- HuggingFace Templates
  - Jinja-based template engine
  - Supports complex template structures
  - Handles internal variables
- GoLang Templates
  - Supports Go-style template syntax
  - Extracts variables from template strings
- Python F-String Templates
  - Parses Python-style f-strings
  - Supports variable interpolation

### Error Handling

The library uses `CommonError` for error management with specific error codes:

- Invalid template formats
- Missing required parameters
- Template parsing errors

### Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
1. Create your feature branch (git checkout -b feature/fooBar)
1. Commit your changes (git commit -am 'Add some fooBar')
1. Push to the branch (git push origin feature/fooBar)
1. Create a new Pull Request

## License

MIT License
