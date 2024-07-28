"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";

export const EmptyBoards = () => {
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.board.create);

  const onClick = async () => {
    if (!organization) return;

    mutate({
      orgId: organization.id,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Board created successfully");
        // TODO: Redirect to new board by id
      })
      .catch((error) => {
        toast.error("Failed to create board");
      });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/note.svg" width={240} height={240} alt="No boards" />
      <h2 className="text-2xl font-semibold mt-6">No boards at all</h2>
      <p className="text-muted-foreground text-sm mt-2">
        {"It's time to create a first one"}
      </p>
      <div className="mt-6">
        <Button disabled={pending} onClick={onClick}>
          Create First Board
        </Button>
      </div>
    </div>
  );
};
