import { BlyncLightProductsEnum } from '../enums'
import { toInt } from '../utilities'

export class BlyncProduct {
  private vendorId: string // ex. 0e53
  private productId: string // ex. 000a
  private deviceName: BlyncLightProductsEnum
  private deviceType: number

  constructor(
    vendorId: string,
    productId: string,
    deviceName: BlyncLightProductsEnum,
    deviceType: number
  ) {
    this.vendorId = vendorId
    this.productId = productId
    this.deviceName = deviceName
    this.deviceType = deviceType
  }

  // TODO: Rename
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
