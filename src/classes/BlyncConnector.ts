import hid from 'node-hid'
import { BlyncLightProductsEnum } from '../enums'
import { BlyncProduct } from './BlyncProduct'
import { BlyncDevice } from './BlyncDevice'

export class BlyncConnector {
  // Blync Light info obtained from DeviceAccess.cs
  blyncProducts: BlyncProduct[] = [
    // eslint-disable-next-line prettier/prettier
    new BlyncProduct('2c0d', '0009', BlyncLightProductsEnum.BLYNCLIGHT_EMBRAVA_EMBEDDED, 12),
    // eslint-disable-next-line prettier/prettier
    new BlyncProduct('2c0d', '000a', BlyncLightProductsEnum.BLYNCLIGHT_MINI, 13), // BLYNCLIGHT_MINI
    new BlyncProduct('0e53', '2519', BlyncLightProductsEnum.BLYNCLIGHT_MINI, 7), // BLYNCLIGHT_MINI
    new BlyncProduct('2c0d', '0003', BlyncLightProductsEnum.BLYNCLIGHT_MINI, 7), // BLYNCLIGHT_MINI
    new BlyncProduct('1130', '0001', BlyncLightProductsEnum.BLYNCLIGHT, 1), // BLYNCUSB10 DEVICE
    new BlyncProduct('1130', '0002', BlyncLightProductsEnum.BLYNCLIGHT, 1), // BLYNCUSB10 DEVICE
    new BlyncProduct('0e53', '2516', BlyncLightProductsEnum.BLYNCLIGHT, 3), // BLYNCUSB30 DEVICE
    new BlyncProduct('2c0d', '0001', BlyncLightProductsEnum.BLYNCLIGHT, 3), // BLYNCUSB30 DEVICE
    new BlyncProduct('0e53', '2517', BlyncLightProductsEnum.BLYNCLIGHT, 4), // BLYNCUSB30S DEVICE
    new BlyncProduct('2c0d', '0002', BlyncLightProductsEnum.BLYNCLIGHT, 4), // BLYNCUSB30S DEVICE
    new BlyncProduct('2c0d', '000c', BlyncLightProductsEnum.BLYNCLIGHT_IPE, 15), // BLYNCUSB40 DEVICE
    // eslint-disable-next-line prettier/prettier
    new BlyncProduct('2c0d', '0010', BlyncLightProductsEnum.BLYNCLIGHT_PLUS, 16), // BLYNCUSB40S DEVICE
    // eslint-disable-next-line prettier/prettier
    new BlyncProduct('2c0d', '0006', BlyncLightProductsEnum.BLYNCLIGHT_WIRELESS, 6),
    // eslint-disable-next-line prettier/prettier
    new BlyncProduct('2c0d', '000b', BlyncLightProductsEnum.BLYNCLIGHT_WIRELESS, 14),
    // eslint-disable-next-line prettier/prettier
    new BlyncProduct('2c0d', '000f', BlyncLightProductsEnum.BLYNCLIGHT_NAMEPLATE, 17),
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
    try {
      const devices = hidDevices.filter((hidDevice: hid.Device) => {
        // Check if hid device matches any blync devices
        return (
          hidDevice.path &&
          this.blyncProducts.some((blyncProduct: BlyncProduct) => {
            // eslint-disable-next-line prettier/prettier
            return blyncProduct.isVendorIdProductIdMatch(hidDevice.vendorId, hidDevice.productId)
          })
        )
      })

      const blyncDevices = devices.map((blyncDevice: hid.Device) => {
        return new BlyncDevice(new hid.HID(blyncDevice.path || ''))
      })

      if (!blyncDevices || blyncDevices.length === 0) {
        throw Error(`No Blync devices found for known hardware ids.`)
      }

      return blyncDevices
    } catch (err: any) {
      throw Error(err)
    }
  }

  // eslint-disable-next-line prettier/prettier
  private getDevicesByProductName(productName: BlyncLightProductsEnum): BlyncDevice[] {
    const hidDevices = hid.devices() || []
    try {
      const devices = hidDevices.filter((hidDevice: hid.Device) => {
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
      const blyncDevices = devices.map((blyncDevice: hid.Device) => {
        return new BlyncDevice(new hid.HID(blyncDevice.path || ''))
      })
      if (!blyncDevices || blyncDevices.length === 0) {
        throw Error(`No Blync devices found for product name: '${productName}'`)
      }
      return blyncDevices
    } catch (err: any) {
      throw Error(err)
    }
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
