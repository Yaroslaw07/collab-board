"use client";

import { memo } from "react";

import { useOthersConnectionIds } from "@liveblocks/react/suspense";

import { Cursor } from "./cursor";

const Cursors = () => {
  const ids = useOthersConnectionIds();

  return (
    <>
      {ids.map((id) => (
        <Cursor key={id} connectionId={id} />
      ))}
    </>
  );
};

export const CursorsPresence = memo(() => {
  return (
    <>
      {/* TODO: Pencil draft */}
      <Cursors />
    </>
  );
});

CursorsPresence.displayName = "CursorsPresence";
