import hid from 'node-hid'
import { BlyncLightProductsEnum } from '../enums'
import { BlyncProduct } from './BlyncProduct'
import { BlyncDevice } from './BlyncDevice'

export class BlyncConnector {
  // Blync Light info obtained from DeviceAccess.cs
  blyncProducts: BlyncProduct[] = [
    // eslint-disable-next-line prettier/prettier
    new BlyncProduct('2c0d', '0009', BlyncLightProductsEnum.BLYNCLIGHT_EMBRAVA_EMBEDDED, 12),
    new BlyncProduct('0e53', '2519', BlyncLightProductsEnum.BLYNCLIGHT_MINI, 7),
    new BlyncProduct('2c0d', '0003', BlyncLightProductsEnum.BLYNCLIGHT_MINI, 7),
    // eslint-disable-next-line prettier/prettier
    new BlyncProduct('2c0d', '000a', BlyncLightProductsEnum.BLYNCLIGHT_MINI, 13),
  ]

  private indexCheck = (index: number, devices: BlyncDevice[]) => {
    if (index < 0) {
      throw new Error('Invalid device index')
    }
    if (index > devices.length) {
      throw new Error('Device index #' + index + ' not found')
    }
  }

  private getDevicesByVendorIdProductId(): BlyncDevice[] {
    const hidDevices = hid.devices() || []

    return hidDevices
      .filter((hidDevice: hid.Device) => {
        // Check if hid device matches any blync devices
        return (
          hidDevice.path &&
          this.blyncProducts.some((blyncProduct: BlyncProduct) => {
            // eslint-disable-next-line prettier/prettier
            return blyncProduct.isVendorIdProductIdMatch(hidDevice.vendorId, hidDevice.productId)
          })
        )
        // TODO: Test on Linux and OSX
        // on macOS/Windows, dev.interface === -1, but on Raspbian shows as 0, so removing for now:
        // && dev.interface === -1;
      })
      .map((blyncDevice: hid.Device) => {
        return new BlyncDevice(new hid.HID(blyncDevice.path || ''))
      })
  }

  // eslint-disable-next-line prettier/prettier
  private getDevicesByProductName(productName: BlyncLightProductsEnum): BlyncDevice[] {
    const hidDevices = hid.devices() || []
    return hidDevices
      .filter((hidDevice: hid.Device) => {
        return (
          hidDevice.path &&
          this.blyncProducts.some((blyncProduct: BlyncProduct) => {
            return (
              blyncProduct.isProductNameMatch(productName) &&
              // eslint-disable-next-line prettier/prettier
              blyncProduct.isVendorIdProductIdMatch(hidDevice.vendorId, hidDevice.productId)
            )
          })
        )
      })
      .map((blyncDevice: hid.Device) => {
        return new BlyncDevice(new hid.HID(blyncDevice.path || ''))
      })
  }

  getDevice(index = 0): BlyncDevice {
    const devicesByVendorIdProductId = this.getDevicesByVendorIdProductId()
    this.indexCheck(index, devicesByVendorIdProductId)
    return devicesByVendorIdProductId[index]
  }

  // eslint-disable-next-line prettier/prettier
  getDeviceByProductName(productName: BlyncLightProductsEnum, index = 0): BlyncDevice {
    const devicesByProductName = this.getDevicesByProductName(productName)
    this.indexCheck(index, devicesByProductName)
    return devicesByProductName[index]
  }
}
