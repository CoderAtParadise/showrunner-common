import IJson from "../../IJson";
import { registerPropertyJSON } from "./IProperty";

export type DisabledProperty = { key: "disabled"; value: boolean;canOverride: boolean; };

export const INVALID: DisabledProperty = {
  key: "disabled",
  value: false,
  canOverride: true,
};

const JSON: IJson<DisabledProperty> = {
  serialize: (property: DisabledProperty): object => {
    return { disabled: property.value };
  },
  deserialize: (json: any): DisabledProperty => {
    return { key: "disabled", value: json as boolean ,canOverride:true};
  },
};

export default registerPropertyJSON("disabled",JSON);
