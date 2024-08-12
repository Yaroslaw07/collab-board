"use client";

import { memo } from "react";
import { MousePointer2 } from "lucide-react";

import { parseConnectionIdToColor } from "@/lib/utils";
import { useOther } from "@liveblocks/react/suspense";

interface CursorProps {
  connectionId: number;
}

export const Cursor = memo(({ connectionId }: CursorProps) => {
  const info = useOther(connectionId, (user) => user?.info);
  const cursor = useOther(connectionId, (user) => user.presence.cursor);

  const name = info?.name || "Teammate";

  console.log({ info }, { cursor });

  if (!cursor) {
    return null;
  }

  const { x, y } = cursor;
  const color = parseConnectionIdToColor(connectionId);

  return (
    <foreignObject
      style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
      height={50}
      width={name.length * 10 + 24}
      className="relative drop-shadow-md"
    >
      <MousePointer2
        className="h-5 w-5"
        style={{ color: color, fill: color }}
      />
      <div
        className="absolute left-5 px-1.5 py-0.5 rounded-md text-xs text-primary-foreground"
        style={{ backgroundColor: color }}
      >
        {name}
      </div>
    </foreignObject>
  );
});

Cursor.displayName = "Cursor";
