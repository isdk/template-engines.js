[**@isdk/template-engines**](../README.md)

***

[@isdk/template-engines](../globals.md) / StringTemplateFinalString

# Class: StringTemplateFinalString

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template-final-string.ts:68](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template-final-string.ts#L68)

The `StringTemplateFinalString` class represents a rendering result that
still contains template-like literals (e.g. `{{ name }}`) which must NOT be
expanded by any subsequent rendering pass.

It is produced automatically by `StringTemplate.format()` when the output
contains preserved template syntax, and it is a transparent string for all
practical purposes:

- It extends `String`, so `toString()`, `valueOf()`, template literals,
  concatenation and `String(...)` all yield the plain string content.
- `JSON.stringify()` serializes it as a plain string, so it is safe to send
  over the wire or store in a database.
- Non-empty results are always truthy (empty results are never wrapped).

When such a value is used as data in a later `StringTemplate.format()` call,
its content is kept literally: it will never be expanded as a template
again. To opt back into expansion, unwrap it explicitly with `String(value)`.

## Example

```typescript
// First pass: the value contains template syntax and expansion is disabled
const first = await StringTemplate.format({
  template: '{{ code }}',
  data: { code: 'return "{{ x }}"' },
  expandValue: false,
})
// first is a StringTemplateFinalString holding 'return "{{ x }}"'

// Second pass: the protected value is NOT expanded
const second = await StringTemplate.format({
  template: '{{ code }}',
  data: { code: first },
})
String(second) // 'return "{{ x }}"' - preserved literally

// Opt back into expansion explicitly:
await StringTemplate.format({ template: String(first), data: { x: '1' } })
```

## Extends

- `String`

## Indexable

> \[`index`: `number`\]: `string`

## Constructors

### Constructor

> **new StringTemplateFinalString**(`value`): `StringTemplateFinalString`

Defined in: [@isdk/ai-tools/packages/template-engines/src/string-template-final-string.ts:69](https://github.com/isdk/template-engines.js/blob/e21191d7e11ebd1983ca82b94d2321a5f1473e20/src/string-template-final-string.ts#L69)

#### Parameters

##### value

`string` \| `String`

#### Returns

`StringTemplateFinalString`

#### Overrides

`String.constructor`

## Properties

### length

> `readonly` **length**: `number`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es5.d.ts:517

Returns the length of a String object.

#### Inherited from

`String.length`

## Methods

### \[iterator\]()

> **\[iterator\]**(): `StringIterator`\<`string`\>

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.iterable.d.ts:270

Iterator

#### Returns

`StringIterator`\<`string`\>

#### Inherited from

`String.[iterator]`

***

### ~~anchor()~~

> **anchor**(`name`): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.core.d.ts:463

Returns an `<a>` HTML anchor element and sets the name attribute to the text value

#### Parameters

##### name

`string`

#### Returns

`string`

#### Deprecated

A legacy feature for browser compatibility

#### Inherited from

`String.anchor`

***

### at()

> **at**(`index`): `string` \| `undefined`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2022.string.d.ts:24

Returns a new String consisting of the single UTF-16 code unit located at the specified index.

#### Parameters

##### index

`number`

The zero-based index of the desired code unit. A negative index will count back from the last item.

#### Returns

`string` \| `undefined`

#### Inherited from

`String.at`

***

### ~~big()~~

> **big**(): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.core.d.ts:469

Returns a `<big>` HTML element

#### Returns

`string`

#### Deprecated

A legacy feature for browser compatibility

#### Inherited from

`String.big`

***

### ~~blink()~~

> **blink**(): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.core.d.ts:475

Returns a `<blink>` HTML element

#### Returns

`string`

#### Deprecated

A legacy feature for browser compatibility

#### Inherited from

`String.blink`

***

### ~~bold()~~

> **bold**(): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.core.d.ts:481

Returns a `<b>` HTML element

#### Returns

`string`

#### Deprecated

A legacy feature for browser compatibility

#### Inherited from

`String.bold`

***

### charAt()

> **charAt**(`pos`): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es5.d.ts:418

Returns the character at the specified index.

#### Parameters

##### pos

`number`

The zero-based index of the desired character.

#### Returns

`string`

#### Inherited from

`String.charAt`

***

### charCodeAt()

> **charCodeAt**(`index`): `number`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es5.d.ts:424

Returns the Unicode value of the character at the specified location.

#### Parameters

##### index

`number`

The zero-based index of the desired character. If there is no character at the specified index, NaN is returned.

#### Returns

`number`

#### Inherited from

`String.charCodeAt`

***

### codePointAt()

> **codePointAt**(`pos`): `number` \| `undefined`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.core.d.ts:410

Returns a nonnegative integer Number less than 1114112 (0x110000) that is the code point
value of the UTF-16 encoded code point starting at the string element at position pos in
the String resulting from converting this object to a String.
If there is no element at that position, the result is undefined.
If a valid UTF-16 surrogate pair does not begin at pos, the result is the code unit at pos.

#### Parameters

##### pos

`number`

#### Returns

`number` \| `undefined`

#### Inherited from

`String.codePointAt`

***

### concat()

> **concat**(...`strings`): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es5.d.ts:430

Returns a string that contains the concatenation of two or more strings.

#### Parameters

##### strings

...`string`[]

The strings to append to the end of the string.

#### Returns

`string`

#### Inherited from

`String.concat`

***

### endsWith()

> **endsWith**(`searchString`, `endPosition?`): `boolean`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.core.d.ts:426

Returns true if the sequence of elements of searchString converted to a String is the
same as the corresponding elements of this object (converted to a String) starting at
endPosition – length(this). Otherwise returns false.

#### Parameters

##### searchString

`string`

##### endPosition?

`number`

#### Returns

`boolean`

#### Inherited from

`String.endsWith`

***

### ~~fixed()~~

> **fixed**(): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.core.d.ts:487

Returns a `<tt>` HTML element

#### Returns

`string`

#### Deprecated

A legacy feature for browser compatibility

#### Inherited from

`String.fixed`

***

### ~~fontcolor()~~

> **fontcolor**(`color`): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.core.d.ts:493

Returns a `<font>` HTML element and sets the color attribute value

#### Parameters

##### color

`string`

#### Returns

`string`

#### Deprecated

A legacy feature for browser compatibility

#### Inherited from

`String.fontcolor`

***

### ~~fontsize()~~

#### Call Signature

> **fontsize**(`size`): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.core.d.ts:499

Returns a `<font>` HTML element and sets the size attribute value

##### Parameters

###### size

`number`

##### Returns

`string`

##### Deprecated

A legacy feature for browser compatibility

##### Inherited from

`String.fontsize`

#### Call Signature

> **fontsize**(`size`): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.core.d.ts:505

Returns a `<font>` HTML element and sets the size attribute value

##### Parameters

###### size

`string`

##### Returns

`string`

##### Deprecated

A legacy feature for browser compatibility

##### Inherited from

`String.fontsize`

***

### includes()

> **includes**(`searchString`, `position?`): `boolean`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.core.d.ts:419

Returns true if searchString appears as a substring of the result of converting this
object to a String, at one or more positions that are
greater than or equal to position; otherwise, returns false.

#### Parameters

##### searchString

`string`

search string

##### position?

`number`

If position is undefined, 0 is assumed, so as to search all of the String.

#### Returns

`boolean`

#### Inherited from

`String.includes`

***

### indexOf()

> **indexOf**(`searchString`, `position?`): `number`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es5.d.ts:437

Returns the position of the first occurrence of a substring.

#### Parameters

##### searchString

`string`

The substring to search for in the string

##### position?

`number`

The index at which to begin searching the String object. If omitted, search starts at the beginning of the string.

#### Returns

`number`

#### Inherited from

`String.indexOf`

***

### ~~italics()~~

> **italics**(): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.core.d.ts:511

Returns an `<i>` HTML element

#### Returns

`string`

#### Deprecated

A legacy feature for browser compatibility

#### Inherited from

`String.italics`

***

### lastIndexOf()

> **lastIndexOf**(`searchString`, `position?`): `number`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es5.d.ts:444

Returns the last occurrence of a substring in the string.

#### Parameters

##### searchString

`string`

The substring to search for.

##### position?

`number`

The index at which to begin searching. If omitted, the search begins at the end of the string.

#### Returns

`number`

#### Inherited from

`String.lastIndexOf`

***

### ~~link()~~

> **link**(`url`): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.core.d.ts:517

Returns an `<a>` HTML element and sets the href attribute value

#### Parameters

##### url

`string`

#### Returns

`string`

#### Deprecated

A legacy feature for browser compatibility

#### Inherited from

`String.link`

***

### localeCompare()

#### Call Signature

> **localeCompare**(`that`): `number`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es5.d.ts:450

Determines whether two strings are equivalent in the current locale.

##### Parameters

###### that

`string`

String to compare to target string

##### Returns

`number`

##### Inherited from

`String.localeCompare`

#### Call Signature

> **localeCompare**(`that`, `locales?`, `options?`): `number`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es5.d.ts:4553

Determines whether two strings are equivalent in the current or specified locale.

##### Parameters

###### that

`string`

String to compare to target string

###### locales?

`string` \| `string`[]

A locale string or array of locale strings that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used. This parameter must conform to BCP 47 standards; see the Intl.Collator object for details.

###### options?

`CollatorOptions`

An object that contains one or more properties that specify comparison options. see the Intl.Collator object for details.

##### Returns

`number`

##### Inherited from

`String.localeCompare`

#### Call Signature

> **localeCompare**(`that`, `locales?`, `options?`): `number`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2020.string.d.ts:43

Determines whether two strings are equivalent in the current or specified locale.

##### Parameters

###### that

`string`

String to compare to target string

###### locales?

`LocalesArgument`

A locale string or array of locale strings that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used. This parameter must conform to BCP 47 standards; see the Intl.Collator object for details.

###### options?

`CollatorOptions`

An object that contains one or more properties that specify comparison options. see the Intl.Collator object for details.

##### Returns

`number`

##### Inherited from

`String.localeCompare`

***

### match()

#### Call Signature

> **match**(`regexp`): `RegExpMatchArray` \| `null`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es5.d.ts:456

Matches a string with a regular expression, and returns an array containing the results of that search.

##### Parameters

###### regexp

`string` \| `RegExp`

A variable name or string literal containing the regular expression pattern and flags.

##### Returns

`RegExpMatchArray` \| `null`

##### Inherited from

`String.match`

#### Call Signature

> **match**(`matcher`): `RegExpMatchArray` \| `null`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:241

Matches a string or an object that supports being matched against, and returns an array
containing the results of that search, or null if no matches are found.

##### Parameters

###### matcher

An object that supports being matched against.

###### [match]

##### Returns

`RegExpMatchArray` \| `null`

##### Inherited from

`String.match`

***

### matchAll()

> **matchAll**(`regexp`): `RegExpStringIterator`\<`RegExpExecArray`\>

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2020.string.d.ts:29

Matches a string with a regular expression, and returns an iterable of matches
containing the results of that search.

#### Parameters

##### regexp

`RegExp`

A variable name or string literal containing the regular expression pattern and flags.

#### Returns

`RegExpStringIterator`\<`RegExpExecArray`\>

#### Inherited from

`String.matchAll`

***

### normalize()

#### Call Signature

> **normalize**(`form`): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.core.d.ts:434

Returns the String value result of normalizing the string into the normalization form
named by form as specified in Unicode Standard Annex #15, Unicode Normalization Forms.

##### Parameters

###### form

`"NFC"` \| `"NFD"` \| `"NFKC"` \| `"NFKD"`

Applicable values: "NFC", "NFD", "NFKC", or "NFKD", If not specified default
is "NFC"

##### Returns

`string`

##### Inherited from

`String.normalize`

#### Call Signature

> **normalize**(`form?`): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.core.d.ts:442

Returns the String value result of normalizing the string into the normalization form
named by form as specified in Unicode Standard Annex #15, Unicode Normalization Forms.

##### Parameters

###### form?

`string`

Applicable values: "NFC", "NFD", "NFKC", or "NFKD", If not specified default
is "NFC"

##### Returns

`string`

##### Inherited from

`String.normalize`

***

### padEnd()

> **padEnd**(`maxLength`, `fillString?`): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2017.string.d.ts:44

Pads the current string with a given string (possibly repeated) so that the resulting string reaches a given length.
The padding is applied from the end (right) of the current string.

#### Parameters

##### maxLength

`number`

The length of the resulting string once the current string has been padded.
       If this parameter is smaller than the current string's length, the current string will be returned as it is.

##### fillString?

`string`

The string to pad the current string with.
       If this string is too long, it will be truncated and the left-most part will be applied.
       The default value for this parameter is " " (U+0020).

#### Returns

`string`

#### Inherited from

`String.padEnd`

***

### padStart()

> **padStart**(`maxLength`, `fillString?`): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2017.string.d.ts:31

Pads the current string with a given string (possibly repeated) so that the resulting string reaches a given length.
The padding is applied from the start (left) of the current string.

#### Parameters

##### maxLength

`number`

The length of the resulting string once the current string has been padded.
       If this parameter is smaller than the current string's length, the current string will be returned as it is.

##### fillString?

`string`

The string to pad the current string with.
       If this string is too long, it will be truncated and the left-most part will be applied.
       The default value for this parameter is " " (U+0020).

#### Returns

`string`

#### Inherited from

`String.padStart`

***

### repeat()

> **repeat**(`count`): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.core.d.ts:449

Returns a String value that is made from count copies appended together. If count is 0,
the empty string is returned.

#### Parameters

##### count

`number`

number of copies to append

#### Returns

`string`

#### Inherited from

`String.repeat`

***

### replace()

#### Call Signature

> **replace**(`searchValue`, `replaceValue`): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es5.d.ts:463

Replaces text in a string, using a regular expression or search string.

##### Parameters

###### searchValue

`string` \| `RegExp`

A string or regular expression to search for.

###### replaceValue

`string`

A string containing the text to replace. When the `searchValue` is a `RegExp`, all matches are replaced if the `g` flag is set (or only those matches at the beginning, if the `y` flag is also present). Otherwise, only the first match of `searchValue` is replaced.

##### Returns

`string`

##### Inherited from

`String.replace`

#### Call Signature

> **replace**(`searchValue`, `replacer`): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es5.d.ts:470

Replaces text in a string, using a regular expression or search string.

##### Parameters

###### searchValue

`string` \| `RegExp`

A string to search for.

###### replacer

(`substring`, ...`args`) => `string`

A function that returns the replacement text.

##### Returns

`string`

##### Inherited from

`String.replace`

#### Call Signature

> **replace**(`searchValue`, `replaceValue`): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:248

Passes a string and `replaceValue` to the `[Symbol.replace]` method on `searchValue`. This method is expected to implement its own replacement algorithm.

##### Parameters

###### searchValue

An object that supports searching for and replacing matches within a string.

###### [replace]

###### replaceValue

`string`

The replacement text.

##### Returns

`string`

##### Inherited from

`String.replace`

#### Call Signature

> **replace**(`searchValue`, `replacer`): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:255

Replaces text in a string, using an object that supports replacement within a string.

##### Parameters

###### searchValue

A object can search for and replace matches within a string.

###### [replace]

###### replacer

(`substring`, ...`args`) => `string`

A function that returns the replacement text.

##### Returns

`string`

##### Inherited from

`String.replace`

***

### replaceAll()

#### Call Signature

> **replaceAll**(`searchValue`, `replaceValue`): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2021.string.d.ts:25

Replace all instances of a substring in a string, using a regular expression or search string.

##### Parameters

###### searchValue

`string` \| `RegExp`

A string to search for.

###### replaceValue

`string`

A string containing the text to replace for every successful match of searchValue in this string.

##### Returns

`string`

##### Inherited from

`String.replaceAll`

#### Call Signature

> **replaceAll**(`searchValue`, `replacer`): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2021.string.d.ts:32

Replace all instances of a substring in a string, using a regular expression or search string.

##### Parameters

###### searchValue

`string` \| `RegExp`

A string to search for.

###### replacer

(`substring`, ...`args`) => `string`

A function that returns the replacement text.

##### Returns

`string`

##### Inherited from

`String.replaceAll`

***

### search()

#### Call Signature

> **search**(`regexp`): `number`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es5.d.ts:476

Finds the first substring match in a regular expression search.

##### Parameters

###### regexp

`string` \| `RegExp`

The regular expression pattern and applicable flags.

##### Returns

`number`

##### Inherited from

`String.search`

#### Call Signature

> **search**(`searcher`): `number`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:261

Finds the first substring match in a regular expression search.

##### Parameters

###### searcher

An object which supports searching within a string.

###### [search]

##### Returns

`number`

##### Inherited from

`String.search`

***

### slice()

> **slice**(`start?`, `end?`): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es5.d.ts:484

Returns a section of a string.

#### Parameters

##### start?

`number`

The index to the beginning of the specified portion of stringObj.

##### end?

`number`

The index to the end of the specified portion of stringObj. The substring includes the characters up to, but not including, the character indicated by end.
If this value is not specified, the substring continues to the end of stringObj.

#### Returns

`string`

#### Inherited from

`String.slice`

***

### ~~small()~~

> **small**(): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.core.d.ts:523

Returns a `<small>` HTML element

#### Returns

`string`

#### Deprecated

A legacy feature for browser compatibility

#### Inherited from

`String.small`

***

### split()

#### Call Signature

> **split**(`separator`, `limit?`): `string`[]

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es5.d.ts:491

Split a string into substrings using the specified separator and return them as an array.

##### Parameters

###### separator

`string` \| `RegExp`

A string that identifies character or characters to use in separating the string. If omitted, a single-element array containing the entire string is returned.

###### limit?

`number`

A value used to limit the number of elements returned in the array.

##### Returns

`string`[]

##### Inherited from

`String.split`

#### Call Signature

> **split**(`splitter`, `limit?`): `string`[]

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:268

Split a string into substrings using the specified separator and return them as an array.

##### Parameters

###### splitter

An object that can split a string.

###### [split]

###### limit?

`number`

A value used to limit the number of elements returned in the array.

##### Returns

`string`[]

##### Inherited from

`String.split`

***

### startsWith()

> **startsWith**(`searchString`, `position?`): `boolean`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.core.d.ts:456

Returns true if the sequence of elements of searchString converted to a String is the
same as the corresponding elements of this object (converted to a String) starting at
position. Otherwise returns false.

#### Parameters

##### searchString

`string`

##### position?

`number`

#### Returns

`boolean`

#### Inherited from

`String.startsWith`

***

### ~~strike()~~

> **strike**(): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.core.d.ts:529

Returns a `<strike>` HTML element

#### Returns

`string`

#### Deprecated

A legacy feature for browser compatibility

#### Inherited from

`String.strike`

***

### ~~sub()~~

> **sub**(): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.core.d.ts:535

Returns a `<sub>` HTML element

#### Returns

`string`

#### Deprecated

A legacy feature for browser compatibility

#### Inherited from

`String.sub`

***

### ~~substr()~~

> **substr**(`from`, `length?`): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es5.d.ts:526

Gets a substring beginning at the specified location and having the specified length.

#### Parameters

##### from

`number`

The starting position of the desired substring. The index of the first character in the string is zero.

##### length?

`number`

The number of characters to include in the returned substring.

#### Returns

`string`

#### Deprecated

A legacy feature for browser compatibility

#### Inherited from

`String.substr`

***

### substring()

> **substring**(`start`, `end?`): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es5.d.ts:499

Returns the substring at the specified location within a String object.

#### Parameters

##### start

`number`

The zero-based index number indicating the beginning of the substring.

##### end?

`number`

Zero-based index number indicating the end of the substring. The substring includes the characters up to, but not including, the character indicated by end.
If end is omitted, the characters from start through the end of the original string are returned.

#### Returns

`string`

#### Inherited from

`String.substring`

***

### ~~sup()~~

> **sup**(): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.core.d.ts:541

Returns a `<sup>` HTML element

#### Returns

`string`

#### Deprecated

A legacy feature for browser compatibility

#### Inherited from

`String.sup`

***

### toLocaleLowerCase()

#### Call Signature

> **toLocaleLowerCase**(`locales?`): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es5.d.ts:505

Converts all alphabetic characters to lowercase, taking into account the host environment's current locale.

##### Parameters

###### locales?

`string` \| `string`[]

##### Returns

`string`

##### Inherited from

`String.toLocaleLowerCase`

#### Call Signature

> **toLocaleLowerCase**(`locales?`): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2020.string.d.ts:32

Converts all alphabetic characters to lowercase, taking into account the host environment's current locale.

##### Parameters

###### locales?

`LocalesArgument`

##### Returns

`string`

##### Inherited from

`String.toLocaleLowerCase`

***

### toLocaleUpperCase()

#### Call Signature

> **toLocaleUpperCase**(`locales?`): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es5.d.ts:511

Returns a string where all alphabetic characters have been converted to uppercase, taking into account the host environment's current locale.

##### Parameters

###### locales?

`string` \| `string`[]

##### Returns

`string`

##### Inherited from

`String.toLocaleUpperCase`

#### Call Signature

> **toLocaleUpperCase**(`locales?`): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2020.string.d.ts:35

Returns a string where all alphabetic characters have been converted to uppercase, taking into account the host environment's current locale.

##### Parameters

###### locales?

`LocalesArgument`

##### Returns

`string`

##### Inherited from

`String.toLocaleUpperCase`

***

### toLowerCase()

> **toLowerCase**(): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es5.d.ts:502

Converts all the alphabetic characters in a string to lowercase.

#### Returns

`string`

#### Inherited from

`String.toLowerCase`

***

### toString()

> **toString**(): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es5.d.ts:412

Returns a string representation of a string.

#### Returns

`string`

#### Inherited from

`String.toString`

***

### toUpperCase()

> **toUpperCase**(): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es5.d.ts:508

Converts all the alphabetic characters in a string to uppercase.

#### Returns

`string`

#### Inherited from

`String.toUpperCase`

***

### trim()

> **trim**(): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es5.d.ts:514

Removes the leading and trailing white space and line terminator characters from a string.

#### Returns

`string`

#### Inherited from

`String.trim`

***

### trimEnd()

> **trimEnd**(): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2019.string.d.ts:21

Removes the trailing white space and line terminator characters from a string.

#### Returns

`string`

#### Inherited from

`String.trimEnd`

***

### ~~trimLeft()~~

> **trimLeft**(): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2019.string.d.ts:30

Removes the leading white space and line terminator characters from a string.

#### Returns

`string`

#### Deprecated

A legacy feature for browser compatibility. Use `trimStart` instead

#### Inherited from

`String.trimLeft`

***

### ~~trimRight()~~

> **trimRight**(): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2019.string.d.ts:36

Removes the trailing white space and line terminator characters from a string.

#### Returns

`string`

#### Deprecated

A legacy feature for browser compatibility. Use `trimEnd` instead

#### Inherited from

`String.trimRight`

***

### trimStart()

> **trimStart**(): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2019.string.d.ts:24

Removes the leading white space and line terminator characters from a string.

#### Returns

`string`

#### Inherited from

`String.trimStart`

***

### valueOf()

> **valueOf**(): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es5.d.ts:529

Returns the primitive value of the specified object.

#### Returns

`string`

#### Inherited from

`String.valueOf`

***

### fromCharCode()

> `static` **fromCharCode**(...`codes`): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es5.d.ts:538

#### Parameters

##### codes

...`number`[]

#### Returns

`string`

#### Inherited from

`String.fromCharCode`

***

### fromCodePoint()

> `static` **fromCodePoint**(...`codePoints`): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.core.d.ts:549

Return the String value whose elements are, in order, the elements in the List elements.
If length is 0, the empty string is returned.

#### Parameters

##### codePoints

...`number`[]

#### Returns

`string`

#### Inherited from

`String.fromCodePoint`

***

### raw()

> `static` **raw**(`template`, ...`substitutions`): `string`

Defined in: @isdk/ai-tools/node\_modules/.pnpm/typescript@5.7.3/node\_modules/typescript/lib/lib.es2015.core.d.ts:560

String.raw is usually used as a tag function of a Tagged Template String. When called as
such, the first argument will be a well formed template call site object and the rest
parameter will contain the substitution values. It can also be called directly, for example,
to interleave strings and values from your own tag function, and in this case the only thing
it needs from the first argument is the raw property.

#### Parameters

##### template

A well-formed template string call site representation.

###### raw

readonly `string`[] \| `ArrayLike`\<`string`\>

##### substitutions

...`any`[]

A set of substitution values.

#### Returns

`string`

#### Inherited from

`String.raw`
