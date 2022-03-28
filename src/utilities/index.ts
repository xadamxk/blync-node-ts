export const toInt = (value: string | number, base = 10): number => {
  try {
    const valueStr = value.toString()
    if (isNaN(Number(valueStr))) throw Error('Not a number')
    return parseInt(valueStr, base)
  } catch (err) {
    return 0
  }
}
