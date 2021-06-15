import IJson from "./IJson";
import { IndexListProperty } from "./property/IndexList";
import IProperty, { getPropertyJSON } from "./property/IProperty";
import Storage, { getDefaultProperty } from "./Storage";

export interface Show {
  id: string;
  tracking_list: string[];
  overrides: Map<string, IProperty<any>[]>;
}

export function hasOverrideProperty(
  show: Show,
  id: string,
  key: string
): boolean {
  if (!show.overrides.has(id) || show.tracking_list.indexOf(id) === -1)
    return false;
  const properties = show.overrides.get(id);
  if (properties)
    return properties.some((value: IProperty<any>) => value.key === key);
  return false;
}

export function getOverrideProperty(
  show: Show,
  id: string,
  key: string
): IProperty<any> | undefined {
  const properties = show.overrides.get(id);
  if (properties)
    return properties.find((value: IProperty<any>) => value.key === key);
  return undefined;
}

export function insertInto(
  show: Show,
  parent: Storage<any>,
  after: string,
  insert: string,
  setDefault: boolean = false
): void {
  if (setDefault) {
    const children = getDefaultProperty(
      parent,
      "index_list"
    ) as IndexListProperty;
    if (children) {
      const cindex = children.value.indexOf(insert);
      if (cindex !== -1) {
        children.value.splice(cindex, 1);
      }
      let index = children.value.indexOf(after);
      if (index === -1) index = children.value.length;
      children.value.splice(index, 0, insert);
    }
  } else {
    if (hasOverrideProperty(show, parent.id, "index_list")) {
      const children = getOverrideProperty(
        show,
        parent.id,
        "index_list"
      ) as IndexListProperty;
      if (children) {
        const cindex = children.value.indexOf(insert);
        if (cindex !== -1) {
          children.value.splice(cindex, 1);
        }
        let index = children.value.indexOf(after);
        if (index === -1) index = children.value.length;
        children.value.splice(index + 1, 0, insert);
      }
    } else if(after !== "") {
      const children = JSON.parse(
        JSON.stringify(
          getDefaultProperty(parent, "index_list") as IndexListProperty
        )
      );
      if (children) {
        const cindex = children.value.indexOf(insert);
        if (cindex !== -1) {
          children.value.splice(cindex, 1);
        }
        let index = children.value.indexOf(after);
        if (index === -1) index = children.value.length;
        children.value.splice(index + 1, 0, insert);
      }
      setOverrideProperty(show, parent.id, children);
    }
  }
}

export function setOverrideProperty(
  show: Show,
  id: string,
  property: IProperty<any>
): void {
  if (show.tracking_list.indexOf(id) !== -1) {
    if (hasOverrideProperty(show, id, property.key)) {
      const overrides = getOverrideProperty(show, id, property.key);
      if (overrides) {
        overrides.value = property.value;
      }
    } else if (show.overrides.has(id)) {
      const overrides = show.overrides.get(id);
      if (overrides) overrides.push(property);
    } else {
      show.overrides.set(id, [property]);
    }
  }
}

export function deleteOverrideProperty(
  show: Show,
  id: string,
  key: string
): void {
  const properties = show.overrides.get(id);
  if (properties) {
    let index: number = -1;
    properties.some((value: IProperty<any>, i: number) => {
      if (value.key === key) index = i;
      return true;
    });
    properties.splice(index, 1);
  }
}

export function deleteOverrideProperties(show:Show,id:string) : void {
  show.overrides.delete(id);
}

export const DEFAULT = {
  id: "default",
  tracking_list: [],
  overrides: new Map<string, IProperty<any>[]>(),
};

export const SHOW_JSON: IJson<Show> = {
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
