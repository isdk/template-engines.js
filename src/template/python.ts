// the python f-string template
/**
 * Type that represents a node in a parsed format string. It can be either
 * a literal text or a variable name.
 */
export type FStringTemplateNode =
  | { type: "literal"; text: string, index: number, len: number }
  | { type: "variable"; name: string, index: number, len: number };

/**
 * Type that represents a function that takes a template string and
 * returns an array of `ParsedFStringNode`.
 *
 * extract from langchain.js/langchain-core/src/prompts/template.ts
 */
export function parseFString(template: string): FStringTemplateNode[] {
  // Core logic replicated from internals of pythons built in Formatter class.
  // https://github.com/python/cpython/blob/135ec7cefbaffd516b77362ad2b2ad1025af462e/Objects/stringlib/unicode_format.h#L700-L706
  const nodes: FStringTemplateNode[] = [];

  const nextBracket = (bracket: "}" | "{" | "{}", start: number) => {
    if (bracket.length > 1) {
      for (let i = start; i < template.length; i++) {
        if (bracket.includes(template[i])) {
          return i;
        }
      }
      return -1;
    } else {
      return template.indexOf(bracket, start);
    }
  };

  let i = 0;
  while (i < template.length) {
    if (template[i] === "{" && template[i + 1] === "{") {
      nodes.push({ type: "literal", text: "{", index: i, len: 2 });
      i += 2;
    } else if (template[i] === "}" && template[i + 1] === "}") {
      nodes.push({ type: "literal", text: "}", index: i, len: 2 });
      i += 2;
    } else if (template[i] === "{") {
      const j = nextBracket("}", i);
      if (j < 0) {
        throw new Error("Unclosed '{' in template.");
      }
      nodes.push({ type: "variable", name: template.slice(i + 1, j).trim(), index: i, len: j - i + 1 });
      i = j + 1;
    } else if (template[i] === "}") {
      throw new Error("Single '}' in template.");
    } else {
      const next = nextBracket("{}", i);
      const text = next < 0 ? template.slice(i) : template.slice(i, next);
      nodes.push({ type: "literal", text, index: i, len: text.length });
      i = next < 0 ? template.length : next;
    }
  }

  return nodes;
};

/**
 * Type that represents a function that takes a template string and a set
 * of input values, and returns a string where all variables in the
 * template have been replaced with their corresponding values.
 */
export function interpolateFString(nodes: FStringTemplateNode[], values: Record<string, any>) {
  return nodes.reduce((res, node) => {
    let result: string
    if (node.type === "variable") {
      if (node.name in values) {
        result = res + values[node.name];
      } else {
        // console.error(`Missing value for input ${node.name}`);
        result = res;
      }
    } else {
      result = res + node.text;
    }
    return result;
  }, "");
}
