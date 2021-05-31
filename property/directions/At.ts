import IJson from "../../IJson";
import Point, {INVALID as INVALID_POINT,stringify,parse} from "../../Time";
import { registerPropertyJSON } from "../IProperty";

export type AtProperty = { key: "at"; value: Point };

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