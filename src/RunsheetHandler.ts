import ClockSource from "./ClockSource";
import Show from "./Show";
import Storage from "./Storage"
import TrackingShow from "./TrackingShow";

export interface RunsheetHandler {
   id: () => string;
   hasLoadedRunsheet: () => boolean;
   getClock: (id:string) => ClockSource | undefined;
   addClock: (clock:ClockSource) => void;
   getShow: (id:string) => Show | undefined;
   addShow: (show:Show) => void;
   deleteShow: (id:string) => boolean;
   showList: () => string[];
   activeShow: () => string;
   setActiveShow: (id:string) => void;
   getTrackingShow: (id:string) => TrackingShow | undefined;
   addTrackingShow: (trackingShow:TrackingShow) => void;
   deleteTrackingShow: (id:string) => boolean;
   getStorage: (id:string) => Storage<any> | undefined;
   addStorage: (storage:Storage<any>) => void;
   deleteStorage: (id:string) => boolean;
   //getStagePlot: (id:string) => StagePlot | undefined;
   //addStagePlot: (plot:StagePlot) => void;
}

export default RunsheetHandler;