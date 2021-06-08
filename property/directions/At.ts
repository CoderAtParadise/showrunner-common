import IJson from "../../IJson";
import TimePoint, {INVALID as INVALID_POINT,stringify,parse} from "../../TimePoint";
import { registerPropertyJSON } from "../IProperty";

export type AtProperty = { key: "at"; value: TimePoint };

export const INVALID: AtProperty = {
    key: "at",
    value: INVALID_POINT
}

const JSON: IJson<AtProperty> = {
    serialize: (property: AtProperty): object => {
        return { time: stringify(property.value) };
    },
    deserialize: (json: any): AtProperty => {
        return { key: "at", value: parse(json) }
    }
}

export default registerPropertyJSON("at",JSON);