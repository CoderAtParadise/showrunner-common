import { ShowHandler } from "..";

export interface ShowManager {
    registerShow(show: ShowHandler): void;
    loadShow(id: string): void;
    unload(id: string): void;
    hasShow(id: string): boolean;
    getShow(id: string): ShowHandler | undefined;
    showList(): { id: string; displayName: string }[];
    setActiveShow(id: string): void;
    activeShow(): ShowHandler | undefined;
}
