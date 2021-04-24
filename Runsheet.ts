import IJson from "./IJson";
import { Storage, Nested, Type } from "./Storage";
import { SessionStorage, JSON as SJSON } from "./Session";

export interface Role {
  role: string;
  display: string;
}

export interface RunsheetStorage extends Nested {
  version: number;
  team: Map<string, Role>;
}

export const INVALID: RunsheetStorage = {
  version: -1,
  team: new Map<string, Role>(),
  nestedType: Type.SESSION,
  nested: new Map<string,SessionStorage>(),
  index : [],
};

export const JSON: IJson<RunsheetStorage> = {
  serialize(value: RunsheetStorage): object {
    const obj: {
      version: number;
      team: { key: string; role: string; display: string }[];
      sessions: object[];
    } = {
      version: 1,
      team: [],
      sessions: [],
    };
    value.team.forEach((value: Role, key: string) =>
      obj.team.push({ key: key, role: value.role, display: value.display })
    );
    value.nested.forEach((value: Storage) =>
    {
      let json = SJSON.serialize(value as SessionStorage);
      json['index'] = (value as unknown as Nested).index.indexOf(value.tracking);
      obj.sessions.push(json);
    });
    return obj;
  },

  deserialize(json: object): RunsheetStorage {
    const value = json as {
      version: number;
      team: { key: string; role: string; display: string }[];
      sessions: object[];
      index: string[];
    };
    const sessions: Map<string,SessionStorage> = new Map<string,SessionStorage>();
    const team: Map<string, Role> = new Map<string, Role>();
    const index: string[] = [];
    value.team.forEach((json: { key: string; role: string; display: string }) =>
      team.set(json.key, { role: json.role, display: json.display })
    );
    value.sessions.forEach((json: object) =>
    {
      let session = SJSON.deserialize(json);
      index[(json as {index: number}).index] = session.tracking;
      sessions.set(session.tracking,session);
    });
    return {
      version: value.version,
      team: team,
      nestedType: Type.SESSION,
      nested: sessions,
      index: index,
    };
  },
};
