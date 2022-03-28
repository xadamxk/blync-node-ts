import { BlyncBlinkSpeedEnum } from '../../src/enums/BlyncBlinkSpeedEnum'

// TODO: Make generic way to test these across all enums
test('values under byte limit (255)', () => {
  const enumValues = Object.values(BlyncBlinkSpeedEnum).filter(
    (v) => !isNaN(Number(v))
  )
  enumValues.forEach((value) => {
    expect(value).toBeLessThanOrEqual(255)
  })
})

test('values are positive', () => {
  const enumValues = Object.values(BlyncBlinkSpeedEnum).filter(
    (v) => !isNaN(Number(v))
  )
  enumValues.forEach((value) => {
    expect(value).toBeGreaterThanOrEqual(0)
  })
})
