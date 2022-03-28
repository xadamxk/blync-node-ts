import { BlyncSoundOptionsByte } from '../../src/classes'
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
      BlyncSoundStatusEnum.PLAYING // 65536
      BlyncSoundRepeatEnum.ON, // 1048576
    )
    expect(customBlyncLightByte.getByteValue()).toBe(1114113)
  })
})
