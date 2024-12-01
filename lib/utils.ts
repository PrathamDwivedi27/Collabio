import { Camera, Color, Point, Side, XYWH } from "@/types/canvas"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


const COLORS=[
  "#DC2626",
  "#D97706",
  "#059669",
  "#065F46",
  "#7C3AED",
  "#DB2777",
  "#F87171",
  "#FBBF24",
  "#34D399",
  "#10B981",
  "#3B82F6",
  "#6366F1",
  "#9333EA",
  "#F472B6",
]

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export  function connectionIdToColor(connectionId:number){
  return COLORS[connectionId % COLORS.length]
}

export function pointerEventToCanvasPoint(
  e:React.PointerEvent,
  camera:Camera
){
  return {
    x:Math.round(e.clientX)-camera.x,
    y:Math.round(e.clientY)-camera.y,
  };
}


export function colorToCss(color:Color){
  return `#${color.r.toString(16).padStart(2,"0")}${color.g.toString(16).padStart(2,"0")}${color.b.toString(16).padStart(2,"0")}`
}

export function resizeBounds(
  bounds:XYWH,
  corner:Side,
  point:Point
):XYWH{
  const result={
    x:bounds.x,
    y:bounds.y,
    width:bounds.width,
    height:bounds.height,
  }

  if((corner & Side.Left)===Side.Left){ 
    result.width=Math.abs(bounds.x+bounds.width-point.x);
    result.x=Math.min(bounds.x+bounds.width,point.x);
  }

  if((corner & Side.Right)===Side.Right){
    result.width=Math.abs(bounds.x-point.x);
    result.x=Math.min(bounds.x,point.x);
  }

  if((corner & Side.Top)===Side.Top){
    result.height=Math.abs(bounds.y+bounds.height-point.y);
    result.y=Math.min(bounds.y+bounds.height,point.y);
  }

  if((corner & Side.Bottom)===Side.Bottom){
    result.height=Math.abs(bounds.y-point.y);
    result.y=Math.min(bounds.y,point.y);
  }

  return result;
}
