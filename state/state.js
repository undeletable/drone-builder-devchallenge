import { DRONE_PARTS, DRONES } from "../constants/parts.js";
import { StateManagementEvent } from "../lib/StateManagementEvent.js";

const _store = {
    appliedParts: [],
    availableParts: DRONE_PARTS,
    drones: DRONES,
    selectedPart: null
};

const SELECTORS = {
    getAppliedParts: () => _store.appliedParts,
    getAvailableParts: () => _store.availableParts,
    getDrones: () => _store.drones,
    getSelectedPart: () => _store.selectedPart
};

const _STORE_MODIFIERS = {
    applyPart: (partData) => _store.appliedParts.push(partData),
    clearSelectedPart: () => _store.selectedPart = null,
    setSelectedPart: (partData) => _store.selectedPart = partData
};

const _ACTION_TYPES = {
    partApply: "part-apply",
    partDeselect: "part-deselect",
    partSelect: "part-select",
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

export { ACTIONS, SELECTORS };
