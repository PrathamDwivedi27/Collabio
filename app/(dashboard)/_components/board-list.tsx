"use client"
import React from 'react'
import EmptySearch from './empty-search';
import EmptyFavorite from './empty-favorites';
import EmptyBoard from './empty-board';

interface BoardListProps {
    orgId: string;
    query: {
        search?: string;
        favorites?: string;
    };
}

const BoardList = ({orgId,query}:BoardListProps) => {
    const data=[];

    if(!data.length && query.search){
        return (
            <EmptySearch/>
        )
    }
    if(!data.length && query.favorites){
        return (
            <EmptyFavorite/>
        )
    }
    if(!data.length){
        return (
            <EmptyBoard/>
        )
    }
  return (
    <div>
      {JSON.stringify({orgId,query})}
    </div>
  )
}

export default BoardList
