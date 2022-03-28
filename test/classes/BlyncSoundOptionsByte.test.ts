import { BlyncSoundOptionsByte } from '../../src/classes/BlyncSoundOptionsByte'
import {
  BlyncSoundRepeatEnum,
  BlyncSoundStatusEnum,
  BlyncSoundsEnum,
} from '../../src/enums'

describe('BlyncSoundOptionsByte', () => {
  test('should calculate the byte value for default parameters', () => {
    const defaultBlyncSoundOptionsByte = new BlyncSoundOptionsByte()
    expect(defaultBlyncSoundOptionsByte.getByteValue()).toBe(11)
  })

  test('should calculate the byte value for custom parameters', () => {
    const customBlyncLightByte = new BlyncSoundOptionsByte(
      BlyncSoundsEnum.STANDARD, // 1
      BlyncSoundStatusEnum.PLAYING, // 16
      BlyncSoundRepeatEnum.ON // 32
    )
    expect(customBlyncLightByte.getByteValue()).toBe(49)
  })
})
