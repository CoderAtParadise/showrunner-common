import IJson from "./IJson";
import { Show, SHOW_JSON } from "./Show";
import StagePlot from "./stageplot/StagePlot";
import Storage, { Type } from "./Storage";
import {
  Bracket,
  BRACKET_JSON,
  Item,
  ITEM_JSON,
  Session,
  SESSION_JSON,
} from "./StorageTypes";

export interface Runsheet {
  version: number;
  id: string;
  display: string;
  shows: Map<string, Show>;
  index: string[];
  stageplots: Map<string,StagePlot>;
  defaults: Map<string, Storage<any>>;
}

export const INVALID : Runsheet =  {
  version: -1,
  id: "",
  display: "",
  shows:new Map<string,Show>(),
  index: [],
  stageplots: new Map<string,StagePlot>(),
  defaults: new Map<string,Storage<any>>()
}

export const JSON: IJson<Runsheet> = {
  serialize: (value: Runsheet): object => {
    const shows: object[] = [];
    value.shows.forEach((show: Show) => {
      const obj = SHOW_JSON.serialize(show);
      (obj as { index: number }).index = value.index.indexOf(show.id);
      shows.push(obj);
    });
    const defaults: object[] = [];
    value.defaults.forEach((value: Storage<any>) => {
      switch (value.type) {
        case Type.SESSION:
          defaults.push(SESSION_JSON.serialize(value as Session));
          break;
        case Type.BRACKET:
          defaults.push(BRACKET_JSON.serialize(value as Bracket));
          break;
        case Type.ITEM:
          defaults.push(ITEM_JSON.serialize(value as Item));
      }
    });
    return {
      version: value.version,
      id: value.id,
      display: value.display,
      shows: shows,
      defaults: defaults,
    };
  },
  deserialize: (json: any): Runsheet => {
    const shows: Map<string, Show> = new Map<string, Show>();
    const defaults: Map<string, Storage<any>> = new Map<string, Storage<any>>();
    const index: string[] = [];
    (json.shows as object[]).forEach((value: any) => {
      index[value.index] = value.id;
      shows.set(value.id, SHOW_JSON.deserialize(value));
    });

    (json.defaults as object[]).forEach((value: any) => {
      switch (value.type as Type) {
        case Type.SESSION:
          defaults.set(value.id, SESSION_JSON.deserialize(value));
          break;
        case Type.BRACKET:
          defaults.set(value.id, BRACKET_JSON.deserialize(value));
          break;
        case Type.ITEM:
          defaults.set(value.id, ITEM_JSON.deserialize(value));
          break;
      }
    });

    return {
      version: json.version,
      id: json.id,
      display: json.display,
      index: index,
      shows: shows,
      stageplots: new Map<string,StagePlot>(),
      defaults: defaults,
    };
  },
};

export default Runsheet;
