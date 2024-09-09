"use client";

import { Hint } from "@/components/hint";
import { useClerk } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import React from "react";

export const NewButton = () => {
  const { openCreateOrganization } = useClerk();

  return (
    <div className="aspect-square" onClick={() => openCreateOrganization()}>
      <Hint
        label="Create organization"
        side="right"
        align="start"
        sideOffset={18}
      >
        <button className="bg-background/25 h-full w-full rounded-md border-2 border-secondary flex items-center justify-center opacity-60 hover:opacity-100 transition">
          <Plus className="text-white"></Plus>
        </button>
      </Hint>
    </div>
  );
};
