import Storage, { Type } from "./Storage";
import {
  DirectionsProperty,
  INVALID as INVALID_DIRECTIONS,
} from "./property/Directions";
import {
  DisplayProperty,
  INVALID as INVALID_DISPLAY,
} from "./property/Display";
import {
  StartTimeProperty,
  INVALID as INVALID_STARTTIME,
} from "./property/StartTime";
import { ParentProperty, INVALID as INVALID_PARENT } from "./property/Parent";
import { TimerProperty, INVALID as INVALID_TIMER } from "./property/Timer";
import {
  DisabledProperty,
  INVALID as INVALID_DISABLED,
} from "./property/Disabled";
import { SaveProperty, INVALID as INVALID_SAVE } from "./property/Save";
import IProperty, { getPropertyJSON,hasAllProperties } from "./property/IProperty";
import IJson from "./IJson";
import { IndexListProperty,INVALID as INVALID_INDEX_LIST } from "./property/IndexList";

type SessionProperties = [
  DisplayProperty,
  DisabledProperty,
  SaveProperty,
  StartTimeProperty,
  IndexListProperty,
  TimerProperty,
  DirectionsProperty
];

type BracketProperties = [
  ParentProperty,
  DisplayProperty,
  DisabledProperty,
  IndexListProperty,
  TimerProperty,
  DirectionsProperty
];

type ItemProperties = [
  ParentProperty,
  DisplayProperty,
  DisabledProperty,
  TimerProperty,
  DirectionsProperty
];

export const SessionPropertiesDefault: SessionProperties = [
  INVALID_DISPLAY,
  INVALID_DISABLED,
  INVALID_SAVE,
  INVALID_STARTTIME,
  INVALID_INDEX_LIST,
  INVALID_TIMER,
  INVALID_DIRECTIONS,
];

export const BracketPropertiesDefault: BracketProperties = [
  INVALID_PARENT,
  INVALID_DISPLAY,
  INVALID_DISABLED,
  INVALID_INDEX_LIST,
  INVALID_TIMER,
  INVALID_DIRECTIONS,
];

export const ItemPropertiesDefault: ItemProperties = [
  INVALID_PARENT,
  INVALID_DISPLAY,
  INVALID_DISABLED,
  INVALID_TIMER,
  INVALID_DIRECTIONS,
];

export interface Session extends Storage<SessionProperties> {}

export interface Bracket extends Storage<BracketProperties> {}
export interface Item extends Storage<ItemProperties> {}

export const SESSION_JSON: IJson<Session> = {
  serialize(value: Session): object {
    let obj: object = {
      id: value.id,
      type: value.type as string,
    };
    value.properties.forEach((value) => {
      obj = Object.assign(obj, getPropertyJSON(value.key).serialize(value));
    });
    return obj;
  },
  deserialize(json: any): Session {
    if ((json.type as Type) === Type.SESSION) {
      const props: IProperty<any>[] = [];
      Object.entries(json).forEach((value: [string, any]) => {
        if (value[0] !== "id" && value[0] !== "type") {
          props.push(getPropertyJSON(value[0]).deserialize(value[1]));
        }
      });
      if (hasAllProperties(SessionPropertiesDefault, props))
        return {
          id: json.id,
          type: json.type as Type,
          properties: props as SessionProperties,
        };
    }
    throw {err:`Failed to deserialize ${JSON.stringify(json)} as Session`};
  },
};

export const BRACKET_JSON: IJson<Bracket> = {
  serialize(value: Bracket): object {
    let obj: object = {
      id: value.id,
      type: value.type as string,
    };
    value.properties.forEach((value) => {
      obj = Object.assign(obj, getPropertyJSON(value.key).serialize(value));
    });
    return obj;
  },
  deserialize(json: any): Bracket {
    if ((json.type as Type) === Type.BRACKET) {
      const props: IProperty<any>[] = [];
      Object.entries(json).forEach((value: [string, any]) => {
        if (value[0] !== "id" && value[0] !== "type") {
          props.push(getPropertyJSON(value[0]).deserialize(value[1]));
        }
      });
      if (hasAllProperties(BracketPropertiesDefault, props))
        return {
          id: json.id,
          type: json.type as Type,
          properties: props as BracketProperties,
        };
    }
    throw {err:`Failed to deserialize ${JSON.stringify(json)} as Bracket`};
  },
};

export const ITEM_JSON: IJson<Item> = {
  serialize(value: Item): object {
    let obj: object = {
      id: value.id,
      type: value.type as string,
    };
    value.properties.forEach((value) => {
      obj = Object.assign(obj, getPropertyJSON(value.key).serialize(value));
    });
    return obj;
  },
  deserialize(json: any): Item {
    if ((json.type as Type) === Type.ITEM) {
      const props: IProperty<any>[] = [];
      Object.entries(json).forEach((value: [string, any]) => {
        if (value[0] !== "id" && value[0] !== "type") {
          props.push(getPropertyJSON(value[0]).deserialize(value[1]));
        }
      });
      if (hasAllProperties(ItemPropertiesDefault, props))
        return {
          id: json.id,
          type: json.type as Type,
          properties: props as ItemProperties,
        };
    }
    throw {err:`Failed to deserialize ${JSON.stringify(json)} as Item`};
  },
};
