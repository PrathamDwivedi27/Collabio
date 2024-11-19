"use client"

import { useState } from "react"
import { useMutation } from "convex/react"


export const useApiMutation=(mutationFunction:any)=>{
    const [pending,setPending]=useState(false);         //to track whether the mutation is currently running. true means mutation is in progress, false means its idle
    const apiMutation=useMutation(mutationFunction);

    const mutate=(payload:any)=>{
        setPending(true);
        return apiMutation(payload)         //yha humne create karwa liya jo board hai useMutation ka use karke ,payload we are passing when we create something like create board
        .then((result)=>{
            return result;
        })
        .catch((error)=>{
            throw error;
        })
        .finally(()=>{
            setPending(false);
        })
    }
    return {mutate,pending}         //mutate : it is a wrapped version of the convex function means it will do all the tasks directly
}

//the useApiMutation tracks whether a mutation is currently pending (running).