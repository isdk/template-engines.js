# String Template Engines - @isdk/template-engines

This package contains the following template engines: jinja2(hf used), golang, python(f-string), env.

## Description

A versatile template engine library that supports multiple template formats including environment variables, HuggingFace templates, GoLang templates, and Python f-strings. The library provides a unified interface for working with different template systems.

## Features

- Multiple template format support:
  - Environment variable templates
  - HuggingFace/Jinja templates
  - GoLang templates
  - Python f-string templates
- Dynamic template creation and formatting
- Partial data processing
- Template validation
- Extensible architecture

## Installation

```bash
npm install @isdk/template-engines
```

## Usage

Basic Example

```ts
import { StringTemplate } from '@isdk/template-engines';

// Create template instance, defaults to Jinja2 template if no templateFormat
const template = StringTemplate.from("Hello, {{name}}!");

// Format template
const result = await template.format({ name: "World" });
console.log(result); // Output: "Hello, World!"

// Check if a template is a pure placeholder
console.log(StringTemplate.isPurePlaceholder("{{name}}")); // true
console.log(StringTemplate.isPurePlaceholder("  {{name}}  ")); // true
console.log(StringTemplate.isPurePlaceholder("Hello {{name}}")); // false
```

## API Documentation

### StringTemplate Class

The main entry point for working with templates.

#### Static Methods

* `from(template: string|StringTemplateOptions, options?: StringTemplateOptions)` Creates a new template instance.
* `async format(options: StringTemplateOptions)` Formats a template using provided options.
* `async formatIf(options: StringTemplateOptions)` Formats a template if it's valid.
* `isTemplate(templateOpt: StringTemplateOptions)` Checks if given options represent a valid template.
* `isPurePlaceholder(templateOpt: StringTemplateOptions|string)` Checks if the template is a pure placeholder (optionally surrounded by whitespace).

#### Instance Methods

* `filterData(data: Record<string, any>)` Filters input data to include only specified variables.
* `partial(data: Record<string, any>)` Creates a new template instance with partially filled data.
* `async format(data?: Record<string, any>):` Formats a template using provided options.
* `isPurePlaceholder()` Checks if the template instance is a pure placeholder.
* `toJSON()` Serializes the template instance to JSON.

### Template Engines

The library supports multiple template engines:

* Environment Variable Templates
  * Parses and interpolates environment variables
  * Supports variable extraction
* HuggingFace Templates
  * Jinja-based template engine
  * Supports complex template structures
  * Handles internal variables
* GoLang Templates
  * Supports Go-style template syntax
  * Extracts variables from template strings
* Python F-String Templates
  * Parses Python-style f-strings
  * Supports variable interpolation

### Error Handling

The library uses `CommonError` for error management with specific error codes:

* Invalid template formats
* Missing required parameters
* Template parsing errors

### Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
1. Create your feature branch (git checkout -b feature/fooBar)
1. Commit your changes (git commit -am 'Add some fooBar')
1. Push to the branch (git push origin feature/fooBar)
1. Create a new Pull Request

## License

MIT License