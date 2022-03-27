import { BlyncLightDevices } from "../enums/BlyncLightDevices"
import { toInt } from "../utilities";

export class BlyncProduct {
    private vendorId: string; // ex. 0e53
    private productId: string; // ex. 000a
    private name: BlyncLightDevices;
    private deviceType: number;

    constructor(vendorId: string, productId: string, name: BlyncLightDevices, deviceType: number) {
        this.vendorId = vendorId;
        this.productId = productId;
        this.name = name;
        this.deviceType = deviceType;
    }

    isBlyncMatch(givenVendorId: number, givenProductId: number): boolean {
        try {
            return toInt(this.vendorId, 16) == givenVendorId &&
                toInt(this.productId, 16) == givenProductId;
        } catch (err) {
            return false;
        }
    }
}

