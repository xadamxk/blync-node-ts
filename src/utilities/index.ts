export const toInt = (value: string | number, base = 10): number => {
  try {
    const valueStr = value.toString()
    const intValue = parseInt(valueStr, base)
    if (isNaN(intValue)) {
      throw Error('')
    }
    return intValue
  } catch (err) {
    return 0
  }
}
