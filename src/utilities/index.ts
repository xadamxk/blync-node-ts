export const toInt = (value: string | number, base = 10): number => {
  try {
    const valueStr = value.toString()
    return parseInt(valueStr, base)
  } catch (err) {
    return 0
  }
}
