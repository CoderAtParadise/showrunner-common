import { Storage } from "./Storage";

interface AutoLoad {
    shows: string[];
    date?: Date;
}

export class Runsheet {
    constructor(
        version: number,
        id: string,
        displayName: string,
        autoLoad: AutoLoad
    ) {
        this.version = version;
        this.id = id;
        this.displayName = displayName;
        this.autoload = autoLoad;
    }

    getDefaultsForType(type: string): Map<string, Storage<any>> | undefined {
        if (this.defaults.has(type)) return this.defaults.get(type);
    }

    readonly version: number;
    readonly id: string;
    readonly displayName: string;
    autoload: AutoLoad;
    private defaults: Map<string, Map<string, Storage<any>>> = new Map<
        string,
        Map<string, Storage<any>>
    >();
}
