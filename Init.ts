import registerPropertyDisplay from "./property/Display";
import registerPropertyDisabled from "./property/Disabled";
import registerPropertySave from "./property/Save";
import registerPropertyStartTime from "./property/StartTime";
import registerPropertyTimer from "./property/Timer";
import registerPropertyDirections from "./property/Directions";
import registerPropertyParent from "./property/Parent";
import registerPropertyOn from "./property/directions/On";
import registerPropertyAt from "./property/directions/At";
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
