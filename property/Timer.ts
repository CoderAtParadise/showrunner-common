import {
  Settings as TimerValue,
  Type,
  Behaviour,
  INVALID_SETTINGS,
} from "../Timer";
import { parse, stringify } from "../Time";
import IJson from "../IJson";
import { registerProperty } from "./IProperty";

export type TimerProperty = { key: "timer"; value: TimerValue };

export const INVALID: TimerProperty = {
  key: "timer",
  value: INVALID_SETTINGS,
};

export const JSON: IJson<TimerProperty> = {
  serialize: (property: TimerProperty): object => {
    return {
      timer: {
        type: property.value.type as string,
        source: property.value.source,
        behvaiour: property.value.behaviour as string,
        duration: stringify(property.value.duration),
      },
    };
  },
  deserialize: (json: any): TimerProperty => {
    return createProperty({
      type: json.type as Type,
      source: json.source,
      behaviour: json.behaviour as Behaviour,
      duration: parse(json.duration),
    });
  },
};

export function createProperty(value: TimerValue): TimerProperty {
  return { key: "timer", value: value };
}

export default registerProperty("timer",JSON);
