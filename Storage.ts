import IProperty, { INVALID as INVALID_PROPERTY } from "./property/IProperty";

export enum Type {
  INVALID = "INVALID",
  SESSION = "SESSION",
  BRACKET = "BRACKET",
  ITEM = "ITEM",
}

export interface Storage<Properties extends IProperty<any>[]> {
  id: string;
  type: Type;
  properties: Properties;
}

export const INVALID: Storage<undefined> = {
  id: "",
  type: Type.INVALID,
  properties: undefined,
};

export function hasProperty(storage: Storage<any>, key: string) {
  if (Array.isArray(storage.properties)) {
    (storage.properties as IProperty<any>[]).forEach(
      (property: IProperty<any>) => {
        if (property.key === key) return true;
      }
    );
  }
  return false;
}

export function getProperty(
  storage: Storage<any>,
  key: string
): IProperty<any> {
  if (hasProperty(storage, key)) {
    (storage.properties as IProperty<any>[]).forEach(
      (property: IProperty<any>) => {
        if (property.key === key) return property;
      }
    );
  }
  return INVALID_PROPERTY;
}

export default Storage;
