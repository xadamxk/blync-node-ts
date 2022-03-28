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
    expect(myBlyncProduct.isBlyncMatch(11277, 10)).toBe(true)
  })

  test('shouldnt match invalid given vendor and product id', () => {
    const myBlyncProduct = new BlyncProduct(
      '2c0d',
      '000a',
      BlyncLightProductsEnum.BLYNCLIGHT_WIRELESS,
      13
    )
    expect(myBlyncProduct.isBlyncMatch(11277, 9)).toBe(false)
  })
})
