import { DRONE_PART_TYPES } from "../constants/parts.js";
import { WebComponent } from "../lib/WebComponent.js";
import { ACTIONS, SELECTORS } from "../state/state.js";

const { partApply } = ACTIONS;
const { getAppliedParts } = SELECTORS;

class WorkingArea extends WebComponent {
    dropAreaId = "drop-area";

    dropAreaClassName = "drop-area";

    dropAreaActiveClassName = "drop-area-active";

    droneImageAreaClassName = "drone-image";

    partImageClassName = "part-image";

    isWorkingArea = true;

    droneImageWidthPercent = 80;

    layers = [
        {
            partType: DRONE_PART_TYPES.radioModule,
            images: [
                {
                    left: "25%",
                    top: "-4%",
                    width: "50%"
                }
            ]
        },
        {
            partType: DRONE_PART_TYPES.videoAntenna,
            images: [
                {
                    left: "25%",
                    top: "-20%",
                    width: "50%"
                }
            ]
        },
        {
            partType: DRONE_PART_TYPES.frame,
            images: [
                {
                    left: "0",
                    top: "0",
                    width: "100%"
                }
            ]
        },
        {
            partType: DRONE_PART_TYPES.motorWithPropeller,
            images: [
                {
                    left: "-10%",
                    top: "-5%",
                    width: "40%"
                },
                {
                    right: "-8.75%",
                    top: "-5%",
                    width: "40%"
                },
                {
                    bottom: "-14%",
                    right: "-11.5%",
                    transform: "rotate(-30deg)",
                    width: "40%"
                },
                {
                    bottom: "-14%",
                    left: "-11.5%",
                    transform: "rotate(30deg)",
                    width: "40%"
                }
            ]
        },
        {
            partType: DRONE_PART_TYPES.flightController,
            images: [
                {
                    left: "41%",
                    top: "47%",
                    width: "17.5%"
                }
            ]
        },
        {
            partType: DRONE_PART_TYPES.camera,
            images: [
                {
                    bottom: "6%",
                    left: "40%",
                    width: "20%"
                }
            ]
        },
        {
            partType: DRONE_PART_TYPES.battery,
            images: [
                {
                    left: "17.5%",
                    top: "12.5%",
                    width: "65%"
                }
            ]
        }
    ];    

    onConnected() {
        const dropAreaElement = this.getElement(this.dropAreaId);
        dropAreaElement.addEventListener("dragover", event => {
            event.target.classList.add(this.dropAreaActiveClassName);
        });
        dropAreaElement.addEventListener("dragleave", event => {
            event.target.classList.remove(this.dropAreaActiveClassName);
        });
        partApply.subscribe(this.performRender.bind(this));
    }

    render() {
        const appliedParts = getAppliedParts();

        return `
            <style>
                .${this.dropAreaClassName} {
                    align-items: center;
                    border: 1px dashed #000;
                    box-sizing: border-box;
                    display: flex;
                    height: calc(100vh - 100px);
                    justify-content: center;
                    padding: 10%;
                    width: 100%;
                }
                .${this.dropAreaClassName}:hover,
                .${this.dropAreaClassName}.${this.dropAreaActiveClassName} {
                    opacity: 0.8;
                }
                .${this.droneImageAreaClassName} {
                    height: 100%;
                    position: relative;
                    width: 100%;
                }
                .${this.partImageClassName} {
                    position: absolute;
                }
            </style>
            <div class="${this.dropAreaClassName}" id="${this.dropAreaId}">
                <div class="${this.droneImageAreaClassName}">
                    ${this.mapForRender(
                        this.layers,
                        ({ images, partType }) => {
                            const appliedPart = appliedParts.find(({ type }) => type === partType);
                            if (!appliedPart) {
                                return;
                            }
                            const { imagePath, label, name } = appliedPart;
                            return this.mapForRender(
                                images,
                                (imageStyle) => {
                                    console.log(imageStyle)
                                    const imageElement = document.createElement("img");
                                    imageElement.setAttribute("alt", `${label} ${name}`);
                                    imageElement.setAttribute("src", encodeURIComponent(imagePath));
                                    imageElement.classList.add(this.partImageClassName);
                                    Object.entries(imageStyle).forEach(([property, value]) => {
                                        imageElement.style[property] = value;
                                    });
                                    return imageElement.outerHTML;
                                }
                            );
                        }
                    )}
                </div>
            <div>
        `;
    }
}

export { WorkingArea };
