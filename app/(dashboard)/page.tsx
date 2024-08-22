"use client";

import { useOrganization } from "@clerk/nextjs";
import { EmptyOrg } from "./_components/empty-org";
import { BoardList } from "./_components/board-list";
import { useSearchParams } from "next/navigation";

export default function DashboardPage() {
  const params = useSearchParams();

  const { organization } = useOrganization();

  return (
    <div className=" flex-1 h-[calc(100%-80px)] p-4 overflow-auto">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList orgId={organization.id} query={params} />
      )}
    </div>
  );
}
