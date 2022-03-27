import hid from 'node-hid'
import { toInt } from '../utilities'
import { BlyncLightByte } from './BlyncLightByte'
import { BlyncSoundOptionsByte } from './BlyncSoundOptionsByte'

export class BlyncDevice {
  hidDevice: hid.HID

  constructor(hidDevice: hid.HID) {
    this.hidDevice = hidDevice
  }

  public turnOff(): void {
    // TODO: Turn off sound as well
    this.sendCommand()
  }

  public sendCommand(
    red = 255,
    green = 255,
    blue = 255,
    lightByte = new BlyncLightByte(),
    soundOptions = new BlyncSoundOptionsByte()
  ): void {
    // Convert colors to integers safely
    const redValue = toInt(red)
    const greenValue = toInt(green)
    const blueValue = toInt(blue)

    // TODO: Music controls

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
    commandBuffer[4] = lightByte.getByteValue()
    commandBuffer[5] = soundOptions.getByteValue()
    commandBuffer[6] = 0 // musicControl2
    commandBuffer[7] = 0
    commandBuffer[8] = 34 // based on chipset (usb30 = 34, Tenx10 = product control code)

    this.hidDevice.write(commandBuffer)
  }
}
