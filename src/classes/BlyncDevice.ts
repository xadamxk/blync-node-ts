import hid from 'node-hid'
import { BlyncLightLevelEnum, BlyncLightStatusEnum } from '../enums'
import { toInt } from '../utilities'
import { BlyncColor } from './BlyncColor'
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

  public setLightBrightness(lightLevel: BlyncLightLevelEnum): void {
    const commandBuffer = []

    // TODO: Buffer builder
    commandBuffer[0] = 0 // 0x00
    commandBuffer[1] = 255
    commandBuffer[2] = 255
    commandBuffer[3] = 255
    commandBuffer[4] = lightLevel + BlyncLightStatusEnum.ON
    commandBuffer[5] = 0
    commandBuffer[6] = 0
    commandBuffer[7] = 0
    commandBuffer[8] = 34 // based on chipset (usb30 = 34, Tenx10 = product control code)

    this.hidDevice.write(commandBuffer)
  }

  public sendCommand(
    color = new BlyncColor(),
    lightByte = new BlyncLightByte(),
    soundOptions = new BlyncSoundOptionsByte(),
    volumeOptions = new BlyncSoundVolumeByte()
  ): void {
    const commandBuffer = []
    // TODO: Buffer builder
    commandBuffer[0] = 0 // 0x00
    commandBuffer[1] = color.getRed()
    commandBuffer[2] = color.getGreen()
    commandBuffer[3] = color.getBlue()
    commandBuffer[4] = lightByte.getByteValue()
    commandBuffer[5] = soundOptions.getByteValue()
    commandBuffer[6] = volumeOptions.getByteValue()
    commandBuffer[7] = 0
    commandBuffer[8] = 34 // based on chipset (usb30 = 34, Tenx10 = product control code)

    this.hidDevice.write(commandBuffer)
  }
}
