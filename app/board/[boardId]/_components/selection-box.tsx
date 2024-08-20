"use client";

import { memo } from "react";

import { LayerType, Side, XYWH } from "@/types/canvas";
import { useSelf, useStorage } from "@liveblocks/react/suspense";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import ResizeHandle from "./resize-handle";

const HANDLE_WIDTH = 8;

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

    const handlePointerDown = (e: React.PointerEvent<SVGRectElement>) => {
      // TODO: Add resize handle pointer down logic
    };

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
              onPointerDown={handlePointerDown}
            />
            {/* Top-middle */}
            <ResizeHandle
              cursor="ns-resize"
              x={bounds.x + bounds.width / 2}
              y={bounds.y}
              onPointerDown={handlePointerDown}
            />
            {/* Top-right corner */}
            <ResizeHandle
              cursor="nesw-resize"
              x={bounds.x + bounds.width}
              y={bounds.y}
              onPointerDown={handlePointerDown}
            />
            {/* Middle-left */}
            <ResizeHandle
              cursor="ew-resize"
              x={bounds.x}
              y={bounds.y + bounds.height / 2}
              onPointerDown={handlePointerDown}
            />
            {/* Middle-right */}
            <ResizeHandle
              cursor="ew-resize"
              x={bounds.x + bounds.width}
              y={bounds.y + bounds.height / 2}
              onPointerDown={handlePointerDown}
            />
            {/* Bottom-left corner */}
            <ResizeHandle
              cursor="nesw-resize"
              x={bounds.x}
              y={bounds.y + bounds.height}
              onPointerDown={handlePointerDown}
            />
            {/* Bottom-middle */}
            <ResizeHandle
              cursor="ns-resize"
              x={bounds.x + bounds.width / 2}
              y={bounds.y + bounds.height}
              onPointerDown={handlePointerDown}
            />
            {/* Bottom-right corner */}
            <ResizeHandle
              cursor="nwse-resize"
              x={bounds.x + bounds.width}
              y={bounds.y + bounds.height}
              onPointerDown={handlePointerDown}
            />
          </>
        )}
      </>
    );
  }
);

SelectionBox.displayName = "SelectionBox";
