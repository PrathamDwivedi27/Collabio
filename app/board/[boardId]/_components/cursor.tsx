"use client";
import { connectionIdToColor } from '@/lib/utils';
import { useOther } from '@liveblocks/react/suspense';
import { MousePointer2 } from 'lucide-react';
import React from 'react'
import {memo} from 'react'



interface CursorProps {
    connectionId: number;
}

const Cursor = memo(({
    connectionId,
}:CursorProps) => {
    const info= useOther(connectionId, (user)=>user?.info);
    const cursor=useOther(connectionId, (user)=>user.presence.cursor);

    const name=info?.name || "Team Member";

    if(!cursor){
        return null;
    }
    console.log("Color for connectionId:", connectionId, connectionIdToColor(connectionId));


    const {x,y}=cursor;     //yha pe liveblocks mein jaake presence likhe hai
  return (
    <foreignObject
    style={{
        transform: `translate(${x}px, ${y}px)`,
    }}
        height={50}
        width={name.length*10+24}

        className='relative drop-shadow-md'
    >
        <MousePointer2
            className='h-5 w-5'
            style={{
                fill: connectionIdToColor(connectionId),
                color: connectionIdToColor(connectionId),
            }}
        />
        <div className='absolute left-5 px-1.5 py-0.5 rounded-md text-sm text-white font-semibold'
            style={{
                backgroundColor: connectionIdToColor(connectionId),
            }}
        >
            {name}
        </div>
    </foreignObject>
  )
});

Cursor.displayName = 'Cursor';

export default Cursor
