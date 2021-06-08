import StagePlot from "../../stageplot/StagePlot";
import IJson from "../../IJson";
import { registerPropertyJSON } from "../IProperty";

export type StagePlotProperty = { key: "stageplot"; value: string };

export const INVALID: StagePlotProperty = {
    key: "stageplot",
    value: ""
}

const JSON: IJson<StagePlotProperty> = {
    serialize: (property: StagePlotProperty): object => {
        return { message: property.value };
    },
    deserialize: (json: any): StagePlotProperty => {
        return { key: "stageplot", value: json as string }
    }
}

export default registerPropertyJSON("stageplot",JSON);