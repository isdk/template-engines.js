# 字符串模板引擎 - @isdk/template-engines

该包包含以下模板引擎：jinja2 (hf 使用), golang, python (f-string), env。

## 描述

一个通用的模板引擎库，支持多种模板格式，包括环境变量、HuggingFace 模板、GoLang 模板和 Python f-string。该库为处理不同的模板系统提供了统一的接口。

## 特性

- 支持多种模板格式：
  - 环境变量模板
  - HuggingFace/Jinja 模板
  - GoLang 模板
  - Python f-string 模板
- 动态模板创建与格式化
- 部分数据处理（Partial data processing）
- 模板验证
- 可扩展架构

## 安装

```bash
npm install @isdk/template-engines
```

## 使用方法

基础示例

```ts
import { StringTemplate } from '@isdk/template-engines';

// 创建模板实例，如果没有指定 templateFormat，默认为 Jinja2 模板
const template = StringTemplate.from("Hello, {{name}}!");

// 格式化模板
const result = await template.format({ name: "World" });
console.log(result); // 输出: "Hello, World!"

// 检查模板是否为纯占位符
console.log(StringTemplate.isPurePlaceholder("{{name}}")); // true
console.log(StringTemplate.isPurePlaceholder("  {{name}}  ")); // true
console.log(StringTemplate.isPurePlaceholder("Hello {{name}}")); // false
```

## API 文档

### StringTemplate 类

使用模板的主要入口点。

#### 静态方法

* `from(template: string|StringTemplateOptions, options?: StringTemplateOptions)` 创建新的模板实例。
* `async format(options: StringTemplateOptions)` 使用提供的选项格式化模板。
* `async formatIf(options: StringTemplateOptions)` 如果模板有效，则进行格式化。
* `isTemplate(templateOpt: StringTemplateOptions)` 检查给定选项是否代表有效的模板。
* `isPurePlaceholder(templateOpt: StringTemplateOptions|string)` 检查模板是否为纯占位符（可选地被空白字符包围）。

#### 实例方法

* `filterData(data: Record<string, any>)` 过滤输入数据以仅包含指定的变量。
* `partial(data: Record<string, any>)` 使用部分填充的数据创建新的模板实例。
* `async format(data?: Record<string, any>):` 使用提供的选项格式化模板。
* `isPurePlaceholder()` 检查该模板实例是否为纯占位符。
* `toJSON()` 将模板实例序列化为 JSON。

### 模板引擎

该库支持多种模板引擎：

* 环境变量模板
  * 解析并插值环境变量
  * 支持变量提取
* HuggingFace 模板
  * 基于 Jinja 的模板引擎
  * 支持复杂的模板结构
  * 处理内部变量
* GoLang 模板
  * 支持 Go 风格的模板语法
  * 从模板字符串中提取变量
* Python F-String 模板
  * 解析 Python 风格的 f-string
  * 支持变量插值

### 错误处理

该库使用 `CommonError` 进行错误管理，并带有特定的错误代码：

* 无效的模板格式
* 缺少必需的参数
* 模板解析错误

### 贡献

欢迎贡献！请遵循以下步骤：

1. Fork 本仓库
1. 创建您的功能分支 (git checkout -b feature/fooBar)
1. 提交您的更改 (git commit -am 'Add some fooBar')
1. 推送到分支 (git push origin feature/fooBar)
1. 创建一个新的 Pull Request

## 许可证

MIT 许可证
