"use client"
import React from 'react'
import EmptySearch from './empty-search';
import EmptyFavorite from './empty-favorites';
import EmptyBoard from './empty-board';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import NewBoardButton from './new-board-button';
import { BoardCard } from './board-card';

interface BoardListProps {
    orgId: string;
    query: {
        search?: string;
        favorites?: string;
    };
}

const BoardList = ({orgId,query}:BoardListProps) => {
    const data=useQuery(api.boards.get,{orgId});        //second argument is the args object

    if(data===undefined){       //if data is undefined means it is in loading state
        return (
            <div>
        <h2 className='text-3xl'>
            {query.favorites? 'Favorite Boards':'Team Boards'}
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10'>
            <NewBoardButton orgId={orgId} disabled/>
            <BoardCard.Skeleton/>
        </div>
    </div>
        )
    }

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
        <h2 className='text-3xl'>
            {query.favorites? 'Favorite Boards':'Team Boards'}
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10'>
            <NewBoardButton orgId={orgId}/>
            {data.map((board)=>(
                <BoardCard
                    key={board._id}
                    id={board._id}
                    title={board.title}
                    imageUrl={board.imageUrl}
                    authorId={board.authorId}
                    authorName={board.authorName}
                    createdAt={board._creationTime}
                    orgId={board.orgId}
                    isFavorite={board.isFavorite}
                />
            )
                
            )}
        </div>
    </div>
  )
}

export default BoardList
