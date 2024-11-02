import { MESSAGES } from "./messages.js";

const DRONES = {
    sevenInch: "7\"",
    tenInch: "10\""
};

const DRONE_PART_TYPES = {
    frame: "frame",
    motorWithPropeller: "motorWithPropeller",
    battery: "battery",
    flightController: "flightController",
    camera: "camera",
    videoAntenna: "videoAntenna",
    radioModule: "radioModule"
};

// TODO define names in messages
const DRONE_PARTS = {
    [DRONE_PART_TYPES.frame]: {
        label: MESSAGES.frame,
        quantity: 1,
        models: [
            {
                name: "Mark 4 7\"",
                price: 12,
                compatibility: [DRONES.sevenInch],
                imagePath: "images/drone-assets/1 - frame 7 inches Mark_4.PNG"
            },
            {
                name: "Mark 4 v2 10\"",
                price: 20,
                compatibility: [DRONES.tenInch],
                imagePath: "images/drone-assets/2 - frame 10 inches Mark_4-v2.PNG"
            }
        ]
    },
    [DRONE_PART_TYPES.motorWithPropeller]: {
        label: MESSAGES.motorWithPropeller,
        quantity: 4,
        models: [
            {
                name: "Flash Hobby 2807 1300kv + Props HQProp 7x4x3",
                price: 55,
                compatibility: [DRONES.sevenInch],
                imagePath: "images/drone-assets/3 - motor 7 inches 2807 1300kv+7x4x3.PNG"
            },
            {
                name: "EMAX 2807 1300kv + Props HQProp 7x4x3",
                price: 45,
                compatibility: [DRONES.sevenInch],
                imagePath: "images/drone-assets/3 - motor 7 inches 2807 1300kv+7x4x3.PNG"
            },
            {
                name: "ReadyToSky 3115 900kv + Props HQ MacroQuad Prop 10x5x3",
                price: 70,
                compatibility: [DRONES.tenInch],
                imagePath: "images/drone-assets/4 - motor 10 inches 3115+10x5x3.PNG"
            },
            {
                name: "BrotherHobby Tornado 3115 900kv + Props HQ MacroQuad Prop 10x5x3",
                price: 110,
                compatibility: [DRONES.tenInch],
                imagePath: "images/drone-assets/4 - motor 10 inches 3115+10x5x3.PNG"
            }
        ]
    },
    [DRONE_PART_TYPES.battery]: {
        label: MESSAGES.battery,
        quantity: 1,
        models: [
            {
                type: DRONE_PART_TYPES.battery,
                name: "6s2p 8000mAh",
                price: 60,
                compatibility: [DRONES.sevenInch, DRONES.tenInch],
                imagePath: "images/drone-assets/5 - battery 6s2p.PNG"
            },
            {
                type: DRONE_PART_TYPES.battery,
                name: "6s3p 12000mAh",
                price: 90,
                compatibility: [DRONES.sevenInch, DRONES.tenInch],
                imagePath: "images/drone-assets/6 - battery 6s3p.PNG"
            }
        ]
    },
    [DRONE_PART_TYPES.flightController]: {
        label: MESSAGES.flightController,
        quantity: 1,
        imagePath: "images/drone-assets/7 - controller.PNG",
        models: [
            {
                name: "SpeedyBee V4 55A",
                price: 50,
                compatibility: [DRONES.sevenInch, DRONES.tenInch]
            },
            {
                name: "Mamba F405 MK2",
                price: 70,
                compatibility: [DRONES.sevenInch, DRONES.tenInch]
            }
        ]
    },
    [DRONE_PART_TYPES.camera]: {
        label: MESSAGES.camera,
        quantity: 1,
        imagePath: "images/drone-assets/8 -camera.PNG",
        models: [
            {
                name: "Caddx Ratel Pro",
                price: 30,
                compatibility: [DRONES.sevenInch, DRONES.tenInch]
            },
            {
                name: "Foxeer Night Cat 3",
                price: 40,
                compatibility: [DRONES.sevenInch, DRONES.tenInch]
            }
        ]
    },
    [DRONE_PART_TYPES.videoAntenna]: {
        label: MESSAGES.videoAntenna,
        quantity: 1,
        imagePath: "images/drone-assets/9 -video antenna.PNG",
        models: [
            {
                name: "Rush Cherry 2",
                price: 10,
                compatibility: [DRONES.sevenInch, DRONES.tenInch]
            },
            {
                name: "SkyZone MushRoom",
                price: 8,
                compatibility: [DRONES.sevenInch, DRONES.tenInch]
            }
        ]
    },
    [DRONE_PART_TYPES.radioModule]: {
        label: MESSAGES.radioModule,
        quantity: 1,
        imagePath: "images/drone-assets/10 - radio module.PNG",
        models: [
            {
                name: "Bayck ELRS 915mhz",
                price: 10,
                compatibility: [DRONES.sevenInch, DRONES.tenInch]
            },
            {
                name: "HappyModel RX 915mhz",
                price: 15,
                compatibility: [DRONES.sevenInch, DRONES.tenInch]
            }
        ]
    }
};

export { DRONE_PARTS, DRONES };
