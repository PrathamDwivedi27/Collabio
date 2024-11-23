import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'

const Participants = () => {
  return (
    <div className='absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md'>
      List of users
    </div>
  )
}

export default Participants;

export const ParticipantsSkeleton = function ParticipantsSkeleton(){
  return (
    <div className='absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[300px]'>
      <Skeleton className='h-full w-full bg-muted-400'/>
    </div>
)}