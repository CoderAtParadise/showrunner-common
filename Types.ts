import Storage, { checkProperties, Type } from "./Storage";
import registerPropertyDirections, {
  DirectionsProperty,
  INVALID as INVALID_DIRECTIONS,
} from "./property/Directions";
import registerPropertyDisplay, {
  DisplayProperty,
  INVALID as INVALID_DISPLAY,
} from "./property/Display";
import registerPropertyStartTime, {
  StartTimeProperty,
  INVALID as INVALID_STARTTIME,
} from "./property/StartTime";
import registerPropertyParent, {
  ParentProperty,
  INVALID as INVALID_PARENT,
} from "./property/Parent";
import registerPropertyTimer, {
  TimerProperty,
  INVALID as INVALID_TIMER,
} from "./property/Timer";
import registerPropertyDisabled, {
  DisabledProperty,
  INVALID as INVALID_DISABLED,
} from "./property/Disabled";
import registerPropertySave, {
  SaveProperty,
  INVALID as INVALID_SAVE,
} from "./property/Save";
import IProperty, { getProperty } from "./property/IProperty";
import IJson from "./IJson";

//Call the register Functions For Properties
registerPropertyDisplay;
registerPropertyDisabled;
registerPropertySave;
registerPropertyStartTime;
registerPropertyTimer;
registerPropertyDirections;
registerPropertyParent;

type SessionProperties = [
  DisplayProperty,
  DisabledProperty,
  SaveProperty,
  StartTimeProperty,
  TimerProperty,
  DirectionsProperty
];

type BracketProperties = [
  ParentProperty,
  DisplayProperty,
  DisabledProperty,
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

const SessionPropertiesDefault: SessionProperties = [
  INVALID_DISPLAY,
  INVALID_DISABLED,
  INVALID_SAVE,
  INVALID_STARTTIME,
  INVALID_TIMER,
  INVALID_DIRECTIONS,
];

const BracketPropertiesDefault: BracketProperties = [
  INVALID_PARENT,
  INVALID_DISPLAY,
  INVALID_DISABLED,
  INVALID_TIMER,
  INVALID_DIRECTIONS,
];

const ItemPropertiesDefault: ItemProperties = [
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
      obj = Object.assign(obj, getProperty(value.key).serialize(value));
    });
    return obj;
  },
  deserialize(json: any): Session {
    if ((json.type as Type) === Type.SESSION) {
      const props: IProperty<any>[] = [];
      Object.entries(json).forEach((value: [string, any]) => {
        if (value[0] !== "id" && value[0] !== "type") {
          props.push(getProperty(value[0]).deserialize(value[1]));
        }
      });
      if (checkProperties(SessionPropertiesDefault, props))
        return {
          id: json.id,
          type: json.type as Type,
          properties: props as SessionProperties,
        };
    }
    throw `Failed to deserialize ${JSON.stringify(json)} as Bracket`;
  },
};

export const BRACKET_JSON: IJson<Bracket> = {
  serialize(value: Bracket): object {
    let obj: object = {
      id: value.id,
      type: value.type as string,
    };
    value.properties.forEach((value) => {
      obj = Object.assign(obj, getProperty(value.key).serialize(value));
    });
    return obj;
  },
  deserialize(json: any): Bracket {
    if ((json.type as Type) === Type.BRACKET) {
      const props: IProperty<any>[] = [];
      Object.entries(json).forEach((value: [string, any]) => {
        if (value[0] !== "id" && value[0] !== "type") {
          props.push(getProperty(value[0]).deserialize(value[1]));
        }
      });
      if (checkProperties(BracketPropertiesDefault, props))
        return {
          id: json.id,
          type: json.type as Type,
          properties: props as BracketProperties,
        };
    }
    throw `Failed to deserialize ${JSON.stringify(json)} as Session`;
  },
};

export const ITEM_JSON: IJson<Item> = {
  serialize(value: Item): object {
    let obj: object = {
      id: value.id,
      type: value.type as string,
    };
    value.properties.forEach((value) => {
      obj = Object.assign(obj, getProperty(value.key).serialize(value));
    });
    return obj;
  },
  deserialize(json: any): Item {
    if ((json.type as Type) === Type.ITEM) {
      const props: IProperty<any>[] = [];
      Object.entries(json).forEach((value: [string, any]) => {
        if (value[0] !== "id" && value[0] !== "type") {
          props.push(getProperty(value[0]).deserialize(value[1]));
        }
      });
      if (checkProperties(ItemPropertiesDefault, props))
        return {
          id: json.id,
          type: json.type as Type,
          properties: props as ItemProperties,
        };
    }
    throw `Failed to deserialize ${JSON.stringify(json)} as Item`;
  },
};

