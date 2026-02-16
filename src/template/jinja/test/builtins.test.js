import { Template } from '../src'

import { select, tojson } from '../src/builtins'

describe('Jinjia builtins functions', () => {
  describe('select function', () => {
    test('selects a random element from an array', () => {
      const fruits = ['apple', 'banana', 'cherry']
      const result = select(fruits)
      expect(fruits).toContain(result)
    })

    test('selects a specific indexed element from an array', () => {
      const fruits = ['apple', 'banana', 'cherry']
      expect(select(fruits, 1)).toBe('banana')
    })

    test('selects the last element from an array using negative index', () => {
      const fruits = ['apple', 'banana', 'cherry']
      expect(select(fruits, -1)).toBe('cherry')
    })

    test('selects a random property from an object', () => {
      const fruitBasket = {
        fruit1: 'apple',
        fruit2: 'banana',
        fruit3: 'cherry',
      }
      const values = Object.values(fruitBasket)
      const result = select(fruitBasket)
      expect(values).toContain(result)
    })

    test('selects a specific property from an object', () => {
      const fruitBasket = {
        fruit1: 'apple',
        fruit2: 'banana',
        fruit3: 'cherry',
      }
      expect(select(fruitBasket, 'fruit2')).toEqual('banana')
    })

    test('selects a random character from a string', () => {
      const str = 'hello'
      const result = select(str)
      expect(str).toContain(result)
    })

    test('selects a specific indexed character from a string', () => {
      const str = 'hello'
      expect(select(str, 1)).toBe('e')
    })

    test('selects the last character from a string using negative index', () => {
      const str = 'hello'
      expect(select(str, -1)).toBe('o')
    })

    // It's good practice to also test edge cases, such as when the input is not an array/object/string
    test('returns undefined for unsupported types', () => {
      expect(select(123)).toBeUndefined()
      expect(select(true)).toBeUndefined()
      expect(select(null)).toBeUndefined()
      expect(select(undefined)).toBeUndefined()
    })
  })
  describe('tojson filter', () => {
    it('should support tojson filter with object arg', async () => {
      const template = new Template(`{{ content | tojson(indent=4) }}`)
      const result = template.render({
        content: { hi: 'world', x: 2, a: [1, 29] },
      })
      expect(result).toMatchInlineSnapshot(`
        "{
            "hi": "world",
            "x": 2,
            "a": [
                1,
                29
            ]
        }"
      `)
    })
    it('should support tojson filter with pos arg', async () => {
      const template = new Template(`{{ content | tojson(4) }}`)
      const result = template.render({
        content: { hi: 'world', x: 2, a: [1, 29] },
      })
      expect(result).toMatchInlineSnapshot(`
        "{
            "hi": "world",
            "x": 2,
            "a": [
                1,
                29
            ]
        }"
      `)
    })

    it('should support object | tojson filter', async () => {
      const template = new Template(`{{ content | tojson }}`)
      const result = template.render({
        content: { hi: 'world', x: 2, a: [1, 29] },
      })
      expect(result).toMatchInlineSnapshot(
        `"{"hi": "world", "x": 2, "a": [1, 29]}"`
      )
    })

    it('should support array | tojson filter', async () => {
      const template = new Template(`{{ content | tojson }}`)
      const result = template.render({
        content: [3, 2, 1, { hi: 'world', x: 2, a: [1, 29] }],
      })
      expect(result).toMatchInlineSnapshot(
        `"[3, 2, 1, {"hi": "world", "x": 2, "a": [1, 29]}]"`
      )
    })
  })

  describe('object builtins', () => {
    it('should support object.keys()', async () => {
      const template = new Template(`{{ content.keys()}}`)
      const result = template.render({
        content: { hi: 'world', x: 2, a: [1, 29] },
      })
      expect(result).toMatchInlineSnapshot(`"hi,x,a"`)
    })

    it('should support object.values()', async () => {
      const template = new Template(`{{ content.values()}}`)
      const result = template.render({ content: { hi: 'world', x: 2, a: 6 } })
      expect(result).toMatchInlineSnapshot(`"world,2,6"`)
    })
  })

  it('should randomInt', async () => {
    const template = new Template(`{{ randomInt(3) }}`)
    const result = template.render({})
    // expect result to be between 0 and 3
    expect(parseInt(result)).toBeGreaterThanOrEqual(0)
    expect(parseInt(result)).toBeLessThanOrEqual(3)
  })

  it('should customize filter', async () => {
    const participants = ['陌生人', '李思']
    const event = {
      participants,
      entities: participants,
    }
    const template = new Template(`{{ event | toText }}`)
    const result = template.render({
      event,
      toText: (value) => JSON.stringify(value),
    })
    expect(JSON.parse(result)).toEqual(event)
  })
})
