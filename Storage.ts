import IProperty, { INVALID as INVALID_PROPERTY } from "./property/IProperty";

export enum Type {
  INVALID = "invalid",
  SESSION = "session",
  BRACKET = "bracket",
  ITEM = "item",
}

export interface Storage<Properties extends IProperty<any>[]> {
  id: string;
  type: Type;
  properties: Properties;
}

export const INVALID: Storage<any> = {
  id: "",
  type: Type.INVALID,
  properties: undefined,
};

export function checkProperties<Required extends IProperty<any>[]>(
  required: Required,
  properties: IProperty<any>[]
): properties is Required {
  if (properties.length < required.length) return false;
  const hasRequired = required.every((value: IProperty<any>, index: number) => {
    if (properties[index].key === value.key) return true;
  });
  //cleanup and remove any additional properties
  if(properties.length > required.length)
    properties.splice(required.length, properties.length - required.length);
  return hasRequired;
}

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
