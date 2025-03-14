import { NextResponse } from "next/server";
import { followUser } from "@/lib/queries/following";

export async function POST(request: Request) {
  try {
    const { followerId, followingId } = await request.json();

    if (!followerId || !followingId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await followUser(followerId, followingId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to follow user:", error);
    return NextResponse.json(
      { error: "Failed to follow user" },
      { status: 500 }
    );
  }
}
