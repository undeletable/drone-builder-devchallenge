import { WebComponent } from "../lib/WebComponent.js";
import { ACTIONS, SELECTORS } from "../state/state.js";

const { partApply, partDeselect, partSelect } = ACTIONS;
const { getAvailableParts, getDrones } = SELECTORS;

class PartsPanel extends WebComponent {
    drones = getDrones();

    parts = getAvailableParts();

    imageClassName = "part-image";

    partModelIndexDataKey = "partmodelindex";

    partTypeDataKey = "parttype";

    onConnected() {
        this.shadowRoot.addEventListener("mousedown", (event) => {
            event.preventDefault();
            const eventTarget = this.getEventTarget(event);
            const { dataset } = eventTarget;
            if (dataset[this.partModelIndexDataKey] && dataset[this.partTypeDataKey]) {
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
    }

    // TODO move texts to MESSAGES
    // TODO move images to separate component
    render() {
        return this.mapForRender(Object.entries(this.parts), ([partType, partData]) => {
            const { imagePath: partTypeImagePath, label, models } = partData;
            return `
                <style>
                    .${this.imageClassName} {
                        cursor: grab;
                        width: 100%;
                    }
                </style>
                <div id="test">
                    <h3>${label}</h3>
                    ${this.mapForRender(models, (modelData, index) => {
                        const {
                            imagePath: partModelImagePath, name, price, compatibility
                        } = modelData;
                        const resolvedImagePath = encodeURIComponent(
                            partModelImagePath || partTypeImagePath
                        );
                        return `
                            <figure></figure>
                            <img
                                alt=${name}
                                class=${this.imageClassName}
                                data-${this.partModelIndexDataKey}=${index}
                                data-${this.partTypeDataKey}=${partType}
                                src=${resolvedImagePath}
                            >
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
                        `;
                    })}
                </div>
            `;
        });
    }
}

export { PartsPanel };
