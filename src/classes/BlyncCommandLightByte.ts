import {
  BlyncLightLevelEnum,
  BlyncLightStatusEnum,
  BlyncBlinkSpeedEnum,
} from '../enums'

export class BlyncCommandLightByte {
  private lightStatusBit: BlyncLightStatusEnum
  private lightLevelBit: BlyncLightLevelEnum
  private blinkSpeedBits: BlyncBlinkSpeedEnum

  constructor(
    lightStatusBit = BlyncLightStatusEnum.OFF,
    lightLevelBit = BlyncLightLevelEnum.FULL,
    blinkSpeedBits = BlyncBlinkSpeedEnum.OFF
  ) {
    this.lightStatusBit = lightStatusBit
    this.lightLevelBit = lightLevelBit
    this.blinkSpeedBits = blinkSpeedBits
  }

  getByteValue(): number {
    return this.lightStatusBit + this.lightLevelBit + this.blinkSpeedBits
  }
}
