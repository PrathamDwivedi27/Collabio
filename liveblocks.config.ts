// Define Liveblocks types for your application
// https://liveblocks.io/docs/api-reference/liveblocks-react#Typing-your-data

import { LiveList,LiveMap,LiveObject } from "@liveblocks/client";
import { Layer } from "./types/canvas";


declare global {
  interface Liveblocks {
    // Each user's Presence, for useMyPresence, useOthers, etc.
    Presence: {
      // Example, real-time cursor coordinates
      cursor: { x: number; y: number } | null;
      selection:string[];
    };

    // The Storage tree for the room, for useMutation, useStorage, etc.
    Storage: {
      layers:LiveMap<string,LiveObject<Layer>>;
      layerIds:LiveList<string>;
    };

    // Custom user info set when authenticating with a secret key
    UserMeta: {
      id?: string;
      info?: {
        name?:string;
        picture?:string;
      };
    };

    // Custom events, for useBroadcastEvent, useEventListener
    RoomEvent: {};
      // Example has two events, using a union
      // | { type: "PLAY" } 
      // | { type: "REACTION"; emoji: "🔥" };

    // Custom metadata set on threads, for useThreads, useCreateThread, etc.
    ThreadMetadata: {
      
    };

    // Custom room info set with resolveRoomsInfo, for useRoomInfo
    RoomInfo: {
      
    };
  }
}

export {};
