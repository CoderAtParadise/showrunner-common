/* eslint-disable */
import registerPropertyDisplay from "./src/property/Display";
import registerPropertyDisabled from "./src/property/Disabled";
import registerPropertySave from "./src/property/Save";
import registerPropertyStartTime from "./src/property/StartTime";
import registerPropertyTimer from "./src/property/Timer";
import registerPropertyDirections from "./src/property/Directions";
import registerPropertyParent from "./src/property/Parent";
import registerPropertyOn from "./src/property/directions/On";
import registerPropertyAt from "./src/property/directions/At";
import registerDirectionCommands from "./DirectionTypes";

export default function init() {
  registerPropertyDisplay;
  registerPropertyDisabled;
  registerPropertySave;
  registerPropertyStartTime;
  registerPropertyTimer;
  registerPropertyDirections;
  registerPropertyParent;
  registerPropertyOn;
  registerPropertyAt;
  registerDirectionCommands;
}
