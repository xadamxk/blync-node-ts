import { BlyncProduct } from '../../src/classes/BlyncProduct'
import { BlyncLightProductsEnum } from '../../src/enums'

describe('BlyncProduct', () => {
  test('should match valid given vendor and product id', () => {
    const myBlyncProduct = new BlyncProduct(
      '2c0d',
      '000a',
      BlyncLightProductsEnum.BLYNCLIGHT_MINI,
      13
    )
    expect(myBlyncProduct.isVendorIdProductIdMatch(11277, 10)).toBe(true)
  })

  test('should match valid given product name', () => {
    const myBlyncProduct = new BlyncProduct('', '', BlyncLightProductsEnum.BLYNCLIGHT_MINI, 1)
    expect(myBlyncProduct.isProductNameMatch(BlyncLightProductsEnum.BLYNCLIGHT_MINI)).toBe(true)
  })

  test('shouldnt match invalid given vendor and product id', () => {
    const myBlyncProduct = new BlyncProduct(
      '2c0d',
      '000a',
      BlyncLightProductsEnum.BLYNCLIGHT_WIRELESS,
      13
    )
    expect(myBlyncProduct.isVendorIdProductIdMatch(11277, 9)).toBe(false)
  })

  test('shouldnt match invalid given product name', () => {
    const myBlyncProduct = new BlyncProduct('', '', BlyncLightProductsEnum.BLYNCLIGHT_WIRELESS, 1)
    expect(myBlyncProduct.isProductNameMatch(BlyncLightProductsEnum.BLYNCLIGHT_MINI)).toBe(false)
  })
})
