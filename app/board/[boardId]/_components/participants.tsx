"use client";

import { useOthers, useSelf } from "@liveblocks/react/suspense";

import { UserAvatar } from "./user-avatar";

import { parseConnectionIdToColor, SELF_COLOR } from "@/lib/utils";
import { TabSeparator } from "./tab-separator";

const MAX_SHOWN_USERS = 2;

export const Participants = () => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > MAX_SHOWN_USERS;

  return (
    <div className="absolute h-12 top-2 right-2 bg-background rounded-md p-3 flex items-center shadow-md">
      <div className="flex gap-x-2 items-center">
        {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              borderColor={parseConnectionIdToColor(connectionId)}
              key={connectionId}
              src={info.picture}
              name={info?.name}
              fallback={info?.name?.[0] || "T"}
            />
          );
        })}

        {hasMoreUsers && (
          <UserAvatar
            name={`${users.length - MAX_SHOWN_USERS} more`}
            fallback={`+${users.length - MAX_SHOWN_USERS}`}
          />
        )}

        {users.length > 0 && <TabSeparator />}

        {currentUser && (
          <UserAvatar
            borderColor={SELF_COLOR}
            src={currentUser.info?.picture}
            name={`${currentUser.info?.name} (You)`}
            fallback={currentUser.info?.name?.[0]}
          />
        )}
      </div>
    </div>
  );
};

export const ParticipantsSkeleton = () => {
  return (
    <div className="absolute h-12 top-2 right-2 bg-background rounded-md p-3 flex items-center shadow-md w-[120px]" />
  );
};
