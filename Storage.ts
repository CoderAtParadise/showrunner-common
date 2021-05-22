import IProperty, { INVALID as INVALID_PROPERTY } from "./property/IProperty";
import Show, { getOverrideProperty, hasOverrideProperty } from "./Show";

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
  if (properties.length > required.length)
    properties.splice(required.length, properties.length - required.length);
  return hasRequired;
}

export function hasProperty(storage: Storage<any>, key: string) {
  if (Array.isArray(storage.properties)) {
    return (storage.properties as IProperty<any>[]).some(
      (property: IProperty<any>) => property.key === key
    );
  }
  return false;
}

export function getProperty(
  storage: Storage<any>,
  show: Show,
  key: string
): IProperty<any> | undefined {
  if (hasProperty(storage, key)) {
    if (hasOverrideProperty(show, storage.id, key)) {
      return getOverrideProperty(show, storage.id, key);
    } else
      return (storage.properties as IProperty<any>[]).find(
        (property: IProperty<any>) => property.key === key
      );
  }
  return undefined;
}

export default Storage;
