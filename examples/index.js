const {
  // Classes
  BlyncConnector,
  BlyncLightByte,
  BlyncSoundOptionsByte,
  BlyncSoundVolumeByte,
  BlyncColor,
  // Enums
  BlyncLightProductsEnum,
  BlyncSoundsEnum,
  BlyncBlinkSpeedEnum,
  BlyncLightLevelEnum,
  BlyncLightStatusEnum,
  BlyncSoundStatusEnum,
  BlyncSoundRepeatEnum,
  BlyncSoundVolumeEnum,
  BlyncSoundMuteStatusEnum,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('../dist')

const Util = {
  sin_to_hex: (i, phase, size) => {
    var sin = Math.sin((Math.PI / size) * 2 * i + phase)
    var int = Math.floor(sin * 127) + 128
    var hex = int.toString(16)

    return hex.length === 1 ? '0' + hex : hex
  },
  wait: (seconds = 5, ms = 1000) => {
    var waitTill = new Date(new Date().getTime() + seconds * ms)
    while (waitTill > new Date()) {}
  },
}

const blyncConnector = new BlyncConnector()
const device = blyncConnector.getDevice(0)

/* Turn light and sound off on exit */
;['exit', 'uncaughtException', 'SIGQUIT', 'SIGINT'].forEach((signal) =>
  process.on(signal, () => {
    device.turnOff()
    process.exit()
  })
)

/* Set color (white) - full brightness - no blink */
device.sendCommand(
  new BlyncColor(255, 255, 255),
  new BlyncLightByte(
    BlyncLightStatusEnum.ON,
    BlyncLightLevelEnum.FULL,
    BlyncBlinkSpeedEnum.OFF
  )
)
Util.wait(5)

/* Set color (blue) - dim brightness - blink slow */
device.sendCommand(
  new BlyncColor(0, 255, 255),
  new BlyncLightByte(
    BlyncLightStatusEnum.ON,
    BlyncLightLevelEnum.DIM,
    BlyncBlinkSpeedEnum.SLOW
  )
)
Util.wait(5)

/* play circuit sound at 50% volume */
device.sendCommand(
  new BlyncColor(null, null, null),
  new BlyncLightByte(),
  new BlyncSoundOptionsByte(
    BlyncSoundsEnum.CIRCUIT,
    BlyncSoundStatusEnum.PLAYING,
    BlyncSoundRepeatEnum.ON
  ),
  new BlyncSoundVolumeByte(
    BlyncSoundVolumeEnum.PCT_100,
    BlyncSoundMuteStatusEnum.UNMUTE
  )
)
Util.wait(5)

/* Cycle through colors */
const colorCycleSize = 24 // multiple of 12
for (var i = 0; i < colorCycleSize; i++) {
  device.sendCommand(
    new BlyncColor(
      Util.sin_to_hex(i, (0 * Math.PI * 2) / 3, colorCycleSize),
      Util.sin_to_hex(i, (1 * Math.PI * 2) / 3, colorCycleSize),
      Util.sin_to_hex(i, (2 * Math.PI * 2) / 3, colorCycleSize)
    ),
    new BlyncLightByte(
      BlyncLightStatusEnum.ON,
      BlyncLightLevelEnum.FULL,
      BlyncBlinkSpeedEnum.OFF
    )
  )
  Util.wait(1, 500)
}

device.setLightBrightness(BlyncLightLevelEnum.DIM)
Util.wait(5)
