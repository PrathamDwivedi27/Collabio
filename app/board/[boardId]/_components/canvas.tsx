"use client";
import React, { useCallback } from 'react';
import Info from './info';
import Participants from './participants';
import Toolbar from './toolbar';
import { CanvasMode, CanvasState, Color, LayerType, Point } from '@/types/canvas';
import { useHistory,
  useCanUndo,
  useCanRedo,
  useMutation } from '@liveblocks/react';
import CursorsPresence from './cursors-presence';
import { Camera } from '@/types/canvas';
import { pointerEventToCanvasPoint } from '@/lib/utils';
import { useStorage } from '@liveblocks/react/suspense';
import {nanoid} from 'nanoid';
import { LiveObject } from '@liveblocks/client';
import LayerPreview from './layer-preview';



const MAX_LAYERS=100;
interface CanvasProps {
  boardId?: string;
}

const Canvas = ({ boardId }: CanvasProps) => {

   const layerIds=useStorage((root)=>root.layerIds);    //this will tell what we have to show like rectangle or ellipse
  
   const [canvasState, setCanvasState] = React.useState<CanvasState>({
    mode:CanvasMode.None,
   });

   const [camera,setCamera]=React.useState<Camera>({x:0,y:0});
   const [lastUsedColor,setLastUsedColor]=React.useState<Color>({r:0,g:0,b:0});

   const history=useHistory();
   const canUndo=useCanUndo();
   const canRedo=useCanRedo();


   const insertLayer = useMutation(({ storage, setMyPresence }, layerType: LayerType, position: Point) => {
    const liveLayers = storage.get("layers");
    if (liveLayers.size >= MAX_LAYERS) {
        return;
    }

    const liveLayerIds = storage.get("layerIds");
    const layerId = nanoid();
    const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        width: 100,
        height: 100,
        fill: lastUsedColor,
    });

    // Pause history to group changes into one action
    history.pause();

    liveLayerIds.push(layerId); // Add to layer IDs
    liveLayers.set(layerId, layer); // Add the new layer

    // Resume history and add changes
    history.resume();

    // Update selection for the new layer
    setMyPresence(
        {
            selection: [layerId],
        },
        { addToHistory: true }
    );

    // Reset canvas state
}, [lastUsedColor, history]);

    
   

   const onWheel=useCallback((e:React.WheelEvent)=>{

    // console.log(e.deltaX,e.deltaY);
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

      // console.log("current",current);
      setMyPresence({
        cursor:current,
      });
    }, [])

    const onPointerLeave =useMutation(({setMyPresence})=>{
      setMyPresence({
        cursor:null,
      });
    },[]);

    const onPointerUp=useMutation(({},e)=>{
      const point=pointerEventToCanvasPoint(e,camera);

      console.log("bsdk",{point:point,mode:canvasState.mode})

      if(canvasState.mode===CanvasMode.Inserting){
        insertLayer(canvasState.layerType,point);
      }
      else {
        setCanvasState({
          mode:CanvasMode.None,
        })
      }

      history.resume();
    },[camera,canvasState,insertLayer,history]);




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
        onPointerUp={onPointerUp}
      >
        <g 
          style={{
            transform:`translate(${camera.x}px,${camera.y}px)`,
          }}
         >
          {layerIds.map((layerId)=>(
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={()=>{}}
              selectionColor="blue"
              // ye selection color ye hai ki agar koi layer bna rha hai to baaki user ko dikhe ki use ho rha hai aur ye color user ke cursor jaisa hoga 
            />
          ))}
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};

export default Canvas;