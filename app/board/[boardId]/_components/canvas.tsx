"use client";
import React, { useCallback } from 'react';
import Info from './info';
import Participants from './participants';
import Toolbar from './toolbar';
import { CanvasMode, CanvasState } from '@/types/canvas';
import { useHistory,
  useCanUndo,
  useCanRedo,
  useMutation } from '@liveblocks/react';
import CursorsPresence from './cursors-presence';
import { Camera } from '@/types/canvas';
import { pointerEventToCanvasPoint } from '@/lib/utils';
interface CanvasProps {
  boardId?: string;
}

const Canvas = ({ boardId }: CanvasProps) => {
  
   const [canvasState, setCanvasState] = React.useState<CanvasState>({
    mode:CanvasMode.None,
   });

   const [camera,setCamera]=React.useState<Camera>({x:0,y:0});

   const history=useHistory();
   const canUndo=useCanUndo();
   const canRedo=useCanRedo();

   const onWheel=useCallback((e:React.WheelEvent)=>{

    console.log(e.deltaX,e.deltaY);
    setCamera((camera)=>({
      x:camera.x-e.deltaX,
      y:camera.y-e.deltaY,
    }));
  },[]);

   // useMutation broadcast the message to all other user so we add that to our mouse event
   const onPointerMove=useMutation(({setMyPresence}, e:React.
    PointerEvent)=>{
      e.preventDefault();

      const current=pointerEventToCanvasPoint(e,camera);

      console.log("current",current);
      setMyPresence({
        cursor:current,
      });
    }, [])

    const onPointerLeave =useMutation(({setMyPresence})=>{
      setMyPresence({
        cursor:null,
      });
    },[]);
  return (
    <main
      className="h-full w-full relative bg-neutral-100 touch-none"
    >
      <Info boardId={boardId}/>
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        undo={history.undo}
        redo={history.redo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
      {/* In this g element we will store all our resizable translatable elements, sticky notes */}
      <svg className='h-[100vh] w-[100vw]'
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};

export default Canvas;