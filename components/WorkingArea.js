import { WebComponent } from "../lib/WebComponent.js";

/* TODO image layers order, from bottom to top:
    radio module
    video antenna
    frame
    motor, controller
    camera
    battery
*/

class WorkingArea extends WebComponent {
    dropAreaId = "drop-area";

    dropAreaClassName = "drop-area";

    dropAreaActiveClassName = "drop-area-active";

    isWorkingArea = true;

    onConnected() {
        const dragNDropAreaElement = this.getElement(this.dropAreaId);
        dragNDropAreaElement.addEventListener("dragover", event => {
            event.target.classList.add(this.dropAreaActiveClassName);
        });
        dragNDropAreaElement.addEventListener("dragleave", event => {
            event.target.classList.remove(this.dropAreaActiveClassName);
        }); 
    }

    render() {
        return `
            <style>
                .${this.dropAreaClassName} {
                    background-color: red;
                    height: calc(100vh - 100px);
                    width: 100%;
                }
            </style>
            <div class=${this.dropAreaClassName} id=${this.dropAreaId}><div>
        `;
    }
}

export { WorkingArea };
