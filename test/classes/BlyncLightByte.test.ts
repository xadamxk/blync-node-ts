import { BlyncLightByte } from '../../src/classes/BlyncLightByte'
import {
  BlyncLightStatusEnum,
  BlyncLightLevelEnum,
  BlyncBlinkSpeedEnum,
} from '../../src/enums'

describe('BlyncLightByte', () => {
  test('should calculate the byte value for default parameters', () => {
    const defaultBlyncLightByte = new BlyncLightByte()
    expect(defaultBlyncLightByte.getByteValue()).toBe(1)
  })

  test('should calculate the byte value for custom parameters', () => {
    const customBlyncLightByte = new BlyncLightByte(
      BlyncLightStatusEnum.ON, // 0
      BlyncLightLevelEnum.DIM, // 2
      BlyncBlinkSpeedEnum.FAST // 36
    )
    expect(customBlyncLightByte.getByteValue()).toBe(38)
  })
})
