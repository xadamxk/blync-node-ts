import { BlyncLightDevices } from '../enums'
import { toInt } from '../utilities'

export class BlyncProduct {
  private vendorId: string // ex. 0e53
  private productId: string // ex. 000a
  private deviceName: BlyncLightDevices
  private deviceType: number

  constructor(
    vendorId: string,
    productId: string,
    deviceName: BlyncLightDevices,
    deviceType: number
  ) {
    this.vendorId = vendorId
    this.productId = productId
    this.deviceName = deviceName
    this.deviceType = deviceType
  }

  isBlyncMatch(givenVendorId: number, givenProductId: number): boolean {
    try {
      return (
        toInt(this.vendorId, 16) == givenVendorId &&
        toInt(this.productId, 16) == givenProductId
      )
    } catch (err) {
      return false
    }
  }
}
