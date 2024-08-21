"use client";

import { memo } from "react";

import { useSelf } from "@liveblocks/react/suspense";
import { useMutation } from "@liveblocks/react/suspense";

import { Camera, Color } from "@/types/canvas";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { ColorPicker } from "./color-picker";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";
import { TabSeparator } from "./tab-separator";

interface SelectionToolsProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}

export const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection);

    const moveToFront = useMutation(
      ({ storage }) => {
        const liveLayersIds = storage.get("layerIds");
        const indices: number[] = [];

        const arr = liveLayersIds.toArray();

        for (let i = 0; i < arr.length; i++) {
          if (selection.includes(arr[i])) {
            indices.push(i);
          }
        }

        for (let i = indices.length - 1; i >= 0; i--) {
          liveLayersIds.move(
            indices[i],
            arr.length - 1 - (indices.length - 1 - i)
          );
        }
      },
      [selection]
    );

    const moveToBack = useMutation(
      ({ storage }) => {
        const liveLayersIds = storage.get("layerIds");
        const indices: number[] = [];

        const arr = liveLayersIds.toArray();

        for (let i = 0; i < arr.length; i++) {
          if (selection.includes(arr[i])) {
            indices.push(i);
          }
        }

        for (let i = 0; i < indices.length; i++) {
          liveLayersIds.move(indices[i], 0);
        }
      },
      [selection]
    );

    const setFill = useMutation(
      ({ storage }, fill: Color) => {
        const liveLayers = storage.get("layers");

        setLastUsedColor(fill);

        selection.forEach((layerId) => {
          liveLayers.get(layerId)?.set("fill", fill);
        });
      },
      [selection, setLastUsedColor]
    );

    const deleteLayers = useDeleteLayers();

    const selectionBounds = useSelectionBounds();

    if (!selectionBounds) return null;

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;

    return (
      <div
        className="absolute p-3 rounded-xl bg-background shadow-sm border flex select-none items-center"
        style={{
          transform: `translate(calc(${x}px - 50%), calc(${y - 16}px - 100%))`,
        }}
      >
        <ColorPicker onChange={setFill} />
        <TabSeparator />
        <div className="flex flex-col gap-0.5 ">
          <Hint label="Bring to front">
            <Button variant="board" size="icon" onClick={moveToFront}>
              <BringToFront />
            </Button>
          </Hint>
          <Hint label="Send to back" side="bottom">
            <Button variant="board" size="icon" onClick={moveToBack}>
              <SendToBack />
            </Button>
          </Hint>
        </div>
        <TabSeparator />
        <div className="flex items-center pl-2 ml-2">
          <Hint label="Delete" side="right">
            <Button variant="board" size="icon" onClick={deleteLayers}>
              <Trash2 />
            </Button>
          </Hint>
        </div>
      </div>
    );
  }
);

SelectionTools.displayName = "SelectionTools";
