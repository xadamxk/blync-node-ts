import { toInt } from "../utilities";

export class HIDDevice {
    hidDevice: any;

    constructor(hidDevice: any) {
        this.hidDevice = hidDevice;
    }

    public sendCommand(
        red: 255,
        green: 255,
        blue: 255,
        dim = false,
        blink = 0
    ): void {
        // make sure the parameters are all integer
        const redValue = toInt(red)
        const greenValue = toInt(green)
        const blueValue = toInt(blue)
        const blinkValue = toInt(blink)

        let lightControl = 0b000000
        // TODO: Light control
        // Bit0: 0 - Light On, 1 - Light Off 
        // Bit1: 0 - No Dim (Full Brightness), 1 - Dim by 50%
        if (dim) {
            lightControl += 0b000010
        }

        // Bit2: 0 - No Flash, 1- Start Flash (Blink)
        // Bit5-Bit3 - Flash speed - 001 - slow, 010 - medium, 100- fast
        switch (blinkValue) {
            case 0:
                // no blink
                break;
            case 1: // slow
                lightControl += 0b001100
                break;
            case 2: // medium
                lightControl += 0b010100
                break;
            case 3: // fast
                lightControl += 0b1100100
                break;
        }

        // TODO: Music controls
        //musicControl1 byte => Bit7-Bit0
        //Bit3-Bit0: Choose music, corresponding from the music 1 to music 10 respectively,total 10 music
        //Bit4: 0 - Stop Playing Music, 1 - Start Music Play
        //Bit5: 0 - Stop Music Repeat, 1 - Start Music Repeat
        //Bit6-Bit7: 00

        //musicControl2 byte => Bit7-Bit0
        //Bit3-Bit0: 1-10 corresponding from 10% volume to 100% volume respectively, total 10 level volumes
        //Bit6-Bit4: 000
        //Bit7: 0 - Clear Mute, 1 - Mute Volume

        const commandBuffer = [];

        // TODO: Buffer builder
        commandBuffer[0] = 0; // 0x00
        commandBuffer[1] = redValue;
        commandBuffer[2] = greenValue;
        commandBuffer[3] = blueValue;
        commandBuffer[4] = lightControl;
        commandBuffer[5] = 0; // musicControl1
        commandBuffer[6] = 0; // musicControl2
        commandBuffer[7] = 0;
        commandBuffer[8] = 34;

        this.hidDevice.write(commandBuffer);
    };
}