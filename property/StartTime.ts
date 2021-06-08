import IJson from "../IJson";
import { TimePoint, stringify, parse, INVALID as INVALID_POINT } from "../TimePoint";
import { registerPropertyJSON } from "./IProperty";

export type StartTimeProperty = { key: "start_time"; value: TimePoint };

export const INVALID: StartTimeProperty = {
  key: "start_time",
  value: INVALID_POINT,
};

const JSON: IJson<StartTimeProperty> = {
  serialize: (property: StartTimeProperty): object => {
    return { start_time: stringify(property.value) };
  },
  deserialize: (json: any): StartTimeProperty => {
    return { key: "start_time", value: parse(json) };
  },
};

export default registerPropertyJSON("start_time",JSON);