"use client";

import Image from "next/image";
import Link from "next/link";

import { useAuth } from "@clerk/nextjs";

import { formatDistanceToNow } from "date-fns";

import { Skeleton } from "@/components/ui/skeleton";
import { BoardActions } from "../board-actions";
import { useApiMutation } from "@/hooks/use-api-mutation";

import { Overlay } from "./overlay";
import { Footer } from "./footer";
import { MoreHorizontal } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface BoardCardProps {
  key: string;
  id: string;
  title: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  imageUrl: string;
  orgId: string;
  isFavorite: boolean;
}

export const BoardCard = ({
  id,
  title,
  authorId,
  authorName,
  createdAt,
  imageUrl,
  orgId,
  isFavorite,
}: BoardCardProps) => {
  const { userId } = useAuth();

  const authorLabel = userId === authorId ? "You" : authorName;

  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  const { mutate: onFavorite, pending: pendingFavorite } = useApiMutation(
    api.board.favorite
  );
  const { mutate: onUnfavorite, pending: pendingUnfavorite } = useApiMutation(
    api.board.unfavorite
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      onUnfavorite({ id }).catch(() => toast.error("Failed to unfavorite"));
    } else {
      onFavorite({ id, orgId }).catch(() => toast.error("Failed to favorite"));
    }
  };

  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden shadow-sm">
        <div className="relative flex-1 bg-secondary/5">
          <Image
            src={imageUrl}
            alt={"Image of board"}
            fill
            className="object-fit"
          />
          <Overlay />
          <BoardActions id={id} title={title} side="right">
            <button className="absolute top-0 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-1 py-1 outline-none">
              <MoreHorizontal className="h-7 w-7 text-foreground opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </BoardActions>
        </div>
        <div className="h-[2px] w-full bg-accent/50" />
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavorite}
          disabled={pendingFavorite || pendingUnfavorite}
        />
      </div>
    </Link>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] border rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
