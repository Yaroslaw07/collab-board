"use client";

import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";

interface CanvasProps {
  boardId: string;
}

export const Canvas = ({ boardId }: CanvasProps) => {
  return (
    <main className="h-full w-full relative touch-none bg-secondary">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar />
    </main>
  );
};
