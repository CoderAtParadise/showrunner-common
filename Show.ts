import debug from "debug";
import IJson from "./IJson";
import IProperty, { getProperty } from "./property/IProperty";

export interface Show {
  id: string;
  tracking_list: string[];
  overrides: Map<string, IProperty<any>[]>;
}

export const JSON: IJson<Show> = {
  serialize: (value: Show): object => {
    const overrides: object[] = [];
    value.overrides.forEach((value: IProperty<any>[], key: string) => {
      value.forEach((property: IProperty<any>) =>
        overrides.push(
          Object.assign(
            { id: key },
            getProperty(property.key).serialize(property)
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
              ?.push(getProperty(key).deserialize(value[key]));
          } else {
            overrides.set(value.id, [getProperty(key).deserialize(value[key])]);
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
