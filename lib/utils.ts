import { Camera } from "@/types/canvas"
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
