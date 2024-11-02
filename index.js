import { PartsPanel } from "./components/PartsPanel.js";
import { WorkingArea } from "./components/WorkingArea.js";
import { defineComponent } from "./lib/WebComponent.js";

addGlobalStyles();

defineComponent("parts-panel", PartsPanel);
defineComponent("working-area", WorkingArea);
