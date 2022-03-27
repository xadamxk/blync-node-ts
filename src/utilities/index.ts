export const toInt = (value: string | number, base = 10): number => {
    const valueStr = value.toString();
    try {
        return parseInt(valueStr, base);
    } catch (err) { return 0 }
}