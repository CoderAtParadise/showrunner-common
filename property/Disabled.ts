import IJson from "../IJson";
import { registerProperty } from "./IProperty";

export type DisabledProperty = { key: "disabled"; value: boolean };

export const INVALID: DisabledProperty = {
  key: "disabled",
  value: false,
};

export const JSON: IJson<DisabledProperty> = {
  serialize: (property: DisabledProperty): object => {
    return { disabled: property.value };
  },
  deserialize: (json: any): DisabledProperty => {
    return createProperty(json as boolean);
  },
};

export function createProperty(value: boolean): DisabledProperty {
  return { key: "disabled", value: value };
}

export default registerProperty("disabled",JSON);
