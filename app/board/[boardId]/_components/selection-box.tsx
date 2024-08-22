"use client";

import { memo } from "react";

import { LayerType, Side, XYWH } from "@/types/canvas";
import { useSelf, useStorage } from "@liveblocks/react/suspense";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import ResizeHandle from "./resize-handle";

interface SelectionBoxProps {
  onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void;
}

export const SelectionBox = memo(
  ({ onResizeHandlePointerDown }: SelectionBoxProps) => {
    const soleLayerId = useSelf((me) =>
      me.presence.selection.length === 1 ? me.presence.selection[0] : null
    );

    const isShowingHandles = useStorage(
      (root) =>
        soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path
    );

    const bounds = useSelectionBounds();

    if (!bounds) {
      return null;
    }

    return (
      <>
        <rect
          className="fill-transparent stroke-secondary stroke-1 pointer-events-none"
          style={{ transform: `translate(${bounds.x}px, ${bounds.y}px)` }}
          x={0}
          y={0}
          width={bounds.width}
          height={bounds.height}
        />
        {isShowingHandles && (
          <>
            {/* Top-left corner */}
            <ResizeHandle
              cursor="nwse-resize"
              x={bounds.x}
              y={bounds.y}
              onPointerDown={() =>
                onResizeHandlePointerDown(Side.Top + Side.Left, bounds)
              }
            />
            {/* Top-middle */}
            <ResizeHandle
              cursor="ns-resize"
              x={bounds.x + bounds.width / 2}
              y={bounds.y}
              onPointerDown={() => onResizeHandlePointerDown(Side.Top, bounds)}
            />
            {/* Top-right corner */}
            <ResizeHandle
              cursor="nesw-resize"
              x={bounds.x + bounds.width}
              y={bounds.y}
              onPointerDown={() =>
                onResizeHandlePointerDown(Side.Top + Side.Right, bounds)
              }
            />
            {/* Middle-left */}
            <ResizeHandle
              cursor="ew-resize"
              x={bounds.x}
              y={bounds.y + bounds.height / 2}
              onPointerDown={() => onResizeHandlePointerDown(Side.Left, bounds)}
            />
            {/* Middle-right */}
            <ResizeHandle
              cursor="ew-resize"
              x={bounds.x + bounds.width}
              y={bounds.y + bounds.height / 2}
              onPointerDown={() =>
                onResizeHandlePointerDown(Side.Right, bounds)
              }
            />
            {/* Bottom-left corner */}
            <ResizeHandle
              cursor="nesw-resize"
              x={bounds.x}
              y={bounds.y + bounds.height}
              onPointerDown={() =>
                onResizeHandlePointerDown(Side.Bottom + Side.Left, bounds)
              }
            />
            {/* Bottom-middle */}
            <ResizeHandle
              cursor="ns-resize"
              x={bounds.x + bounds.width / 2}
              y={bounds.y + bounds.height}
              onPointerDown={() =>
                onResizeHandlePointerDown(Side.Bottom, bounds)
              }
            />
            {/* Bottom-right corner */}
            <ResizeHandle
              cursor="nwse-resize"
              x={bounds.x + bounds.width}
              y={bounds.y + bounds.height}
              onPointerDown={() =>
                onResizeHandlePointerDown(Side.Bottom + Side.Right, bounds)
              }
            />
          </>
        )}
      </>
    );
  }
);

SelectionBox.displayName = "SelectionBox";
