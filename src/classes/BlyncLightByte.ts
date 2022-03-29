import {
  BlyncLightLevelEnum,
  BlyncLightStatusEnum,
  BlyncBlinkSpeedEnum,
} from '../enums'

/**
 * LightOptions byte => Bit5-Bit0
  Bit0 Light Status:
  - 0 : Light On
  - 1 : Light Off
  Bit1 Light Level:
  - 0 : Full (Brightness)
  - 1 : Dim (50% Brightness)
  Bit2 Blink Status:
  - 0 : No Flash
  - 1 : Start Flash (Blink)
  Bit5-Bit3 Blink speed:
  - 001 : Slow
  - 010 : Medium
  - 100 : Fast
*/
export class BlyncLightByte {
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
