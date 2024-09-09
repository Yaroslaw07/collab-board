import { Loader } from "lucide-react";

import { InfoSkeleton } from "./info";
import { ParticipantsSkeleton } from "./participants";
import { ToolbarSkeleton } from "./toolbar";
import { ThemeButtonSkeleton } from "./theme-button";

export const Loading = () => {
  return (
    <main className="h-full w-full relative bg-muted touch-none flex items-center justify-center">
      <Loader className="w-8 h-8 text-muted-foreground animate-spin" />
      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolbarSkeleton />
      <ThemeButtonSkeleton />
    </main>
  );
};
