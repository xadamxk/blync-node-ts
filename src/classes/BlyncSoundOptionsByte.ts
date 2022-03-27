import {
  BlyncSoundRepeatEnum,
  BlyncSoundStatusEnum,
  BlyncSoundsEnum,
} from '../enums'

/**
 * SoundOptionsByte => Bit7-Bit0
 * 
    Bit3-Bit0 Sound File Name:
    - 10 options: BlyncSoundsEnum

    Bit4 Sound Status:
    - 0 : Stop sound
    - 1 : Play sound

    Bit5 Sound Repeat Status:
    - 0 : Stop repeat
    - 1 : Play repeat

    Bit7-6 Nothing 
*/
export class BlyncSoundOptionsByte {
  private musicFilename: BlyncSoundsEnum
  private playSound: BlyncSoundStatusEnum
  private repeat: BlyncSoundRepeatEnum

  constructor(
    musicFilename = BlyncSoundsEnum.NO_SOUND,
    playSound = BlyncSoundStatusEnum.STOPPED,
    repeat = BlyncSoundRepeatEnum.OFF
  ) {
    this.musicFilename = musicFilename
    this.playSound = playSound
    this.repeat = repeat
  }

  getByteValue(): number {
    return this.musicFilename + this.playSound + this.repeat
  }
}
