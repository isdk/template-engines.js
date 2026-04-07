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
- **递归渲染**：如果变量的值包含模板语法，将自动展开，支持深层嵌套的数据解析。
- **展开控制**：使用 `expandValue: false` 或 `StringTemplateFinalValue` 防止二次渲染，确保业务数据的完整性。

## 安装

```bash
npm install @isdk/template-engines
```

## 使用方法

### 1. 基础格式化

使用默认引擎 (Jinja2) 进行简单的变量替换。

```ts
import { StringTemplate } from '@isdk/template-engines'

const template = StringTemplate.from('你好, {{name}}!')
const result = await template.format({ name: '世界' })
console.log(result) // "你好, 世界!"
```

---

## 高级特性

### 2. 占位符分析

识别字符串是否为“纯占位符”并提取变量名。这对于根据模板字符串构建动态逻辑非常有用。

```ts
// 检查纯占位符 (忽略周围的空白字符)
StringTemplate.isPurePlaceholder('{{name}}') // true
StringTemplate.isPurePlaceholder('你好 {{name}}') // false

// 提取变量名
StringTemplate.getPurePlaceholderVariable('{{user.profile.id}}') // "user.profile.id"
```

### 3. 数据类型保持 (Raw Mode)

直接从数据源获取原始数据类型（对象、数组、布尔值），而不是将它们转换为字符串。

```ts
const data = { active: true, config: { port: 8080 } }

// 返回布尔值 true
const active = await StringTemplate.format({
  template: '{{active}}',
  data,
  raw: true
})

// 返回原始对象
const config = await StringTemplate.format({
  template: '{{config}}',
  data,
  raw: true
})
```

### 4. 部分填充与复用 (Partial Filling)

通过预配置的数据上下文创建新的模板实例。

```ts
const base = StringTemplate.from('{{role}}: {{text}}')

// 预填充 'role'
const userMsg = base.partial({ role: 'user' })
const adminMsg = base.partial({ role: 'admin' })

console.log(await userMsg.format({ text: '你好' }))   // "user: 你好"
console.log(await adminMsg.format({ text: '重置' })) // "admin: 重置"
```

### 5. 动态变量 (延迟绑定)

使用函数在格式化时注入动态数据。

```ts
const template = StringTemplate.from('时间: {{now}}, 事件: {{event}}')
const logger = template.partial({
  now: () => new Date().toISOString()
})

// 每次调用 format() 时都会执行 'now' 函数
await logger.format({ event: '系统启动' }) // "时间: 2024-03-20..., 事件: 系统启动"
```

### 6. 递归渲染

自动解析嵌套在变量值中的模板。这支持深层的数据解析。

```ts
const data = {
  name: 'Alice',
  greeting: '你好, {{name}}!', // 此值本身也是一个模板
}

// "{{greeting}}" 先展开为 "你好, {{name}}!", 然后进一步展开为 "你好, Alice!"
const result = await StringTemplate.format({
  template: '系统消息: {{greeting}}',
  data
})
console.log(result) // "系统消息: 你好, Alice!"
```

### 7. 精确的渲染控制 (安全)

控制递归行为以保护业务数据或优化性能。

```ts
import { StringTemplateFinalValue } from '@isdk/template-engines'

const data = {
  name: '世界',
  // 使用 expandValue: false 禁用整个操作的递归
  msg: '模板源码: {{name}}',
  // 使用 StringTemplateFinalValue 保护特定数据
  code: new StringTemplateFinalValue('带有 {{syntax}} 的代码'),
}

// 1. 全局控制
await StringTemplate.format({ template: '{{msg}}', data, expandValue: false })
// 输出: "模板源码: {{name}}"

// 2. 数据级保护
await StringTemplate.format({ template: '{{code}}', data })
// 输出: "带有 {{syntax}} 的代码" (原样保留)

// 3. JSON 序列化透明性 (新增)
// StringTemplateFinalValue 在 JSON.stringify 时会自动解包，确保数据交换的无缝性
console.log(JSON.stringify(data.code))
// 输出: "带有 {{syntax}} 的代码"
```

### 8. 扩展引擎 (自定义格式)

使用工厂模式注册您自己的模板实现。

```ts
import { StringTemplate, StringTemplateOptions } from '@isdk/template-engines'

class MySimpleTemplate extends StringTemplate {
  _initialize(options?: StringTemplateOptions) {
    // 自定义初始化逻辑
  }

  _format(data: Record<string, any>): string {
    // 简单的替换: {var} -> data[var]
    return this.template.replace(/{(\w+)}/g, (_, key) => data[key] || '')
  }
}

// 注册为 'myformat'
StringTemplate.register(MySimpleTemplate, { name: 'myformat' })

const result = await StringTemplate.format({
  template: '你好 {name}',
  templateFormat: 'myformat',
  data: { name: '开发者' }
})
console.log(result) // "你好 开发者"
```

---

## API 文档

### StringTemplate 类

使用模板的主要入口点。

#### StringTemplateOptions

- `template?: string` 模板字符串。
- `data?: Record<string, any>` 用于插值的数据。
- `templateFormat?: string` 模板格式 (例如 'hf', 'env', 'golang', 'f-string')。
- `raw?: boolean` 如果为 true，对于纯占位符返回原始值而不是字符串。
- `expandValue?: boolean` 如果为 true (默认)，自动展开变量中类似模板的字符串。
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
