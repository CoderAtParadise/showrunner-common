import IJson from "../../IJson";
import { SMPTE,INVALID as INVALID_SMPTE } from "../../SMPTE";
import { registerPropertyJSON } from "./IProperty";

export type StartTimeProperty = { key: "start_time"; value: SMPTE; canOverride: boolean; };

export const INVALID: StartTimeProperty = {
  key: "start_time",
  value: INVALID_SMPTE,
  canOverride: true,
};

const JSON: IJson<StartTimeProperty> = {
  serialize: (property: StartTimeProperty): object => {
    return { start_time: property.value.toString() };
  },
  deserialize: (json: any): StartTimeProperty => {
    return { key: "start_time", value: new SMPTE(json),canOverride:true };
  },
};

export default registerPropertyJSON("start_time",JSON);