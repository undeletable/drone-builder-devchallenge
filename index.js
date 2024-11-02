import { PartsPanel } from "./components/PartsPanel.js";
import { WorkingArea } from "./components/WorkingArea.js";
import { defineComponent } from "./lib/WebComponent.js";
import { addGlobalStyles } from "./styles/global.js";

addGlobalStyles();

defineComponent("parts-panel", PartsPanel);
defineComponent("working-area", WorkingArea);
