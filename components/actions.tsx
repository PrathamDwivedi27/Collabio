"use client"

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,

} from '@/components/ui/dropdown-menu'
import { toast } from "sonner";
import { Link2, PencilIcon, Trash2 } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import ConfirmModal from "./confirm-modal";
import { Button } from "./ui/button";
import { useRenameModal } from "@/store/use-rename-modal";

interface ActionProps{
    children: React.ReactNode;
    side?:DropdownMenuContentProps['side'];
    sideOffset?:DropdownMenuContentProps['sideOffset'];
    id:string;
    title:string;
}

export const Actions=({
    children,
    side,
    sideOffset,
    id,
    title
}:ActionProps)=>{
    const {onOpen}=useRenameModal();
    const {mutate,pending}  =useApiMutation(api.board.remove);



    const onCopyLink=()=>{
        navigator.clipboard.writeText(`${window.location.origin}/board/${id}`,
        )
            .then(()=>toast('Link copied to clipboard'))
            .catch(()=>toast('Failed to copy link'))
    }

    const onDelete=()=>{
        mutate({id})
            .then(()=>toast.success('Board deleted'))
            .catch(()=>toast.error('Failed to delete board'))
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent 
                onClick={(e)=>e.stopPropagation()}
                side={side}
                sideOffset={sideOffset}
                className="w-60"
            >
                <DropdownMenuItem onClick={onCopyLink} className="p-3 cursor-pointer">
                    <Link2 className="h-4 w-4 mr-2"/>
                    Copy board link
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>onOpen(id,title)} className="p-3 cursor-pointer">
                    <PencilIcon className="h-4 w-4 mr-2"/>
                    Rename
                </DropdownMenuItem>
                <ConfirmModal
                    header="Delete board?"
                    description="This will delete all the data associated with this board"
                    onConfirm={onDelete}
                    disabled={pending}
                >
                <Button variant="ghost" className="p-3 cursor-pointer text-sm w-full justify-start font-normal text-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4 mr-2"/>
                    Delete
                </Button>
                </ConfirmModal>
                

            </DropdownMenuContent>
        </DropdownMenu>
    )
}


