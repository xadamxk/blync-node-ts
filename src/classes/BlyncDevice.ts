import hid from 'node-hid'
import {
  BlyncBlinkSpeedEnum,
  BlyncLightLevelEnum,
  BlyncLightStatusEnum,
} from '../enums'
import { toInt } from '../utilities'
import { BlyncCommandLightByte } from './BlyncCommandLightByte'

export class BlyncDevice {
  hidDevice: hid.HID

  constructor(hidDevice: hid.HID) {
    this.hidDevice = hidDevice
  }

  public turnOff(): void {
    // TODO: Turn off sound as well
    this.sendCommand(0, 0, 0, new BlyncCommandLightByte())
  }

  public sendCommand(
    red = 255,
    green = 255,
    blue = 255,
    blyncLightByte: BlyncCommandLightByte
  ): void {
    // Convert colors to integers safely
    const redValue = toInt(red)
    const greenValue = toInt(green)
    const blueValue = toInt(blue)

    /**
     * Light Byte breakdown
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

    // TODO: Music controls
    // SoundOptionsByte
    //musicControl1 byte => Bit7-Bit0
    //Bit3-Bit0: Choose music, corresponding from the music 1 to music 10 respectively,total 10 music
    //Bit4: 0 - Stop Playing Music, 1 - Start Music Play
    //Bit5: 0 - Stop Music Repeat, 1 - Start Music Repeat
    //Bit6-Bit7: 00

    // SoundVolumeByte
    //musicControl2 byte => Bit7-Bit0
    //Bit3-Bit0: 1-10 corresponding from 10% volume to 100% volume respectively, total 10 level volumes
    //Bit6-Bit4: 000
    //Bit7: 0 - UnMute, 1 - Mute Volume

    const commandBuffer = []

    // TODO: Buffer builder
    commandBuffer[0] = 0 // 0x00
    commandBuffer[1] = redValue
    commandBuffer[2] = greenValue
    commandBuffer[3] = blueValue
    commandBuffer[4] = blyncLightByte.getByteValue()
    commandBuffer[5] = 0 // musicControl1
    commandBuffer[6] = 0 // musicControl2
    commandBuffer[7] = 0
    commandBuffer[8] = 34 // based on chipset (usb30 = 34, Tenx10 = product control code)

    this.hidDevice.write(commandBuffer)
  }
}
