# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [0.6.6](https://github.com/isdk/template-engines.js/compare/v0.6.5...v0.6.6) (2025-09-25)


### Features

* **jinja:** add startswith and endswith to string type ([baa2e94](https://github.com/isdk/template-engines.js/commit/baa2e94c54f44cd01fa55da51d9e5859f1c99bc8))

## [0.6.5](https://github.com/isdk/template-engines.js/compare/v0.6.4...v0.6.5) (2025-06-28)


### Bug Fixes

* do not console.error ([02364b5](https://github.com/isdk/template-engines.js/commit/02364b53247b8b74e818a040d1be6ebd8252e2d9))
* **hf-template:** handle circular references correctly ([3fa19a5](https://github.com/isdk/template-engines.js/commit/3fa19a5e2f28080ee5224b7dd1b89ad779956584))

## [0.6.4](https://github.com/isdk/template-engines.js/compare/v0.6.3...v0.6.4) (2025-06-21)


### Features

* **jinja:** add keys()/values() method to object ([a9e6f2a](https://github.com/isdk/template-engines.js/commit/a9e6f2ae4de62f15ef46f07dca025ed9c1f01d1a))
* **jinja:** add rejectattr filter to array ([0980ec5](https://github.com/isdk/template-engines.js/commit/0980ec51236148c4fd76db6d69dc25b1172476d4))

## [0.6.3](https://github.com/isdk/template-engines.js/compare/v0.6.2...v0.6.3) (2025-04-24)


### Features

* add matchTemplateSegment static method ([24b1ccb](https://github.com/isdk/template-engines.js/commit/24b1ccbec627480811c0e55e7b0aa8bfa87438e3))

## [0.6.2](https://github.com/isdk/template-engines.js/compare/v0.6.1...v0.6.2) (2025-03-27)


### Bug Fixes

* **docs:** corrects the example ([466ebe2](https://github.com/isdk/template-engines.js/commit/466ebe226b36554b365e0202c4f1d42ff9f95a09))

## [0.6.1](https://github.com/isdk/template-engines.js/compare/v0.6.0...v0.6.1) (2025-03-25)


### Bug Fixes

* rename for name confict ([cb14459](https://github.com/isdk/template-engines.js/commit/cb1445972f4290df93d1730f7569a7c44b07e85e))

## [0.6.0](https://github.com/isdk/template-engines.js/compare/v0.5.8...v0.6.0) (2025-03-25)


### ⚠ BREAKING CHANGES

* use external lib: @isdk/common-error now
* remove few-shot-prompt-template prompt-example-selector export
* extract EnvironmentEx class
* remove prompt-example-selector

### Bug Fixes

* add none nullValue for env ([441e08b](https://github.com/isdk/template-engines.js/commit/441e08b2798ecf8b178a220b3b862ed07ebfd584))
* use external lib: @isdk/common-error now ([019aa1d](https://github.com/isdk/template-engines.js/commit/019aa1d24c69b82eb10181c31b8cda22fcb7712d))


### Refactor

* extract EnvironmentEx class ([e8e3360](https://github.com/isdk/template-engines.js/commit/e8e3360f72c659e10eddf1a03362738982371254))
* remove few-shot-prompt tremplate ([58b17b4](https://github.com/isdk/template-engines.js/commit/58b17b46a49ab5c4741db6e6e66e950c3f2c9221))
* remove few-shot-prompt-template prompt-example-selector export ([ccaa9c3](https://github.com/isdk/template-engines.js/commit/ccaa9c3b8ab011028ba43f4351ece169b0e8f7df))
* remove prompt-example-selector ([bd0d46d](https://github.com/isdk/template-engines.js/commit/bd0d46d81ea1de033b0c9f9ed8d042f385c5ad2b))
* rename class names to StringTemplate ([515a43b](https://github.com/isdk/template-engines.js/commit/515a43b2da1ce3c9e9281b391d122af135c109cc))
