import { getUserByClerkId } from "@/lib/queries/users";
import { NextResponse } from "next/server";
export const runtime = "edge";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  try {
    const user = await getUserByClerkId(userId);
    if (user.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user[0], { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
}
