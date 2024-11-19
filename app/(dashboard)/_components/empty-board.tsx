"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { api } from '@/convex/_generated/api'
import { useOrganization } from '@clerk/nextjs'
import {toast} from 'sonner'


const EmptyBoard = () => {

  const {organization} = useOrganization();
  const {mutate,pending}=useApiMutation(api.board.create);     //instead of using useMutation which will only create , we will use our custom hook which will also see loading state and errors otherwise the things we did in that hook we have to write everywhere
  
  const onClick=()=>{
    if(!organization){
      return;
    }

    mutate({
      orgId:organization.id,
      title:"Untitled"
    })
    .then((id)=>{     //matlab jab board create ho jaye toh id aayega
      toast.success("Board created successfully")
      // todo redirect to board/{id}
    })
    .catch(()=>{
      toast.error("Failed to create board")
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
        <Button disabled={pending} onClick={onClick}size='lg'>
          Create Board
        </Button>
      </div>
    </div>
  )
}

export default EmptyBoard
