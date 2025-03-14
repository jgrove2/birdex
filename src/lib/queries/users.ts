import database from "@/database";
import { usersTable } from "@/database/schema";
import { eq } from "drizzle-orm";

export const getUserByClerkId = async (userId: string) => {
  const user = await database
    .select()
    .from(usersTable)
    .where(eq(usersTable.clerk_id, userId));
  return user;
};

export const getUserById = async (userId: number) => {
  const user = await database
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId));
  return user;
};
export const createUser = async (
  userId: string,
  userName: string,
  profilePicture: string,
  blurb?: string
) => {
  const user = await database.insert(usersTable).values({
    clerk_id: userId,
    user_name: userName,
    blurb: blurb || "",
    profile_picture: profilePicture,
  });
  return user;
};

export const updateUserDetails = async (
  userId: string,
  userDetails: {
    userName: string;
    profilePicture: string;
    blurb: string;
  }
) => {
  const user = await database
    .update(usersTable)
    .set(userDetails)
    .where(eq(usersTable.clerk_id, userId));
  return user;
};
