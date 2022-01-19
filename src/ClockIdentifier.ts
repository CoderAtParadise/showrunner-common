import { ClockSource } from "./ClockSource";

export interface RenderChannel {
    id: string;
    display: boolean;
}

export interface ClockIdentifier {
    clock: ClockSource;
    active: boolean;
    automation: boolean;
    renderChannel: RenderChannel[];
}
