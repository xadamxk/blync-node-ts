import { toInt } from '../src/utilities'

test('valid int string to integer', () => {
  expect(toInt('123')).toBe(123)
})

test('valid binary string to integer', () => {
  expect(toInt('1011', 2)).toBe(11)
})

test('invalid int string to default integer', () => {
  expect(toInt('abc')).toBe(0)
})
