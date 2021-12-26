import IJson from "../../IJson";
import { registerPropertyJSON } from "./IProperty";

export type SaveProperty = { key: "save"; value: boolean;canOverride: boolean; };

export const INVALID: SaveProperty = {
  key: "save",
  value: false,
  canOverride: false,
};

const JSON: IJson<SaveProperty> = {
  serialize: (property: SaveProperty): object => {
    return { save: property.value };
  },
  deserialize: (json: any): SaveProperty => {
    return { key: "save", value: json as boolean,canOverride:false };
  },
};

export default registerPropertyJSON("save",JSON);