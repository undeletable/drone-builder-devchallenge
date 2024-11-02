import { DRONE_PARTS, DRONES } from "../constants/parts.js";

const _store = {
    drones: DRONES,
    parts: DRONE_PARTS,
};

const SELECTORS = {
    getAllParts: () => _store.parts,
    getDrones: () => _store.drones
};

const MODIFIERS = {};

export { MODIFIERS, SELECTORS };
