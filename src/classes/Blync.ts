var hid = require('node-hid');
import { BlyncLightDevices } from '../enums/BlyncLightDevices';
import { BlyncProduct } from '../interfaces/BlyncProduct';
import { HIDDevice } from './HIDDevice';

export class Blync {
    // Blync Light info obtained from DeviceAccess.cs
    blyncProducts: BlyncProduct[] = [
        new BlyncProduct("2c0d", "0009", BlyncLightDevices.BLYNCLIGHT_EMBRAVA_EMBEDDED, 12),
        new BlyncProduct("0e53", "2519", BlyncLightDevices.BLYNCLIGHT_MINI, 7),
        new BlyncProduct("2c0d", "0003", BlyncLightDevices.BLYNCLIGHT_MINI, 7),
        new BlyncProduct("2c0d", "000a", BlyncLightDevices.BLYNCLIGHT_MINI, 13),
    ]

    getDevices(): HIDDevice[] {
        const hidDevices = hid.devices() || [];

        return hidDevices.filter((hidDevice: any) => {
            // Check if hid device matches any blync devices
            return this.blyncProducts.some((blyncProduct: BlyncProduct) => {
                return blyncProduct.isBlyncMatch(hidDevice.vendorId, hidDevice.productId);
            });
            // TODO: Test on Linux and OSX
            // on macOS/Windows, dev.interface === -1, but on Raspbian shows as 0, so removing for now:
            // && dev.interface === -1;

        }).map((blyncDevice: any) => {
            return new HIDDevice(new hid.HID(blyncDevice.path));
        });
    };
    getDevice(index: number): HIDDevice {
        index = +index || 0;

        const devices = this.getDevices();
        if (index < 0) {
            throw new Error("Invalid device index");
        }
        if (index >= devices.length) {
            throw new Error("Device index #" + index + " not found");
        }

        return devices[index];
    };
}