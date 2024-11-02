import { DRONE_PART_TYPES } from "../constants/parts.js";
import { WebComponent } from "../lib/WebComponent.js";
import { ACTIONS, SELECTORS } from "../state/state.js";

const { partApply, partDeselect, partSelect, partsClear } = ACTIONS;
const {
    getAvailableParts, getCurrentDroneType, getDrones, getHasAppliedParts, getIsFrameApplied,
    getIsPartApplied
} = SELECTORS;

class PartsPanel extends WebComponent {
    drones = getDrones();

    parts = getAvailableParts();

    imageClassName = "part-image";

    disabledModelClassName = "disabled";

    partDisabledDataKey = "partdisabled";

    partModelIndexDataKey = "partmodelindex";

    partTypeDataKey = "parttype";

    clearButtonClassname = "clear-button";

    clearButtonId = "clear-button";

    figureClassName = "part-figure";

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
        this.shadowRoot.addEventListener("click", (event) => {
            const { id } = this.getEventTarget(event);
            if (id === this.clearButtonId) {
                partsClear.dispatch();
            }
        });
        partApply.subscribe(this.performRender.bind(this));
        partsClear.subscribe(this.performRender.bind(this));
    }

    // TODO move texts to MESSAGES
    // TODO move images to separate component
    render() {
        const currentDroneType = getCurrentDroneType();
        const hasAppliedParts = getHasAppliedParts();
        console.log(currentDroneType, hasAppliedParts)
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
                .${this.clearButtonClassname} {
                    background-color: #FF0000;
                    border: none;
                    color: #FFFFFF;
                    cursor: pointer;
                    padding: 5px;
                    width: 100%;
                }
                .${this.clearButtonClassname}:hover {
                    opacity: 0.8;
                }
                .${this.figureClassName} {
                    border-bottom: 1px solid #000;
                    margin: 0;
                }
            </style>
            <h2>Select parts for drone</h2>
            ${hasAppliedParts
                ? `
                    <button class="${this.clearButtonClassname}" id="${this.clearButtonId}">
                        Clear selected parts
                    </button>
                `
                : "<div>Select frame first</div>"}
            ${this.mapForRender(Object.entries(this.parts), ([partType, partData]) => {
                const isPartAlreadyApplied = getIsPartApplied(partType);
                const isFrameNotSelected = !getIsFrameApplied() && partType !== DRONE_PART_TYPES.frame;
                const isPartDisabled = isPartAlreadyApplied || isFrameNotSelected;
                const { imagePath: partTypeImagePath, label, models } = partData;
                return `
                    <div${isPartDisabled ? ` class="${this.disabledModelClassName}"`: ""}>
                        <h3>${label}</h3>
                        ${isPartAlreadyApplied
                            ? "<div>This part is already applied</div>"
                            : ""}
                        ${isFrameNotSelected
                            ? "<div>Select frame first</div>"
                            : ""}
                        ${this.mapForRender(models, (modelData, index) => {
                            const {
                                imagePath: partModelImagePath, name, price, compatibility
                            } = modelData;
                            const isModelIncompatibleWithFrame = !!currentDroneType
                                && !compatibility.includes(currentDroneType)
                            const isModelDisabled = isPartDisabled || isModelIncompatibleWithFrame;
                            const resolvedImagePath = encodeURIComponent(
                                partModelImagePath || partTypeImagePath
                            );
                            return `
                                <figure
                                    class="${this.figureClassName}${isModelDisabled
                                        ? ` ${this.disabledModelClassName}`
                                        : ""
                                    }"
                                >
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
                                        <div>
                                            ${isModelIncompatibleWithFrame
                                                ? "<div>This model is incompatible with selected frame</div>"
                                                : ""}
                                        </div>
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
