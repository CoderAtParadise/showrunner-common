import IJson from "./IJson";
import { ITrigger, handlers as thandlers,INVALID as TINVALID } from "./ITrigger";
import { IMessage, handlers as mhandlers, INVALID as MINVALID } from "./IMessage";

export interface DirectionStorage {
  disabled: boolean;
  targets: string[];
  trigger: ITrigger;
  message: IMessage;
}

export const JSON: IJson<DirectionStorage> = {
  serialize(value: DirectionStorage): object {
    return {
      disabled: value.disabled,
      targets: value.targets,
      trigger: thandlers.get(value.trigger.type)?.JSON.serialize(value.trigger),
      message: mhandlers.get(value.message.type)?.JSON.serialize(value.message),
    };
  },
  deserialize(json: object): DirectionStorage {
      const value = json as {
          disabled: boolean,
          targets: string[];
          trigger: ITrigger,
          message: IMessage,
      };
      const trigger = thandlers.get(value.trigger.type)?.JSON.deserialize(value.trigger);
      const message = mhandlers.get(value.message.type)?.JSON.deserialize(value.message);
      return {
          disabled: value.disabled,
          targets: value.targets,
          trigger: trigger || TINVALID,
          message: message || MINVALID,
      }
  },
};
