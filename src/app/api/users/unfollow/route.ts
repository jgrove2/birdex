import { unfollowUser } from "@/lib/queries/following";
import { NextResponse } from "next/server";
export const runtime = "edge";
export async function POST(request: Request) {
  try {
    const { userId, followingId } = await request.json();

    if (!userId || !followingId) {
      return NextResponse.json(
        { error: "User ID and Following ID are required" },
        { status: 400 }
      );
    }

    await unfollowUser(userId, followingId);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to unfollow user" },
      { status: 500 }
    );
  }
}
