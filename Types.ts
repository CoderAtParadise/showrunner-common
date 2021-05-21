import Storage, { Type } from "./Storage";
import { DirectionsProperty } from "./property/Directions";
import { DisplayProperty } from "./property/Display";
import { StartTimeProperty } from "./property/StartTime";
import { ParentProperty } from "./property/Parent";
import { TimerProperty } from "./property/Timer";
import { DisabledProperty } from "./property/Disabled";
import { SaveProperty } from "./property/Save";
import { getProperty } from "./property/IProperty";
import IJson from "./IJson";

export interface Session
  extends Storage<
    [
      DisplayProperty,
      DisabledProperty,
      SaveProperty,
      StartTimeProperty,
      TimerProperty,
      DirectionsProperty
    ]
  > {
  }

export interface Bracket
  extends Storage<
    [
      ParentProperty,
      DisplayProperty,
      DisabledProperty,
      TimerProperty,
      DirectionsProperty
    ]
  > {}

  const SESSION_JSON : IJson<Session> = {
    serialize(value:Session) : object {
      let obj: object = {
        id: value.id,
        type: value.type as string
      }
      value.properties.forEach((value) => {
        obj = Object.assign(obj,getProperty(value.key).serialize(value));
      })
      return obj;
    },
    deserialize(json:any) : Session {
      if(json.type as Type === Type.SESSION) {
      let session: {id:string,type:Type,properties:any[]} = {
        id: json.id,
        type:json.type as Type,
        properties: [],
      }
      Object.entries(json).forEach((value:[string,any]) => {
        if(value[0] !== "id" && value[0] !== "type") 
        {
          session.properties.push(getProperty(value[0]).deserialize(value[1]));
        }
      });
      return session as Session;
    }
    else
      throw `Failed to deserialize ${json} as Session`;
    }
  }
