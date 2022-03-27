import hid from 'node-hid'
import { toInt } from '../utilities'
import { BlyncLightByte } from './BlyncLightByte'
import { BlyncSoundOptionsByte } from './BlyncSoundOptionsByte'
import { BlyncSoundVolumeByte } from './BlyncSoundVolumeByte'

export class BlyncDevice {
  hidDevice: hid.HID

  constructor(hidDevice: hid.HID) {
    this.hidDevice = hidDevice
  }

  public turnOff(): void {
    this.sendCommand()
  }

  public sendCommand(
    red = 255,
    green = 255,
    blue = 255,
    lightByte = new BlyncLightByte(),
    soundOptions = new BlyncSoundOptionsByte(),
    volumeOptions = new BlyncSoundVolumeByte()
  ): void {
    // Convert colors to integers safely
    const redValue = toInt(red)
    const greenValue = toInt(green)
    const blueValue = toInt(blue)

    const commandBuffer = []

    // TODO: Buffer builder
    commandBuffer[0] = 0 // 0x00
    commandBuffer[1] = redValue
    commandBuffer[2] = greenValue
    commandBuffer[3] = blueValue
    commandBuffer[4] = lightByte.getByteValue()
    commandBuffer[5] = soundOptions.getByteValue()
    commandBuffer[6] = volumeOptions.getByteValue()
    commandBuffer[7] = 0
    commandBuffer[8] = 34 // based on chipset (usb30 = 34, Tenx10 = product control code)

    this.hidDevice.write(commandBuffer)
  }
}
