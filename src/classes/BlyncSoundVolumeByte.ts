import { BlyncSoundMuteStatusEnum, BlyncSoundVolumeEnum } from '../enums'

/**
   * SoundVolumeByte => Bit7-Bit0
   * 
      Bit3-Bit0 Sound Volume %:
      - 1 : 10%
      ...
      - 10 : 100%
  
      Bit6-4 Nothing:
  
      Bit7 Mute Status:
      - 0 : Unmute Volume
      - 1 : Mute Volume
  */
export class BlyncSoundVolumeByte {
  private soundVolume: BlyncSoundVolumeEnum
  private muteStatus: BlyncSoundMuteStatusEnum

  constructor(
    soundVolume = BlyncSoundVolumeEnum.PCT_100,
    muteStatus = BlyncSoundMuteStatusEnum.MUTE
  ) {
    this.soundVolume = soundVolume
    this.muteStatus = muteStatus
  }

  getByteValue(): number {
    return this.soundVolume + this.muteStatus
  }
}
