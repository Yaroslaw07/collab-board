"use client";

import React from "react";
import { memo } from "react";

import { useStorage } from "@liveblocks/react/suspense";

import { LayerType } from "@/types/canvas";

import { Text } from "./layer-types/text";
import { Rectangle } from "./layer-types/rectangle";
import { Ellipse } from "./layer-types/ellipse";
import { Note } from "./layer-types/note";

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor: string;
}

export const LayerPreview = memo(
  ({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));

    if (!layer) {
      return null;
    }

    switch (layer.type) {
      case LayerType.Note:
        return (
          <Note
            key={id}
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Text:
        return (
          <Text
            key={id}
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Ellipse:
        return (
          <Ellipse
            key={id}
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case LayerType.Rectangle:
        return (
          <Rectangle
            key={id}
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );

      default:
        console.warn("Unknown layer type", layer.type);
        return null;
    }
  }
);

LayerPreview.displayName = "LayerPreview";
