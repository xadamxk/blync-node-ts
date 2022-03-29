import { toInt } from '../utilities'

export class BlyncColor {
  private red: number
  private green: number
  private blue: number

  constructor(red = 255, green = 255, blue = 255) {
    this.red = this.validateValue(toInt(red))
    this.green = this.validateValue(toInt(green))
    this.blue = this.validateValue(toInt(blue))
  }

  private validateValue(value: number): number {
    // Color value must be valid byte size
    if (value >= 0 && value <= 255) {
      return value
    }
    return 255
  }

  /** Getters/Setters */
  public getRed(): number {
    return this.red
  }

  public setRed(value: number): void {
    this.red = this.validateValue(toInt(value))
  }

  public getGreen(): number {
    return this.green
  }

  public setGreen(value: number): void {
    this.green = this.validateValue(toInt(value))
  }

  public getBlue(): number {
    return this.blue
  }

  public setBlue(value: number): void {
    this.blue = this.validateValue(toInt(value))
  }
}
