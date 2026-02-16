# 字符串模板引擎 - @isdk/template-engines

该包包含以下模板引擎：jinja2 (hf 使用), golang, python (f-string), env。

## 描述

一个通用的模板引擎库，支持多种模板格式，包括环境变量、HuggingFace 模板、GoLang 模板和 Python f-string。该库为处理不同的模板系统提供了统一的接口。

## 特性

- **统一的接口**：通过一致的 API（`format`, `from`, `isTemplate`）与各种模板引擎（Jinja2, GoLang, f-string, Env）交互，无需更改逻辑即可轻松切换格式。
- **智能占位符检测**：轻松识别字符串是否为“纯占位符”（例如 `{{name}}`）。这在检测直接变量引用时非常有用。
- **原始值保持**：通过 `raw` 选项，纯占位符可以直接从数据源返回原始数据类型（对象、数组、布尔值等），跳过字符串转换——非常适合配置管理场景。
- **高级部分填充**：支持使用静态值或动态函数预填充模板。动态函数在格式化时执行，允许注入实时数据，如时间戳或会话 ID。
- **可扩展架构**：使用内置的工厂模式轻松注册新的模板格式和别名，使库能够随您的需求增长。
- **部分数据处理**：通过创建带有预配置数据上下文的新实例来复用模板。

## 安装

```bash
npm install @isdk/template-engines
```

## 使用方法

基础示例

```ts
import { StringTemplate } from '@isdk/template-engines'

// 创建模板实例，如果没有指定 templateFormat，默认为 Jinja2 模板
const template = StringTemplate.from('Hello, {{name}}!')

// 格式化模板
const result = await template.format({ name: 'World' })
console.log(result) // 输出: "Hello, World!"

// 检查模板是否为纯占位符
console.log(StringTemplate.isPurePlaceholder('{{name}}')) // true
console.log(StringTemplate.isPurePlaceholder('  {{name}}  ')) // true
console.log(StringTemplate.isPurePlaceholder('Hello {{name}}')) // false

// 从纯占位符中获取变量名
console.log(StringTemplate.getPurePlaceholderVariable('{{name}}')) // "name"
console.log(StringTemplate.getPurePlaceholderVariable('  {{name}}  ')) // "name"
console.log(StringTemplate.getPurePlaceholderVariable('Hello {{name}}')) // undefined

// 返回原始值（对象、布尔值等）而不是字符串
const data = { user: { name: 'Alice' }, active: true }
console.log(
  await StringTemplate.format({ template: '{{user}}', data, raw: true })
) // { name: 'Alice' }
console.log(
  await StringTemplate.format({ template: '{{active}}', data, raw: true })
) // true

// 部分数据处理 (Partial data processing)
const template = StringTemplate.from('{{role}}: {{text}}')
const partialTemplate = template.partial({ role: 'user' })
console.log(await partialTemplate.format({ text: '你好！' })) // "user: 你好！"

// 使用函数进行动态数据处理
const dynamicTemplate = StringTemplate.from('{{time}}: {{message}}')
const loggerTemplate = dynamicTemplate.partial({
  time: () => new Date().toLocaleTimeString(),
})
console.log(await loggerTemplate.format({ message: '系统已启动' })) // 例如: "10:30:00 AM: 系统已启动"
```

## API 文档

### StringTemplate 类

使用模板的主要入口点。

#### StringTemplateOptions

- `template?: string` 模板字符串。
- `data?: Record<string, any>` 用于插值的数据。
- `templateFormat?: string` 模板格式 (例如 'hf', 'env', 'golang', 'f-string')。
- `raw?: boolean` 如果为 true，对于纯占位符返回原始值而不是字符串。
- `inputVariables?: string[]` 预期的输入变量列表。

#### 静态方法

- `from(template: string|StringTemplateOptions, options?: StringTemplateOptions)` 创建新的模板实例。
- `async format(options: StringTemplateOptions)` 使用提供的选项格式化模板。
- `async formatIf(options: StringTemplateOptions)` 如果模板有效，则进行格式化。
- `isTemplate(templateOpt: StringTemplateOptions)` 检查给定选项是否代表有效的模板。
- `isPurePlaceholder(templateOpt: StringTemplateOptions|string)` 检查模板是否为纯占位符（可选地被空白字符包围）。
- `getPurePlaceholderVariable(templateOpt: StringTemplateOptions|string)` 如果模板是纯占位符，则返回其变量名。

#### 实例方法

- `filterData(data: Record<string, any>)` 过滤输入数据以仅包含指定的变量。
- `partial(data: Record<string, any>` 使用部分填充的数据创建新的模板实例。
- `async format(data?: Record<string, any>):` 使用提供的选项格式化模板。
- `isPurePlaceholder()` 检查该模板实例是否为纯占位符。
- `getPurePlaceholderVariable()` 如果该模板实例是纯占位符，则返回其变量名。
- `toJSON()` 将模板实例序列化为 JSON。

### 模板引擎

该库支持多种模板引擎：

- 环境变量模板
  - 解析并插值环境变量
  - 支持变量提取
- HuggingFace 模板
  - 基于 Jinja 的模板引擎
  - 支持复杂的模板结构
  - 处理内部变量
- GoLang 模板
  - 支持 Go 风格的模板语法
  - 从模板字符串中提取变量
- Python F-String 模板
  - 解析 Python 风格的 f-string
  - 支持变量插值

### 错误处理

该库使用 `CommonError` 进行错误管理，并带有特定的错误代码：

- 无效的模板格式
- 缺少必需的参数
- 模板解析错误

### 贡献

欢迎贡献！请遵循以下步骤：

1. Fork 本仓库
1. 创建您的功能分支 (git checkout -b feature/fooBar)
1. 提交您的更改 (git commit -am 'Add some fooBar')
1. 推送到分支 (git push origin feature/fooBar)
1. 创建一个新的 Pull Request

## 许可证

MIT 许可证
