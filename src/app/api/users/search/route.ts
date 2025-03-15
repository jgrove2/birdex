import { getUserById, getUsersByUserName } from "@/lib/queries/users";
import { NextResponse } from "next/server";
export const runtime = "edge";
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const userId = searchParams.get("userId");
    if (!search) {
      return NextResponse.json(
        { error: "Search is required" },
        { status: 400 }
      );
    } else if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    } else if (/$[0-9]^/.test(search)) {
      const users = await getUserById(parseInt(search));
      return NextResponse.json(users, { status: 200 });
    } else {
      const users = await getUsersByUserName(search, parseInt(userId));
      return NextResponse.json(users, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
}
