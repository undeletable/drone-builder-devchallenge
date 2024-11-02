import { WebComponent } from "../lib/WebComponent.js";
import { SELECTORS } from "../state/store.js";

const { getAllParts, getDrones } = SELECTORS;

class PartsPanel extends WebComponent {
    drones = getDrones();

    parts = getAllParts();

    imageClassName = "part-image";

    // TODO move texts to MESSAGES
    // TODO move images to separate component
    render() {
        return this.mapForRender(Object.entries(this.parts), ([, partData]) => {
            const { imagePath: partTypeImagePath, label, models } = partData;
            return `
                <style>
                    .${this.imageClassName} {
                        width: 100%;
                    }
                </style>
                <div>
                    <h3>${label}</h3>
                    ${this.mapForRender(models, (modelData) => {
                        const { imagePath: partModelImagePath, name, price, compatibility } = modelData;
                        const resolvedImagePath = encodeURIComponent(partModelImagePath || partTypeImagePath);
                        return `
                            <figure></figure>
                            <img alt=${name} class=${this.imageClassName} src=${resolvedImagePath}>
                            <figcaption>
                                <span>${name}</span>
                                <dl>
                                    <dt>Price</dt>
                                    <dd>$${price}</dd>
                                    <dt>Compatible with</dt>
                                    <dd>${this.mapForRender(compatibility, (droneType) => droneType)}</dd>
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
