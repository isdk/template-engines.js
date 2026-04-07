**@isdk/template-engines**

***

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
