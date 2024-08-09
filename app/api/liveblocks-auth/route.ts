import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";

import { auth, currentUser } from "@clerk/nextjs/server";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret: process.env.NEXT_PUBLIC_LIVE_BLOCKS_SECRET_API_KEY!,
});

export async function POST(request: Request) {
  console.log(process.env.NEXT_PUBLIC_LIVE_BLOCKS_API_KEY);

  const authorization = await auth();
  const user = await currentUser();

  if (!authorization || !user) {
    return new Response("Unauthorized", { status: 403 });
  }

  const { room } = await request.json();

  console.log("ROOM", room);
  const board = await convex.query(api.board.get, { id: room });

  if (board?.orgId !== authorization.orgId) {
    return new Response("Unauthorized", { status: 403 });
  }

  const userInfo = {
    name: user.firstName || "Teammate",
    picture: user.imageUrl,
  };

  const session = liveblocks.prepareSession(user.id, { userInfo });

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  const { status, body } = await session.authorize();

  console.log("SESSION_INFO", {
    status,
    body,
  });

  return new Response(body, { status });
}
