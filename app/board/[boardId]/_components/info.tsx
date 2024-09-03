"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";

import { useQuery } from "convex/react";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Hint } from "@/components/hint";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { Actions } from "@/app/(dashboard)/_components/actions";

import { TabSeparator } from "./tab-separator";

interface InfoProps {
  boardId: string;
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const Info = ({ boardId }: InfoProps) => {
  const router = useRouter();

  const board = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  });

  useEffect(() => {
    document.title = board ? `${board?.title}'s board` : "Board";
  }, [board?.title]);

  if (!board) return <InfoSkeleton />;

  return (
    <div className="absolute top-2 left-2 bg-background rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Hint label="Go to dashboard" side="bottom" sideOffset={10}>
        <Button asChild className="pl-1 pr-2" variant={"board"}>
          <Link href="/">
            <Image src="/logo.svg" width={45} height={45} alt="Logo" />
            <span
              className={cn(
                "font-semibold text-xl ml-2 text-black",
                font.className
              )}
            >
              C&B
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Current title" sideOffset={10} side="bottom">
        <Button variant="board" className="text-base font-normal px-2">
          {board.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Actions id={board._id} title={board.title} side="bottom" sideOffset={10}>
        <div>
          <Hint label="Main menu" side="bottom" sideOffset={10}>
            <Button size="icon" variant="board">
              <Menu></Menu>
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};

export const InfoSkeleton = () => {
  return (
    <div className="absolute top-2 left-2 bg-background rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]" />
  );
};
