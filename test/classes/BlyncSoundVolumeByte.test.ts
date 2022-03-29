import { BlyncSoundVolumeByte } from '../../src/classes/BlyncSoundVolumeByte'
import { BlyncSoundMuteStatusEnum, BlyncSoundVolumeEnum } from '../../src/enums'

describe('BlyncSoundVolumeByte', () => {
  test('should calculate the byte value for default parameters', () => {
    const defaultBlyncSoundVolumeByte = new BlyncSoundVolumeByte()
    expect(defaultBlyncSoundVolumeByte.getByteValue()).toBe(138)
  })

  test('should calculate the byte value for custom parameters', () => {
    const customBlyncSoundVolumeByte = new BlyncSoundVolumeByte(
      BlyncSoundVolumeEnum.PCT_10, // 1
      BlyncSoundMuteStatusEnum.UNMUTE // 0
    )
    expect(customBlyncSoundVolumeByte.getByteValue()).toBe(1)
  })
})
