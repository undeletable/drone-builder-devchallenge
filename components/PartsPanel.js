import { DRONE_PART_TYPES } from "../constants/parts.js";
import { WebComponent } from "../lib/WebComponent.js";
import { ACTIONS, SELECTORS } from "../state/state.js";

const { partApply, partDeselect, partSelect } = ACTIONS;
const { getAvailableParts, getCurrentDroneType, getDrones, getIsFrameApplied, getIsPartApplied } = SELECTORS;

class PartsPanel extends WebComponent {
    drones = getDrones();

    parts = getAvailableParts();

    imageClassName = "part-image";

    disabledModelClassName = "disabled";

    partDisabledDataKey = "partdisabled";

    partModelIndexDataKey = "partmodelindex";

    partTypeDataKey = "parttype";

    onConnected() {
        // TODO change cursor CSS property value to grabbing for the whole page while dragging
        this.shadowRoot.addEventListener("mousedown", (event) => {
            event.preventDefault();
            const eventTarget = this.getEventTarget(event);
            const { dataset } = eventTarget;
            if (
                dataset[this.partDisabledDataKey] !== "true"
                && dataset[this.partModelIndexDataKey]
                && dataset[this.partTypeDataKey]
            ) {
                const { models, ...typeData } = this.parts[dataset[this.partTypeDataKey]];
                const modelData = models[dataset[this.partModelIndexDataKey]];
                const partData = {
                    type: dataset[this.partTypeDataKey],
                    ...typeData,
                    ...modelData
                };
                partSelect.dispatch(partData);
                const onMouseMove = (event) => {
                    event.preventDefault();
                };
                const onMouseUp = (event) => {
                    event.preventDefault();
                    if (event.target.isWorkingArea) {
                        partApply.dispatch(partData);
                    }
                    partDeselect.dispatch();
                    document.removeEventListener("mousemove", onMouseMove);
                    document.removeEventListener("mouseup", onMouseUp);
                };
                document.addEventListener("mousemove", onMouseMove);
                document.addEventListener("mouseup", onMouseUp);
            }
        });
        partApply.subscribe(this.performRender.bind(this));
    }

    // TODO move texts to MESSAGES
    // TODO move images to separate component
    render() {
        const currentDroneType = getCurrentDroneType();
        return `
            <style>
                .${this.imageClassName} {
                    cursor: grab;
                    width: 100%;
                }
                .${this.disabledModelClassName},
                .${this.disabledModelClassName} .${this.imageClassName} {
                    cursor: not-allowed;
                }
                .${this.disabledModelClassName} {
                    opacity: 0.5;
                }
            </style>
            <h2>Select parts for drone</h2>
            <div>Start from frame</div>
            ${this.mapForRender(Object.entries(this.parts), ([partType, partData]) => {
                const isPartDisabled = getIsPartApplied(partType)
                    || (!getIsFrameApplied() && partType !== DRONE_PART_TYPES.frame);
                const { imagePath: partTypeImagePath, label, models } = partData;
                return `
                    <div${isPartDisabled ? ` class="${this.disabledModelClassName}"`: ""}>
                        <h3>${label}</h3>
                        ${this.mapForRender(models, (modelData, index) => {
                            const {
                                imagePath: partModelImagePath, name, price, compatibility
                            } = modelData;
                            const isModelDisabled = isPartDisabled
                                || (!!currentDroneType && !compatibility.includes(currentDroneType));
                            const resolvedImagePath = encodeURIComponent(
                                partModelImagePath || partTypeImagePath
                            );
                            return `
                                <figure${isModelDisabled ? ` class="${this.disabledModelClassName}"`: ""}>
                                    <img
                                        alt="${name}"
                                        class="${this.imageClassName}"
                                        data-${this.partDisabledDataKey}="${
                                            isModelDisabled.toString()
                                        }"
                                        data-${this.partModelIndexDataKey}="${index}"
                                        data-${this.partTypeDataKey}="${partType}"
                                        src="${resolvedImagePath}"
                                    />
                                    <figcaption>
                                        <span>${name}</span>
                                        <dl>
                                            <dt>Price</dt>
                                            <dd>$${price}</dd>
                                            <dt>Compatible with</dt>
                                            <dd>
                                                ${this.mapForRender(
                                                    compatibility,
                                                    (droneType) => droneType
                                                )}
                                            </dd>
                                        </dl>
                                    </figcaption>
                                </figure>
                            `;
                        })}
                    </div>
                `;
            })}
        `;
    }
}

export { PartsPanel };
