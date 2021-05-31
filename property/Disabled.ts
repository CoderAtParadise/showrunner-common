import IJson from "../IJson";
import { registerPropertyJSON } from "./IProperty";

export type DisabledProperty = { key: "disabled"; value: boolean };

export const INVALID: DisabledProperty = {
  key: "disabled",
  value: false,
};

const JSON: IJson<DisabledProperty> = {
  serialize: (property: DisabledProperty): object => {
    return { disabled: property.value };
  },
  deserialize: (json: any): DisabledProperty => {
    return { key: "disabled", value: json as boolean };
  },
};

export default registerPropertyJSON("disabled",JSON);
