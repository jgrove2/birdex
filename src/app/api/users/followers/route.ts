import { NextResponse } from "next/server";
import { getFollowers } from "@/lib/queries/following";
export const runtime = "edge";
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "Missing required userId parameter" },
        { status: 400 }
      );
    }

    const followers = await getFollowers(parseInt(userId));

    return NextResponse.json(followers);
  } catch (error) {
    console.error("Failed to get followers:", error);
    return NextResponse.json(
      { error: "Failed to get followers" },
      { status: 500 }
    );
  }
}
