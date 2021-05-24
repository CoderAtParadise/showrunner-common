import IJson from "./IJson";
import IProperty, { getPropertyJSON } from "./property/IProperty";
import Runsheet from "./Runsheet";
import Storage, { Type, getProperty, hasProperty } from "./Storage";
import { ParentProperty } from "./property/Parent";

export interface Show {
  id: string;
  tracking_list: string[];
  overrides: Map<string, IProperty<any>[]>;
}

export function getAllSessions(runsheet: Runsheet, show: Show): Storage<any>[] {
  const sessions: Storage<any>[] = [];
  show.tracking_list.forEach((id: string) => {
    const storage = runsheet.defaults.get(id);
    if (storage) {
      if (storage.type === Type.SESSION) sessions.push(storage);
    }
  });
  return sessions;
}

export function hasOverrideProperty(
  show: Show,
  id: string,
  key: string
): boolean {
  if (!show.overrides.has(id)) return false;
  const properties = show.overrides.get(id);
  if (properties) {
    return properties.some((value: IProperty<any>) => value.key === key);
  }
  return false;
}

export function getOverrideProperty(
  show: Show,
  id: string,
  key: string
): IProperty<any> | undefined {
  const properties = show.overrides.get(id);
  if (properties) {
    return properties.find((value: IProperty<any>) => value.key === key);
  }
  return undefined;
}

export const JSON: IJson<Show> = {
  serialize: (value: Show): object => {
    const overrides: object[] = [];
    value.overrides.forEach((properties: IProperty<any>[], key: string) => {
      properties.forEach((property: IProperty<any>) =>
        overrides.push(
          Object.assign(
            { id: key },
            getPropertyJSON(property.key).serialize(property)
          )
        )
      );
    });
    return {
      id: value.id,
      tracking_list: value.tracking_list,
      overrides: overrides,
    };
  },
  deserialize: (json: any): Show => {
    const overrides: Map<string, IProperty<any>[]> = new Map<
      string,
      IProperty<any>[]
    >();
    (json.overrides as object[]).forEach((value: any) => {
      Object.keys(value).forEach((key: string) => {
        if (key !== "id") {
          if (overrides.has(value.id)) {
            overrides
              .get(value.id)
              ?.push(getPropertyJSON(key).deserialize(value[key]));
          } else {
            overrides.set(value.id, [
              getPropertyJSON(key).deserialize(value[key]),
            ]);
          }
        }
      });
    });
    return {
      id: json.id,
      tracking_list: json.tracking_list,
      overrides: overrides,
    };
  },
};

export default Show;
