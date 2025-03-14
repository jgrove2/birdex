import database from "@/database";
import { usersTable, followingTable } from "@/database/schema";
import { eq, ilike, and } from "drizzle-orm";

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

export const getUsersByUserName = async (userName: string, userId: number) => {
  const users = await database
    .select({
      id: usersTable.id,
      user_name: usersTable.user_name,
      profile_picture: usersTable.profile_picture,
      following: followingTable.following_id,
    })
    .from(usersTable)
    .leftJoin(
      followingTable,
      and(
        eq(usersTable.id, userId),
        eq(usersTable.id, followingTable.following_id)
      )
    )
    .where(ilike(usersTable.user_name, `%${userName}%`));
  return users;
};
