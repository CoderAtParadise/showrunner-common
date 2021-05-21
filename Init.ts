import registerPropertyDisplay from "./property/Display";
import registerPropertyDisabled from "./property/Disabled";
import registerPropertySave from "./property/Save";
import registerPropertyStartTime from "./property/StartTime";
import registerPropertyTimer from "./property/Timer";
import registerPropertyDirections from "./property/Directions";
import registerPropertyParent from "./property/Parent";

export default function init() {
  registerPropertyDisplay;
  registerPropertyDisabled;
  registerPropertySave;
  registerPropertyStartTime;
  registerPropertyTimer;
  registerPropertyDirections;
  registerPropertyParent;
}
