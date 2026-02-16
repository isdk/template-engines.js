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

## Installation

```bash
npm install @isdk/template-engines
```

## Usage

Basic Example

```ts
import { StringTemplate } from '@isdk/template-engines'

// Create template instance, defaults to Jinja2 template if no templateFormat
const template = StringTemplate.from('Hello, {{name}}!')

// Format template
const result = await template.format({ name: 'World' })
console.log(result) // Output: "Hello, World!"

// Check if a template is a pure placeholder
console.log(StringTemplate.isPurePlaceholder('{{name}}')) // true
console.log(StringTemplate.isPurePlaceholder('  {{name}}  ')) // true
console.log(StringTemplate.isPurePlaceholder('Hello {{name}}')) // false

// Get variable name from a pure placeholder
console.log(StringTemplate.getPurePlaceholderVariable('{{name}}')) // "name"
console.log(StringTemplate.getPurePlaceholderVariable('  {{name}}  ')) // "name"
console.log(StringTemplate.getPurePlaceholderVariable('Hello {{name}}')) // undefined

// Return raw value (object, boolean, etc.) instead of string
const data = { user: { name: 'Alice' }, active: true }
console.log(
  await StringTemplate.format({ template: '{{user}}', data, raw: true })
) // { name: 'Alice' }
console.log(
  await StringTemplate.format({ template: '{{active}}', data, raw: true })
) // true

// Partial data processing
const template = StringTemplate.from('{{role}}: {{text}}')
const partialTemplate = template.partial({ role: 'user' })
console.log(await partialTemplate.format({ text: 'Hello!' })) // "user: Hello!"

// Partial with dynamic function
const dynamicTemplate = StringTemplate.from('{{time}}: {{message}}')
const loggerTemplate = dynamicTemplate.partial({
  time: () => new Date().toLocaleTimeString(),
})
console.log(await loggerTemplate.format({ message: 'System started' })) // e.g., "10:30:00 AM: System started"
```

## API Documentation

### StringTemplate Class

The main entry point for working with templates.

#### StringTemplateOptions

- `template?: string` The template string.
- `data?: Record<string, any>` The data for interpolation.
- `templateFormat?: string` The format of the template (e.g., 'hf', 'env', 'golang', 'f-string').
- `raw?: boolean` If true, returns the raw value for pure placeholders instead of a string.
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
