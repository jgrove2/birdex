import { updateUserDetails } from "@/lib/queries/users";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId, userName, profilePicture, blurb } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const userDetails = {
      userName,
      profilePicture,
      blurb,
    };

    await updateUserDetails(userId, userDetails);

    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
