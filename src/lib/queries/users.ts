import { database } from "@/database";
import { profileTable, followingTable } from "@/database/schema";
import { eq, ilike, and } from "drizzle-orm";

export const getUserByClerkId = async (userId: string) => {
  const user = await database
    .select()
    .from(profileTable)
    .where(eq(profileTable.clerk_id, userId));
  return user;
};

export const getUserById = async (userId: number) => {
  const user = await database
    .select()
    .from(profileTable)
    .where(eq(profileTable.id, userId));
  return user;
};
export const createUser = async (
  userId: string,
  userName: string,
  profilePicture: string,
  blurb?: string
) => {
  const user = await database.insert(profileTable).values({
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
    .update(profileTable)
    .set(userDetails)
    .where(eq(profileTable.clerk_id, userId));
  return user;
};

export const getUsersByUserName = async (userName: string, userId: number) => {
  const users = await database
    .select({
      id: profileTable.id,
      user_name: profileTable.user_name,
      profile_picture: profileTable.profile_picture,
      following: followingTable.following_id,
    })
    .from(profileTable)
    .leftJoin(
      followingTable,
      and(
        eq(profileTable.id, userId),
        eq(profileTable.id, followingTable.following_id)
      )
    )
    .where(ilike(profileTable.user_name, `%${userName}%`));
  return users;
};
