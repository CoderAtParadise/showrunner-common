import IJson from "./IJson";
import { AtProperty, INVALID as INVALID_AT } from "./property/directions/At";
import { OnProperty, INVALID as INVALID_ON } from "./property/directions/On";
import IProperty, {
  getPropertyJSON,
  hasAllProperties,
  hasEitherProperty,
} from "./property/IProperty";

import {getDirectionCommand} from "./DirectionCommand";

export interface Direction<Properties extends IProperty<any>[]> {
  targets: string[];
  command: string;
  properties: Properties;
}

const INVALID: Direction<any> = {
  targets: [],
  command: "",
  properties: undefined,
};

type OnAtProperties = [OnProperty, AtProperty];

const OnAtPropertiesDefault: OnAtProperties = [INVALID_ON, INVALID_AT];

export const JSON: IJson<Direction<any>> = {
  serialize: (value: Direction<any>): object => {
    let obj: object = {
      targets: value.targets,
      command: value.command,
    };
    value.properties.forEach((property: IProperty<any>) => {
      obj = Object.assign(
        obj,
        getPropertyJSON(property.key).serialize(property)
      );
    });
    return obj;
  },
  deserialize: (json: any): Direction<any> => {
    const props: IProperty<any>[] = [];
    Object.entries(json).forEach((value: [string, any]) => {
      if (value[0] !== "command" && value[0] !== "targets") {
        props.push(getPropertyJSON(value[0]).deserialize(value[1]));
      }
    });
    const command = getDirectionCommand(json.command);
    if (command) {
      if (
        hasEitherProperty(OnAtPropertiesDefault, props) &&
        hasAllProperties(command.properties, props)
      )
        return {
          targets: json.targets,
          command: json.command,
          properties: props,
        };
    }
    return INVALID;
  },
};

export default Direction;
