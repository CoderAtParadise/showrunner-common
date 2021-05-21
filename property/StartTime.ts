import IJson from "../IJson";
import { Point, stringify, parse, INVALID as INVALID_POINT } from "../Time";
import { registerProperty } from "./IProperty";

export type StartTimeProperty = { key: "start_time"; value: Point };

export const INVALID: StartTimeProperty = {
  key: "start_time",
  value: INVALID_POINT,
};

export const JSON: IJson<StartTimeProperty> = {
  serialize: (property: StartTimeProperty): object => {
    return { start_time: stringify(property.value) };
  },
  deserialize: (json: any): StartTimeProperty => {
    return createProperty(parse(json));
  },
};

export function createProperty(value: Point): StartTimeProperty {
  return { key: "start_time", value: value };
}

export default registerProperty("start_time",JSON);