import { createUser, getUserByClerkId } from "@/lib/queries/users";
import { NextResponse } from "next/server";
export const runtime = "edge";

export async function POST(request: Request) {
  const { userId, userName, profilePicture } = await request.json();
  try {
    const user = await getUserByClerkId(userId);
    if (user.length > 0) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    await createUser(userId, userName, profilePicture);
    const user_created = await getUserByClerkId(userId);
    if (user_created.length === 0) {
      return NextResponse.json(
        { error: "User creation failed" },
        { status: 500 }
      );
    }
    return NextResponse.json(user_created[0], { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message.toString());
    }
    return NextResponse.json(
      { error: "User creation failed", message: error },
      { status: 500 }
    );
  }
}
