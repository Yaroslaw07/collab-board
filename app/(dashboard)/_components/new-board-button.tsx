"use client";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useProModal } from "@/store/use-pro-modal";

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

export const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const router = useRouter();

  const { onOpen } = useProModal();
  const { mutate, pending } = useApiMutation(api.board.create);

  const onClick = async () => {
    try {
      const result = await mutate({
        title: "Untitled",
        orgId,
      });

      console.log(result);

      if (result instanceof Error) {
        throw new Error(result.message);
      }

      toast.success("Board created!");
      router.push(`/board/${result}`);
    } catch (e) {
      toast.error("Failed to create board");
      onOpen();
    }
  };

  return (
    <button
      disabled={disabled || pending}
      onClick={() => onClick()}
      className={cn(
        "rounded-lg group shadow-sm col-span-1 aspect-[100/127] border bg-secondary/20 relative flex flex-col justify-center items-center",
        (disabled || pending) &&
          "opacity-75 hover:opacity-75 cursor-not-allowed"
      )}
    >
      <Plus
        className={cn(
          "opacity-75 group-hover:opacity-100 h-12 w-12 text-primary stroke-2",
          (disabled || pending) && "opacity-45 group-hover:opacity-45"
        )}
      />

      <p
        className={cn(
          "opacity-75 group-hover:opacity-100 font-semibold text-primary text-base mt-2",
          (disabled || pending) && "opacity-45 group-hover:opacity-45"
        )}
      >
        Create Board
      </p>

      {!(disabled || pending) && (
        <>
          <div className="rounded-lg absolute opacity-0 group-hover:opacity-25 transition-opacity h-full w-full bg-black" />
        </>
      )}
    </button>
  );
};
