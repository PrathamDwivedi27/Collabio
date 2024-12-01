"use client"
import { colorToCss } from '@/lib/utils';
import { Color } from '@/types/canvas'
import React from 'react'

interface ColorPickerProps {
    onChange:(color:Color)=>void;
}

const ColorPicker = ({onChange}:ColorPickerProps) => {
  return (
    <div className='flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200'>
      <ColorButton onClick={onChange} color={{r:243,g:82,b:35}} />
      <ColorButton onClick={onChange} color={{r: 220, g: 20, b: 60}} /> {/* Red */}
      <ColorButton onClick={onChange} color={{r: 255, g: 105, b: 180}} /> {/* Pink */}
      <ColorButton onClick={onChange} color={{r: 138, g: 43, b: 226}} /> {/* Purple */}
      <ColorButton onClick={onChange} color={{r: 39, g: 142, b: 237}} /> {/* Blue */}
      <ColorButton onClick={onChange} color={{r: 0, g: 255, b: 255}} /> {/* Cyan */}
      <ColorButton onClick={onChange} color={{r: 34, g: 139, b: 34}} /> {/* Green */}
      <ColorButton onClick={onChange} color={{r: 255, g: 215, b: 0}} /> {/* Yellow */}
      <ColorButton onClick={onChange} color={{r: 255, g: 165, b: 0}} /> {/* Light Orange */}
      <ColorButton onClick={onChange} color={{r: 0, g: 128, b: 128}} /> {/* Teal */}
      <ColorButton onClick={onChange} color={{r: 255, g: 0, b: 255}} /> {/* Magenta */}
      <ColorButton onClick={onChange} color={{r: 255, g: 249, b: 177}} /> {/* Dark Gray */}
      <ColorButton onClick={onChange} color={{r: 211, g: 211, b: 211}} /> {/* Light Gray */}
      <ColorButton onClick={onChange} color={{r: 152, g: 251, b: 152}} /> {/* Pastel Green */}
      <ColorButton onClick={onChange} color={{r: 255, g: 127, b: 80}} /> {/* Coral */}
      <ColorButton onClick={onChange} color={{r: 25, g: 25, b: 112}} /> {/* Midnight Blue */}

    </div>
  )
}

export default ColorPicker;


interface ColorButtonProps{
    color:Color;
    onClick:(color:Color)=>void;
}

const ColorButton=({
    onClick,
    color
}:ColorButtonProps)=>{
    return(
        <button className='w-8 h-8 items-center flex justify-center hover:opacity-75 after:transition'
            onClick={()=>onClick(color)}
        >
            <div className='h-8 w-8 rounded-md border border-neutral-300 '
                style={{background:colorToCss(color)}}
            />

            
        </button>
    )
}
