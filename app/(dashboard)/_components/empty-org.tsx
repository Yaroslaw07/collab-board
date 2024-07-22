"use client";

import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";
import Image from "next/image";

export const EmptyOrg = () => {
  const { openCreateOrganization } = useClerk();

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="elements.svg" width={300} height={300} alt="Empty" />
      <h2 className="text-2xl font-semibold mt-6">Welcome to Collab Board</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Create an organization to get started
      </p>
      <Button
        size="lg"
        className="mt-4"
        onClick={() => openCreateOrganization()}
      >
        Create Organization
      </Button>
    </div>
  );
};
