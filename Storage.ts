import IProperty from "./property/IProperty";
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

export function hasProperty(storage: Storage<any>, key: string) {
  if (Array.isArray(storage.properties)) {
    return (storage.properties as IProperty<any>[]).some(
      (property: IProperty<any>) => property.key === key
    );
  }
  return false;
}

export function getDefaultProperty(storage: Storage<any>, key: string): IProperty<any> | undefined {
  if (hasProperty(storage, key)) {
    return (storage.properties as IProperty<any>[]).find(
      (property: IProperty<any>) => property.key === key
    );
  }
  return undefined
}

export function setDefaultProperty(storage: Storage<any>, property: IProperty<any>): void {
  const def = getDefaultProperty(storage, property.key);
  if (def)
    def.value = property.value;
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
      return getDefaultProperty(storage, key);
  }
  return undefined;
}

export default Storage;
