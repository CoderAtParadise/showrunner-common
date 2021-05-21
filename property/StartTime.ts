import IJson from "../IJson";
import { Point, stringify, parse } from "../Time";

export type StartTimeProperty = { key: "start_time"; value: Point };

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
