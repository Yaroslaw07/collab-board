"use client";

import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";

import { EmptyBoards } from "./empty-boards";
import { EmptyFavorites } from "./empty-favorites";
import { EmptySearch } from "./empty-search";
import { BoardCard } from "./board-card";
import { NewBoardButton } from "./new-board-button";
import { ReadonlyURLSearchParams } from "next/navigation";

interface BoardListProps {
  orgId: string;
  query: ReadonlyURLSearchParams;
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = useQuery(api.boards.get, {
    orgId,
    search: query.get("search") || undefined,
    favorites: query.get("favorites") || undefined,
  });

  if (data === undefined) {
    return (
      <div className="flex-1 h-[calc(100%-80px)] p-3">
        <h2 className="text-4xl">
          {query.get("favorites") ? "Favorite Boards" : "Team Boards"}
        </h2>
        <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-6 pb-10">
          <NewBoardButton orgId={orgId} disabled={true} />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  }

  if (!data.length && query.get("search")) {
    return <EmptySearch />;
  }

  if (!data.length && query.get("favorites")) {
    return <EmptyFavorites />;
  }

  if (!data.length) {
    return <EmptyBoards />;
  }

  return (
    <div className="flex-1 h-[calc(100%-80px)] p-3">
      <h2 className="text-4xl">
        {query.get("favorites") ? "Favorite Boards" : "Team Boards"}
      </h2>
      <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-6 pb-10">
        <NewBoardButton orgId={orgId} />
        {data?.map((board) => (
          <BoardCard
            key={board._id!}
            id={board._id!}
            title={board.title!}
            imageUrl={board.imageUrl!}
            authorId={board.authorId!}
            authorName={board.authorName!}
            createdAt={board._creationTime!}
            orgId={board.orgId!}
            isFavorite={board.isFavorite}
          />
        ))}
      </div>
    </div>
  );
};
