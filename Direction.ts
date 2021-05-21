import IJson from "./IJson";
import {
  ITrigger,
  handlers as thandlers,
  INVALID as TINVALID,
} from "./trigger/ITrigger";
import {
  IMessage,
  handlers as mhandlers,
  INVALID as MINVALID,
} from "./message/IMessage";

export interface Direction {
  disabled: boolean;
  targets: string[];
  trigger: ITrigger;
  message: IMessage;
}

export const JSON: IJson<Direction> = {
  serialize(value: Direction): object {
    return {
      disabled: value.disabled,
      targets: value.targets,
      trigger: thandlers.get(value.trigger.type)?.JSON.serialize(value.trigger),
      message: mhandlers.get(value.message.type)?.JSON.serialize(value.message),
    };
  },
  deserialize(json: any): Direction {
    const value = json as {
      disabled: boolean;
      targets: string[];
      trigger: ITrigger;
      message: IMessage;
    };
    const trigger = thandlers
      .get(value.trigger.type)
      ?.JSON.deserialize(value.trigger);
    const message = mhandlers
      .get(value.message.type)
      ?.JSON.deserialize(value.message);
    return {
      disabled: value.disabled,
      targets: value.targets,
      trigger: trigger || TINVALID,
      message: message || MINVALID,
    };
  },
};
