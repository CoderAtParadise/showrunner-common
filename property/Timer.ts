import {
  Settings as TimerValue,
  INVALID_SETTINGS,
  SETTINGS_JSON,
} from "../Timer";
import IJson from "../IJson";
import { registerPropertyJSON } from "./IProperty";

export type TimerProperty = { key: "timer"; value: TimerValue };

export const INVALID: TimerProperty = {
  key: "timer",
  value: INVALID_SETTINGS,
};

const JSON: IJson<TimerProperty> = {
  serialize: (property: TimerProperty): object => {
    return {
      timer: SETTINGS_JSON.serialize(property.value),
    };
  },
  deserialize: (json: any): TimerProperty => {
    return { key: "timer", value: SETTINGS_JSON.deserialize(json) };
  },
};

export default registerPropertyJSON("timer", JSON);
