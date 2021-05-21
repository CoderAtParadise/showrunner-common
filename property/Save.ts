import IJson from "../IJson";
import { registerProperty } from "./IProperty";

export type SaveProperty = { key: "save"; value: boolean };

export const INVALID: SaveProperty = {
  key: "save",
  value: false,
};

export const JSON: IJson<SaveProperty> = {
  serialize: (property: SaveProperty): object => {
    return { save: property.value };
  },
  deserialize: (json: any): SaveProperty => {
    return createProperty(json as boolean);
  },
};

export function createProperty(value: boolean): SaveProperty {
  return { key: "save", value: value };
}

export default registerProperty("save",JSON);