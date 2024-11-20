"use client"
import React, {FormEventHandler, useEffect } from 'react'

import {
    Dialog,
    DialogDescription,
    DialogHeader,
    DialogClose,
    DialogFooter,
    DialogContent,
    DialogTitle,
} from '@/components/ui/dialog'
import { useRenameModal } from '@/store/use-rename-modal'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'

const RenameModal = () => {
    const {mutate,pending}=useApiMutation(api.board.update);

    const {isOpen,onClose,initialValues}=useRenameModal();
    const [title,setTitle]=React.useState(initialValues.title);

    useEffect(()=>{
        setTitle(initialValues.title)
    },[initialValues.title])

    if(!isOpen){
        return null
    }

    const onSubmit:FormEventHandler<HTMLFormElement>=(e)=>{
        e.preventDefault();
        mutate({id:initialValues.id,title})
            .then(()=>{
                toast.success('Board renamed')
                onClose()
            })
            .catch(()=>toast.error('Failed to rename board'))
    }
     
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
            <DialogTitle>
                Edit board title
            </DialogTitle>
        </DialogHeader>
        <DialogDescription>
            Change the title of this board
        </DialogDescription>
        <form onSubmit={onSubmit} className='space-y-4'>
            <Input
                disabled={pending}
                required
                maxLength={50}
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                placeholder="Enter board title"
            />
            <DialogFooter>
            <DialogClose asChild>
                <Button type='button' variant='outline'>
                    Cancel
                </Button>
            </DialogClose>
            <Button disabled={pending} type='submit'>
                Save
            </Button>
            </DialogFooter>
                
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default RenameModal
