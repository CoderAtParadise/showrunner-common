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

export const json: IJson<RunsheetStorage> = {
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
      obj.sessions.push(SJSON.serialize(value as SessionStorage))
    );
    return obj;
  },

  deserialize(json: object): RunsheetStorage {
    const value = json as {
      version: number;
      team: { key: string; role: string; display: string }[];
      sessions: object[];
    };
    const sessions: Storage[] = [];
    const team: Map<string, Role> = new Map<string, Role>();
    value.team.forEach((json: { key: string; role: string; display: string }) =>
      team.set(json.key, { role: json.role, display: json.display })
    );
    value.sessions.forEach((json: object) =>
      sessions.push(SJSON.deserialize(json))
    );
    return {
      version: value.version,
      team: team,
      nestedType: Type.SESSION,
      nested: sessions,
    };
  },
};
