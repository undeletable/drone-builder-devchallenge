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

// TODO remove redundant fields
const DRONE_PART_TYPES_DATA = {
    [DRONE_PART_TYPES.frame]: {
        label: MESSAGES.frame,
        isExclusive: true,
        quantity: 1
    },
    [DRONE_PART_TYPES.motorWithPropeller]: {
        label: MESSAGES.motorWithPropeller,
        isExclusive: true,
        quantity: 4
    },
    [DRONE_PART_TYPES.battery]: {
        label: MESSAGES.battery,
        isExclusive: false,
        quantity: 1
    },
    [DRONE_PART_TYPES.flightController]: {
        label: MESSAGES.flightController,
        isExclusive: false,
        quantity: 1
    },
    [DRONE_PART_TYPES.camera]: {
        label: MESSAGES.camera,
        isExclusive: false,
        quantity: 1
    },
    [DRONE_PART_TYPES.videoAntenna]: {
        label: MESSAGES.videoAntenna,
        isExclusive: false,
        quantity: 1
    },
    [DRONE_PART_TYPES.radioModule]: {
        label: MESSAGES.radioModule,
        isExclusive: false,
        quantity: 1
    }
};

// TODO define names in messages
const DRONE_PARTS = {
    mark4Frame7: {
        type: DRONE_PART_TYPES.frame,
        name: "Mark 4 7\"",
        price: 12,
        compatibility: [DRONES.sevenInch],
        imagePath: "images/drone-assets/1 - frame 7 inches Mark_4.PNG"
    },
    mark4v2Frame10: {
        type: DRONE_PART_TYPES.frame,
        name: "Mark 4 v2 10\"",
        price: 20,
        compatibility: [DRONES.tenInch],
        imagePath: "images/drone-assets/2 - frame 10 inches Mark_4-v2.PNG"
    },
    flashHobby2807Motor: {
        type: DRONE_PART_TYPES.motorWithPropeller,
        name: "Flash Hobby 2807 1300kv + Props HQProp 7x4x3",
        price: 55,
        compatibility: [DRONES.sevenInch],
        imagePath: "images/drone-assets/3 - motor 7 inches 2807 1300kv+7x4x3.PNG"
    },
    emax2807Motor: {
        type: DRONE_PART_TYPES.motorWithPropeller,
        name: "EMAX 2807 1300kv + Props HQProp 7x4x3",
        price: 45,
        compatibility: [DRONES.sevenInch],
        imagePath: "images/drone-assets/3 - motor 7 inches 2807 1300kv+7x4x3.PNG"
    },
    readyToSky3115Motor: {
        type: DRONE_PART_TYPES.motorWithPropeller,
        name: "ReadyToSky 3115 900kv + Props HQ MacroQuad Prop 10x5x3",
        price: 70,
        compatibility: [DRONES.tenInch],
        imagePath: "images/drone-assets/4 - motor 10 inches 3115+10x5x3.PNG"
    },
    brotherHobbyTornado3115Motor: {
        type: DRONE_PART_TYPES.motorWithPropeller,
        name: "BrotherHobby Tornado 3115 900kv + Props HQ MacroQuad Prop 10x5x3",
        price: 110,
        compatibility: [DRONES.tenInch],
        imagePath: "images/drone-assets/4 - motor 10 inches 3115+10x5x3.PNG"
    },
    "6s2pBattery": {
        type: DRONE_PART_TYPES.battery,
        name: "6s2p 8000mAh",
        price: 60,
        compatibility: [DRONES.sevenInch, DRONES.tenInch],
        imagePath: "images/drone-assets/5 - battery 6s2p.PNG"
    },
    "6s3pBattery": {
        type: DRONE_PART_TYPES.battery,
        name: "6s3p 12000mAh",
        price: 90,
        compatibility: [DRONES.sevenInch, DRONES.tenInch],
        imagePath: "images/drone-assets/6 - battery 6s3p.PNG"
    },
    speedyBeeV4FlightController: {
        type: DRONE_PART_TYPES.flightController,
        name: "SpeedyBee V4 55A",
        price: 50,
        compatibility: [DRONES.sevenInch, DRONES.tenInch],
        imagePath: "images/drone-assets/7 - controller.PNG"
    },
    mambaF405MK2FlightController: {
        type: DRONE_PART_TYPES.flightController,
        name: "Mamba F405 MK2",
        price: 70,
        compatibility: [DRONES.sevenInch, DRONES.tenInch],
        imagePath: "images/drone-assets/7 - controller.PNG"
    },
    caddxRatelProCamera: {
        type: DRONE_PART_TYPES.camera,
        name: "Caddx Ratel Pro",
        price: 30,
        compatibility: [DRONES.sevenInch, DRONES.tenInch],
        imagePath: "images/drone-assets/8 -camera.PNG"
    },
    foxeerNightCat3Camera: {
        type: DRONE_PART_TYPES.camera,
        name: "Foxeer Night Cat 3",
        price: 40,
        compatibility: [DRONES.sevenInch, DRONES.tenInch],
        imagePath: "images/drone-assets/8 -camera.PNG"
    },
    rushCherry2VideoAntenna: {
        type: DRONE_PART_TYPES.videoAntenna,
        name: "Rush Cherry 2",
        price: 10,
        compatibility: [DRONES.sevenInch, DRONES.tenInch],
        imagePath: "images/drone-assets/9 -video antenna.PNG"
    },
    skyZoneMushRoomVideoAntenna: {
        type: DRONE_PART_TYPES.videoAntenna,
        name: "SkyZone MushRoom",
        price: 8,
        compatibility: [DRONES.sevenInch, DRONES.tenInch],
        imagePath: "images/drone-assets/9 -video antenna.PNG"
    },
    bayckELRSRadioModule: {
        type: DRONE_PART_TYPES.radioModule,
        name: "Bayck ELRS 915mhz",
        price: 10,
        compatibility: [DRONES.sevenInch, DRONES.tenInch],
        imagePath: "images/drone-assets/10 - radio module.PNG"
    },
    happyModelRXRadioModule: {
        type: DRONE_PART_TYPES.radioModule,
        name: "HappyModel RX 915mhz",
        price: 15,
        compatibility: [DRONES.sevenInch, DRONES.tenInch],
        imagePath: "images/drone-assets/10 - radio module.PNG"
    }
};

export { DRONE_PARTS };
