import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'


interface InfoProps {
  boardId?: string
}

const Info = ({boardId}:InfoProps) => {
  return (
    <div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md'>
      Todo info about board
    </div>
  )
}

export default Info;



export const InfoSkeleton = function InfoSkeleton(){
  return (
    <div className='absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]'>
      <Skeleton className='h-full w-full bg-muted-400'/>
    </div>
  )
}
