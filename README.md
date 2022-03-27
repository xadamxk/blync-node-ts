# blync-node-ts

An unofficial NodeJS SDK with TypeScript Support for [Embrava Blynclight Products](https://embrava.com/collections/blynclight-series).

## Getting Started

### Minimum requirements & compatibility

To run the SDK you will need [NodeJS](https://nodejs.org/dist/latest-v14.x/) (`14.x`) and [npm](https://www.npmjs.com/package/npm). This library is modeled on the decompiling [Blynclight .NET SDK](https://embrava.com/pages/embrava-software-sdk) - [`version 3.0.4`](https://embrava.github.io/embrava/sdk/Embrava_SDK_For_Windows_v3.0.4.zip);

### Install the sdk

This library can be installed via npm:

```
npm install blync-node-ts
```

Or installed locally:

```
git clone https://github.com/xadamxk/blync-node-ts.git
cd ./blync-node-ts
npm install
npm link

cd ../test-project
npm link blync-node-ts
```

## Features

- Supports multiple Blynclight Devices ([Embrava Embdedded, Blynclight Mini](./src/classes/BlyncConnector.ts))
- Control device lights ([color, light level, blind speed](./src/classes/BlyncLightByte.ts))
- Play device sounds ([sound files, repeat audio](./src/classes/BlyncSoundOptionsByte.ts))
- Control device sound ([volume, mute status](./src/classes/BlyncSoundVolumeByte.ts))
- Supported on Windows and Linux

## Usage - Examples

```
const {
    // Classes
    BlyncConnector,
    BlyncLightByte,
    BlyncSoundOptionsByte,
    BlyncSoundVolumeByte,
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
} = require('blync-node-ts')

const blyncConnector = new BlyncConnector();
const device = blyncConnector.getDevice(0);

/* Set color (white) - full brightness - no blink */
device.sendCommand(
    255,
    255,
    255,
    new BlyncLightByte(BlyncLightStatusEnum.ON, BlyncLightLevelEnum.FULL, BlyncBlinkSpeedEnum.OFF)
);

/* Set color (blue) - dim brightness - blink slow */
 device.sendCommand(
     0,
     255,
     255,
     new BlyncLightByte(BlyncLightStatusEnum.ON, BlyncLightLevelEnum.DIM, BlyncBlinkSpeedEnum.SLOW)
 );

 /* play circuit sound at 50% volume */
 device.sendCommand(
     null,null,null,
     new BlyncLightByte(),
     new BlyncSoundOptionsByte(BlyncSoundsEnum.CIRCUIT, BlyncSoundStatusEnum.PLAYING, BlyncSoundRepeatEnum.ON),
     new BlyncSoundVolumeByte(BlyncSoundVolumeEnum.PCT_100, BlyncSoundMuteStatusEnum.UNMUTE)
 );

 /* Turn light and sound off on exit */
 ['exit', 'uncaughtException', 'SIGINT', 'SIGTERM', 'SIGQUIT']
  .forEach(signal => process.on(signal, () => {
    device.turnOff();
    process.exit();
  }));
```

## Contributing and Reporting Issues

This project can be forked from [Github](https://github.com/xadamxk/blync-node-ts). Please issue pull requests from feature branches and follow [conventional commit standards](https://www.conventionalcommits.org/en/v1.0.0/).

## Acknowledgements

- [blync-node](https://github.com/Offbeatmammal/blync-node)
- [node-blync-USB30](https://github.com/julienstroheker/node-blync-USB30)
- [node-blync](https://github.com/justmoon/node-blync)

## TODO:

- fix commit hooks
  - sort-package-json on commit
  - lint on commit
- Find device by name
- Find device by index
- BlyncDevice functions
  - Support color enum
- Add device support for USB30 devices
