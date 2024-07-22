import { Button } from "@/components/ui/button";
import Image from "next/image";

export const EmptyBoards = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/note.svg" width={240} height={240} alt="No boards" />
      <h2 className="text-2xl font-semibold mt-6">No boards at all</h2>
      <p className="text-muted-foreground text-sm mt-2">
        It's time to create a first one
      </p>
      <div className="mt-6">
        <Button>Create First Board</Button>
      </div>
    </div>
  );
};
