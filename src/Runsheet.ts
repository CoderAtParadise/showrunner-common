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

    readonly version: number;
    readonly id: string;
    readonly displayName: string;
    autoload: AutoLoad;
}
