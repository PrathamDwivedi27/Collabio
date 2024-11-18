import React from 'react'
import Image from 'next/image'

const EmptySearch = () => {
  return (
    <div className='flex flex-col h-full items-center justify-center'>
      <Image
        src='/search.svg'
        alt='search'
        width={200}
        height={140}
      />
      <h2 className='text-2xl font-semibold mt-6'>
        No results found
      </h2>
      <p className='text-muted-foreground text-sm mt-2'>
        Try searching for something else
      </p>
    </div>
  )
}

export default EmptySearch
