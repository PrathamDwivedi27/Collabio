"use client"

import { ReactNode } from "react"
import {LiveblocksProvider,RoomProvider,ClientSideSuspense} from '@liveblocks/react/suspense'

interface RoomProps {
    children: ReactNode
    roomId: string
    fallback?: ReactNode
}

export function Room({ children,roomId,fallback }: RoomProps) {
    return (
      <LiveblocksProvider publicApiKey={"pk_dev_loo7h0tE1tOiAOyUZQwFXDOsf1KZMIwQoBfydUsopCK0-X7KAHeP9YmATxj-MCEz"}>
        <RoomProvider id={roomId}>
          <ClientSideSuspense fallback={fallback}>
            {()=>children}
          </ClientSideSuspense>
        </RoomProvider>
      </LiveblocksProvider>
    );
  }