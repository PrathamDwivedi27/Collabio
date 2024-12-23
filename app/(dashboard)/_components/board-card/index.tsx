"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Overlay from "./overlay";
import {formatDistanceToNow} from 'date-fns';
import { useAuth } from "@clerk/nextjs";
import Footer from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/actions";
import { MoreHorizontal } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface BoardCardProps {
  id: string;
  title: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  orgId: string;
  isFavorite: boolean;
}

export const BoardCard = ({
  id,
  title,
  imageUrl,
  authorId,
  authorName,
  createdAt,
  orgId,
  isFavorite,
}: BoardCardProps) => {
    const {userId}=useAuth();

    const {mutate:onFavorite,pending:pendingFavorite}=useApiMutation(api.board.favorite);
    const {mutate:onUnFavorite,pending:pendingUnFavorite}=useApiMutation(api.board.unfavorite);
  
    const authorLabel=userId===authorId?'You':authorName;
    const createdAtLabel=formatDistanceToNow(createdAt,{addSuffix:true});

    const toggleFavorite = async () => {
      if (isFavorite) {
        await onUnFavorite({id,orgId})
          .catch(()=>toast.error('Failed to unfavorite board'));
      } 
      else {
        await onFavorite({id,orgId})
        .catch(()=>toast.error('Failed to favorite board'));

      }
    }

  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] board rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50 ">
            <Image
                fill
                src={imageUrl}
                alt={title}
                className='object-fit'
            />
            <Overlay/>
            <Actions id={id} title={title} side="right">
              <button className="absolute top-1 right-1  px-3 py-2 outline-none">
                <MoreHorizontal
                  className="text-white opacity-75 hover:opacity-100 transition-opacity"
                />
              </button>
            </Actions>
        </div>
        <Footer
            isFavorite={isFavorite}
            title={title}
            authorLabel={authorLabel}
            createdAtLabel={createdAtLabel}
            onClick={toggleFavorite}
            disabled={pendingFavorite || pendingUnFavorite}
        />
      </div>
    </Link>
  );
};

BoardCard.Skeleton=function BoardCardSkeleton(){
    return (
        <div className="aspect-[100/127] overflow-hidden">
            <Skeleton className="h-full w-full"/>
        </div>
    )
}

