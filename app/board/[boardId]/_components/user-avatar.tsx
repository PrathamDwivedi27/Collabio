import React from 'react'

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"
import { Hint } from '@/components/hint';

interface UserAvatarProps {
    src?: string;
    fallback?: string;
    name?: string;
    borderColor?: string;
}

const UserAvatar = ({
    src,
    fallback,
    name,
    borderColor
}:UserAvatarProps) => {
  return (
    <Hint label={name || 'Team Member'} side='bottom' sideOffset={18}>
        <Avatar className='h-8 w-8 border-2'
        style={{borderColor}}
        >
            <AvatarImage src={src}/>
            <AvatarFallback className='text-xs font-semibold'>
              {fallback}
            </AvatarFallback>
        </Avatar>
      
    </Hint>
  )
}

export default UserAvatar
