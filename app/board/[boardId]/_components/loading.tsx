import { Loader } from "lucide-react";

import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";

export const Loading = () => {
  return (
    <main className="h-full w-full relative bg-secondary touch-none flex items-center justify-center">
      <Loader className="w-8 h-8 text-muted-foreground animate-spin" />
      <Info.Skeleton />
      <Participants.Skeleton />
      <Toolbar.Skeleton />
    </main>
  );
};
