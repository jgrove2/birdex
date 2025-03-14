import { NextResponse } from "next/server";
import { getFollowing } from "@/lib/queries/following";

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

    const following = await getFollowing(parseInt(userId));

    return NextResponse.json(following);
  } catch (error) {
    console.error("Failed to get following:", error);
    return NextResponse.json(
      { error: "Failed to get following" },
      { status: 500 }
    );
  }
}
