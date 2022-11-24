import { KeyboardEvent } from 'react'
import isJSONString from '../isJSON'
import onKeyOnlyNumbers from '../keycode'
import parseIntOr from '../numbers'
import recursivelyGetChildrenString from '../recursivelyGetChildrenString'

describe('isJSONString', () => {
  test.each`
    test                      | value            | expected
    ${'is correct JSON'}      | ${'{ "a": 10 }'} | ${true}
    ${'is Boolean'}           | ${true}          | ${true}
    ${'is Number'}            | ${10}            | ${true}
    ${'is null'}              | ${null}          | ${true}
    ${'JSON is unterminated'} | ${'{ "a": 10'}   | ${false}
    ${'no argument passed'}   | ${undefined}     | ${false}
    ${'is Array'}             | ${[1, 2, 3]}     | ${false}
    ${'is String'}            | ${'hello'}       | ${false}
  `(
    'returns $expected when $test',
    ({ value, expected }: { value: string; expected: boolean }) => {
      expect(isJSONString(value)).toBe(expected)
    },
  )
})

describe('recursivelyGetChildrenString', () => {
  const complexChildrenWithStringNestedChildren = {
    props: { children: 'hello' },
  }
  const complexChildrenWithArrayNestedChildren = {
    props: { children: ['hello'] },
  }
  const complexChildrenWithoutStringNestedChildren = {
    props: { children: null },
  }

  test.each`
    test                                                      | value                                         | expected
    ${'is bare string'}                                       | ${'hello'}                                    | ${'hello'}
    ${'is array'}                                             | ${['hello', 'world']}                         | ${''}
    ${'is Boolean'}                                           | ${true}                                       | ${''}
    ${'is complex children with a nested string children'}    | ${complexChildrenWithStringNestedChildren}    | ${'hello'}
    ${'is complex children with a nested array children'}     | ${complexChildrenWithArrayNestedChildren}     | ${''}
    ${'is complex children without a nested string children'} | ${complexChildrenWithoutStringNestedChildren} | ${''}
  `(
    'returns "$expected" when $test',
    ({ value, expected }: { value: string; expected: boolean }) => {
      expect(recursivelyGetChildrenString(value)).toBe(expected)
    },
  )
})

describe('onKeyOnlyNumbers', () => {
  test('should only prevent numbers keyCodes', () => {
    ;[...Array(100).keys()].forEach(keyCode => {
      const preventDefault = jest.fn()

      onKeyOnlyNumbers({
        key: String.fromCharCode(keyCode),
        preventDefault,
      } as unknown as KeyboardEvent<Element>)

      expect(preventDefault).toHaveBeenCalledTimes(
        keyCode < 48 || keyCode > 57 ? 1 : 0,
      )
    })
  })
})

describe('parseIntOr', () => {
  const fallback = 987_654_321

  test.each`
    test                                | value                  | expected
    ${'is correct number'}              | ${10}                  | ${10}
    ${'is BigInt'}                      | ${900719925474099267n} | ${900719925474099300}
    ${'is string containing Number'}    | ${'10'}                | ${10}
    ${'is string starting w/ Number'}   | ${'10a'}               | ${10}
    ${'is Float'}                       | ${15.6}                | ${15}
    ${'is complex string'}              | ${'a1003ù^'}           | ${fallback}
    ${'is Boolean'}                     | ${true}                | ${fallback}
    ${'is null'}                        | ${null}                | ${fallback}
    ${'no argument passed'}             | ${undefined}           | ${fallback}
    ${'is Array of string'}             | ${['a', 'b', 'c']}     | ${fallback}
    ${'is Array w/ first index Number'} | ${[1, 'b', 'c']}       | ${1}
    ${'is String'}                      | ${'hello'}             | ${fallback}
  `(
    'returns $expected when $test',
    ({ value, expected }: { value: string; expected: boolean }) => {
      expect(parseIntOr(value, fallback)).toBe(expected)
    },
  )
})
