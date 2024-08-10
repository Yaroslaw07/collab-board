"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "convex/react";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Hint } from "@/components/hint";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { Actions } from "@/app/(dashboard)/_components/actions";
import { Menu } from "lucide-react";

interface InfoProps {
  boardId: string;
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const TabSeparator = () => {
  return <div className="text-primary-300 px-1.5">|</div>;
};

export const Info = ({ boardId }: InfoProps) => {
  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  });

  if (!data) return <InfoSkeleton />;

  return (
    <div className="absolute top-2 left-2 bg-background rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Hint label="Go to dashboard" side="bottom" sideOffset={10}>
        <Button asChild className="pl-1 pr-2" variant={"board"}>
          <Link href="/">
            <Image src="/logo.svg" width={50} height={50} alt="Logo" />
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
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Actions id={data._id} title={data.title} side="bottom" sideOffset={10}>
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
