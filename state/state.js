import { DRONE_PART_TYPES, DRONE_PARTS, DRONES } from "../constants/parts.js";
import { StateManagementEvent } from "../lib/StateManagementEvent.js";

const _store = {
    appliedParts: [],
    availableParts: DRONE_PARTS,
    drones: DRONES,
    selectedPart: null
};

const SELECTORS = {
    getAppliedParts: () => _store.appliedParts,
    getHasAppliedParts: () => SELECTORS.getAppliedParts().length > 0,
    getAvailableParts: () => _store.availableParts,
    getCurrentDroneType: () => _store.appliedParts.find(
        ({ type }) => type === DRONE_PART_TYPES.frame
    )?.compatibility[0],
    getDrones: () => _store.drones,
    getIsDroneComplete: () => SELECTORS.getAppliedParts().length === Object.keys(DRONE_PARTS).length,
    getIsPartApplied: (partType) => _store.appliedParts.some(({ type }) => type === partType),
    getIsFrameApplied: () => SELECTORS.getIsPartApplied(DRONE_PART_TYPES.frame),
    getSelectedPart: () => _store.selectedPart,
    getTotalPrice: () => _store.appliedParts.reduce((accumulator, { price, quantity }) => {
        return accumulator + (price * quantity);
    }, 0)
};

const _STORE_MODIFIERS = {
    applyPart: (partData) => _store.appliedParts.push(partData),
    clearAppliedParts: () => _store.appliedParts = [],
    clearSelectedPart: () => _store.selectedPart = null,
    setSelectedPart: (partData) => _store.selectedPart = partData
};

const _ACTION_TYPES = {
    partApply: "part-apply",
    partDeselect: "part-deselect",
    partSelect: "part-select",
    partsClear: "parts-clear"
};

const ACTIONS = Object.entries(_ACTION_TYPES).reduce(
    (accumulator, [key, actionId]) => ({
        ...accumulator,
        [key]: new StateManagementEvent(actionId)
    }),
    {}
);

ACTIONS.partApply.subscribe(_STORE_MODIFIERS.applyPart);
ACTIONS.partSelect.subscribe(_STORE_MODIFIERS.setSelectedPart);
ACTIONS.partsClear.subscribe(_STORE_MODIFIERS.clearAppliedParts);

export { ACTIONS, SELECTORS };
