import React from 'react'
import Image from 'next/image'

const EmptyFavorite = () => {
  return (
    <div className='flex flex-col h-full items-center justify-center'>
      <Image
        src='/favorite.svg'
        alt='search'
        width={140}
        height={140}
      />
      <h2 className='text-2xl font-semibold mt-6'>
        No favorites found
      </h2>
      <p className='text-muted-foreground text-sm mt-2'>
        Try favoriting some boards
      </p>
    </div>
  )
}

export default EmptyFavorite
