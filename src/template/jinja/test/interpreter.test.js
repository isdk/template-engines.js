import { describe, it, expect } from "vitest";

import { Environment, Interpreter } from "../src/runtime";
import { tokenize } from "../src/lexer";
import { parse } from "../src/parser";

describe("Test interpreter options", () => {
	// https://jinja.palletsprojects.com/en/3.0.x/templates/#whitespace-control
	it("should handle whitespace control", () => {
		const EXAMPLE_IF_TEMPLATE = `<div>\n    {% if True %}\n        yay\n    {% endif %}\n</div>`;
		const EXAMPLE_FOR_TEMPLATE = `{% for item in seq %}\n    {{ item }}\n{% endfor %}`;
		const EXAMPLE_FOR_TEMPLATE_2 = `{% for item in seq -%}\n    {{ item }}\n{% endfor %}`;
		const EXAMPLE_FOR_TEMPLATE_3 = `{% for item in seq %}\n    {{ item }}\n{%- endfor %}`;
		const EXAMPLE_FOR_TEMPLATE_4 = `{% for item in seq -%}\n    {{ item }}\n{%- endfor %}`;
		const EXAMPLE_COMMENT_TEMPLATE = `    {# comment #}\n  {# {% if true %} {% endif %} #}\n`;

		const seq = [1, 2, 3, 4, 5, 6, 7, 8, 9];

		const TESTS = [
			// If tests
			{
				template: EXAMPLE_IF_TEMPLATE,
				data: {},
				options: {},
				target: `<div>\n    \n        yay\n    \n</div>`,
			},
			{
				template: EXAMPLE_IF_TEMPLATE,
				data: {},
				options: {
					lstrip_blocks: true,
				},
				target: `<div>\n\n        yay\n\n</div>`,
			},
			{
				template: EXAMPLE_IF_TEMPLATE,
				data: {},
				options: {
					trim_blocks: true,
				},
				target: `<div>\n            yay\n    </div>`,
			},
			{
				template: EXAMPLE_IF_TEMPLATE,
				data: {},
				options: {
					lstrip_blocks: true,
					trim_blocks: true,
				},
				target: `<div>\n        yay\n</div>`,
			},

			// For tests
			{
				template: EXAMPLE_FOR_TEMPLATE,
				data: { seq },
				options: {},
				target: `\n    1\n\n    2\n\n    3\n\n    4\n\n    5\n\n    6\n\n    7\n\n    8\n\n    9\n`,
			},
			{
				template: EXAMPLE_FOR_TEMPLATE,
				data: { seq },
				options: { lstrip_blocks: true },
				target: `\n    1\n\n    2\n\n    3\n\n    4\n\n    5\n\n    6\n\n    7\n\n    8\n\n    9\n`,
			},
			{
				template: EXAMPLE_FOR_TEMPLATE,
				data: { seq },
				options: { trim_blocks: true },
				target: `    1\n    2\n    3\n    4\n    5\n    6\n    7\n    8\n    9\n`,
			},
			{
				template: EXAMPLE_FOR_TEMPLATE,
				data: { seq },
				options: { lstrip_blocks: true, trim_blocks: true },
				target: `    1\n    2\n    3\n    4\n    5\n    6\n    7\n    8\n    9\n`,
			},
			{
				template: EXAMPLE_FOR_TEMPLATE_2,
				data: { seq },
				options: {},
				target: `1\n2\n3\n4\n5\n6\n7\n8\n9\n`,
			},
			{
				template: EXAMPLE_FOR_TEMPLATE_3,
				data: { seq },
				options: {},
				target: `\n    1\n    2\n    3\n    4\n    5\n    6\n    7\n    8\n    9`,
			},
			{
				template: EXAMPLE_FOR_TEMPLATE_3,
				data: { seq },
				options: { trim_blocks: true },
				target: `    1    2    3    4    5    6    7    8    9`,
			},
			{
				template: EXAMPLE_FOR_TEMPLATE_4,
				data: { seq },
				options: {},
				target: `123456789`,
			},

			// Comment tests
			{
				template: EXAMPLE_COMMENT_TEMPLATE,
				data: {},
				options: {},
				target: `    \n  `,
			},
			{
				template: EXAMPLE_COMMENT_TEMPLATE,
				data: {},
				options: { lstrip_blocks: true },
				target: `\n`,
			},
			{
				template: EXAMPLE_COMMENT_TEMPLATE,
				data: {},
				options: { trim_blocks: true },
				target: `      `,
			},
			{
				template: EXAMPLE_COMMENT_TEMPLATE,
				data: {},
				options: { lstrip_blocks: true, trim_blocks: true },
				target: ``,
			},
		];

		for (const test of TESTS) {
			const env = new Environment();
			env.set("True", true);
			for (const [key, value] of Object.entries(test.data)) {
				env.set(key, value);
			}

			const tokens = tokenize(test.template, test.options);
			const parsed = parse(tokens);

			const interpreter = new Interpreter(env);
			const result = interpreter.run(parsed);
			expect(result.value).toEqual(test.target);
		}
	});

	it("should support string + object", async () => {
		const test = {
			template: `{{ '' + obj }}`,
			data: {obj: {a: 1, b: 2}},
			options: { lstrip_blocks: true, trim_blocks: true },
			target: `{"a":1,"b":2}`,
		}
		testTemplate(test)
	});

	it("should support object + string", async () => {
		const test = {
			template: `{{ obj + '' }}`,
			data: {obj: {a: 1, b: 2}},
			options: { lstrip_blocks: true, trim_blocks: true },
			target: `{"a":1,"b":2}`,
		}
		testTemplate(test)
	});

	it("should support obj | string filter", async () => {
		const test = {
			template: `{{ obj | string }}`,
			data: {obj: {a: 1, b: 2}},
			options: { lstrip_blocks: true, trim_blocks: true },
			target: `{"a":1,"b":2}`,
		}
		testTemplate(test)
	});

	it("should support object::toString on an object", async () => {
		const test = {
			template: `{{ obj }}`,
			data: {obj: new TestObj({a: 1, b: 2})},
			options: { lstrip_blocks: true, trim_blocks: true },
			target: `[["a",1],["b",2]]`,
		}
		testTemplate(test)
	});

	it("should support trimStart filter", () => {
		const test = {
			template: '{{ "   test it  " | trimStart }}',
			options: { lstrip_blocks: true, trim_blocks: true },
			target: `test it  `,
		}
		testTemplate(test)
	});

	it("should support trimEnd filter", () => {
		const test ={
			template: '{{ "   test it  " | trimEnd }}',
			options: { lstrip_blocks: true, trim_blocks: true },
			target: `   test it`,
		}
		testTemplate(test)
	});

	it("should support string.rstrip()", () => {
		const test = {
			template: '{{ "   test it  ".rstrip() }}',
			options: { lstrip_blocks: true, trim_blocks: true },
			target: `   test it`,
		}
		testTemplate(test)
	});

	it("should support string.lstrip()", () => {
		const test = {
			template: '{{ "   test it  ".lstrip() }}',
			options: { lstrip_blocks: true, trim_blocks: true },
			target: `test it  `,
		}
		testTemplate(test)
	});

	it("should support string.split(sep)", () => {
		const test = {
			template: '{{ (s.split(","))[-1] }}',
			data: {s: "test,it,ok"},
			options: { lstrip_blocks: true, trim_blocks: true },
			target: `ok`,
		}
		testTemplate(test)
	});

	it("should support user-defined filter", async () => {
		const options = { lstrip_blocks: true, trim_blocks: true }
		const env = new Environment();
		env.set('MSelect', function(operand, key) {
			return operand[key]
		});
		env.set('content', {hi: 'world', x: 2, a: [1,29]});
		const tokens = tokenize(`{{ content | MSelect('hi') }}`, options);
		const parsed = parse(tokens);

		const interpreter = new Interpreter(env);
		const result = interpreter.run(parsed);
		expect(result.value).toEqual('world');
  });

	it("should support KeywordArguments on func", async () => {
		const options = { lstrip_blocks: true, trim_blocks: true }
		const env = new Environment();
		let args
		env.set('MSelect', function(..._args) {
			args = _args
			return 'hi ' + args[0]
		});
		env.set('content', {hi: 'world', x: 2, a: [1,29]});
		const tokens = tokenize(`{{ MSelect('world', k1=12, k2="ok") }}`, options);
		const parsed = parse(tokens);

		const interpreter = new Interpreter(env);
		const result = interpreter.run(parsed);
		expect(result.value).toEqual('hi world');
		expect(args).toEqual(['world', {k1: 12, k2: 'ok'}]);
		expect(args[1].jinja_kargs).toBe(true)
  });

	it("should support fn()[-1]", async () => {
		const test = {
			template: `{{ fn()[-1] }}`,
			data: {fn() {return [2,34]}},
			options: { lstrip_blocks: true, trim_blocks: true },
			target: `34`,
		}
		testTemplate(test)
	});

	it("should support string.startswith()", () => {
		const test = {
			template: '{{ "hello world".startswith("hello") }}',
			options: { lstrip_blocks: true, trim_blocks: true },
			target: `true`,
		}
		testTemplate(test)
	});

	it("should support string.startswith() with false result", () => {
		const test = {
			template: '{{ "hello world".startswith("world") }}',
			options: { lstrip_blocks: true, trim_blocks: true },
			target: `false`,
		}
		testTemplate(test)
	});

	it("should support string.endswith()", () => {
		const test = {
			template: '{{ "hello world".endswith("world") }}',
			options: { lstrip_blocks: true, trim_blocks: true },
			target: `true`,
		}
		testTemplate(test)
	});

	it("should support string.endswith() with false result", () => {
		const test = {
			template: '{{ "hello world".endswith("hello") }}',
			options: { lstrip_blocks: true, trim_blocks: true },
			target: `false`,
		}
		testTemplate(test)
	});
});

class TestObj {
	constructor(opt) {
		if (opt) Object.assign(this, opt);
	}
	toString() {
		return JSON.stringify(Object.entries(this))
	}
}

function testTemplate(test) {
	const env = new Environment();
	env.set("True", true);
	if (test.data) for (const [key, value] of Object.entries(test.data)) {
		env.set(key, value);
	}

	const tokens = tokenize(test.template, test.options);
	const parsed = parse(tokens);

	const interpreter = new Interpreter(env);
	const result = interpreter.run(parsed);
	expect(result.value).toEqual(test.target);
}
