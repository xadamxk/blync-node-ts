import {
  BlyncBlinkSpeedEnum,
  BlyncLightLevelEnum,
  BlyncLightStatusEnum,
  BlyncSoundMuteStatusEnum,
  BlyncSoundRepeatEnum,
  BlyncSoundsEnum,
  BlyncSoundStatusEnum,
  BlyncSoundVolumeEnum,
} from '../../src/enums'

const byteLimit = 255 // unsigned
const enums = [
  BlyncBlinkSpeedEnum,
  BlyncLightLevelEnum,
  BlyncLightStatusEnum,
  BlyncSoundMuteStatusEnum,
  BlyncSoundRepeatEnum,
  BlyncSoundsEnum,
  BlyncSoundStatusEnum,
  BlyncSoundVolumeEnum,
]

/**
 * TypeScript enums are mapped by index and key.
 * Since we only want to check key values and not indices,
 *  we filter for enum values that are not a number (keys)
 */
const getEnumNumericValues = (
  enumObj:
    | typeof BlyncBlinkSpeedEnum
    | typeof BlyncLightLevelEnum
    | typeof BlyncLightStatusEnum
    | typeof BlyncSoundMuteStatusEnum
    | typeof BlyncSoundRepeatEnum
    | typeof BlyncSoundsEnum
    | typeof BlyncSoundStatusEnum
    | typeof BlyncSoundVolumeEnum
): number[] => {
  return Object.values(enumObj).filter((v) => {
    return isNaN(Number(v))
  })
}

test('All binary enum values are under the byte limit (255)', () => {
  enums.forEach((enumObj) => {
    const enumValues = getEnumNumericValues(enumObj)
    enumValues.forEach((value: number) => {
      expect(enumObj[value]).toBeLessThanOrEqual(255)
    })
  })
})

test('All binary enum values are positive', () => {
  enums.forEach((enumObj) => {
    const enumValues = getEnumNumericValues(enumObj)

    enumValues.forEach((value: number) => {
      expect(enumObj[value]).toBeGreaterThanOrEqual(0)
    })
  })
})
