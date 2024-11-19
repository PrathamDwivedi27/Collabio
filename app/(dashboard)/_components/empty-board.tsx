"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useOrganization } from '@clerk/nextjs'



const EmptyBoard = () => {

  const {organization} = useOrganization();
  const create=useMutation(api.board.create);
  
  const onClick=()=>{
    if(!organization){
      return;
    }

    create({
      orgId:organization.id,
      title:"Untitled"
    })
  }



  return (
    <div className='flex flex-col h-full items-center justify-center'>
      <Image
        src='/note.jpeg'
        alt='search'
        width={200}
        height={140}
      />
      <h2 className='text-2xl font-semibold mt-2'>
        Create your first board
      </h2>
      <p className='text-muted-foreground text-sm mt-2'>
        Start by creating a board for your organization
      </p>
      <div className='mt-6'>
        <Button onClick={onClick}size='lg'>
          Create Board
        </Button>
      </div>
    </div>
  )
}

export default EmptyBoard
