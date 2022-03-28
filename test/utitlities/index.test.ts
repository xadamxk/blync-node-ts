import { toInt } from '../../src/utilities'

describe('toInt utility', () => {
  test('should parse valid int-string to integer', () => {
    expect(toInt('123')).toBe(123)
  })

  test('should parse valid binary-string to integer', () => {
    expect(toInt('1011', 2)).toBe(11)
  })

  test('should parse invalid int-string to default integer', () => {
    expect(toInt('abc')).toBe(0)
  })
})
