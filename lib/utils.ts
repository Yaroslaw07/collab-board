import React from "react";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Camera } from "@/types/canvas";

const COLORS = [
  "#DC2626",
  "#D97706",
  "#059669",
  "#2563EB",
  "#7C3AED",
  "#F43F5E",
];

export const SELF_COLOR = "#0e776e";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseConnectionIdToColor(connectionId: number): string {
  const random_index = connectionId % COLORS.length;
  return COLORS[random_index];
}

export function parsePointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera
) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
}
