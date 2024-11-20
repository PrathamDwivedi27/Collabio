"use client"
import React from 'react'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogHeader,
    AlertDialogFooter
} from '@/components/ui/alert-dialog'


interface ConfirmModalProps{
    children:React.ReactNode;
    description?:string;
    onConfirm:()=>void;
    header:string;
    disabled?:boolean;
}




const ConfirmModal= ({
    children,
    description,
    onConfirm,
    header,
    disabled
}:ConfirmModalProps) => {

    const handleConfirm=()=>{
        onConfirm();
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {header}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm} disabled={disabled}>Confirm</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ConfirmModal
