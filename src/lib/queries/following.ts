import database from "@/database";
import { followingTable, usersTable } from "@/database/schema";
import { and, eq } from "drizzle-orm";

export const getFollowing = async (userId: number) => {
  const following = await database
    .select()
    .from(followingTable)
    .leftJoin(usersTable, eq(followingTable.user_id, usersTable.id))
    .where(eq(followingTable.following_id, userId));
  return following;
};

export const getFollowers = async (userId: number) => {
  const followers = await database
    .select()
    .from(followingTable)
    .leftJoin(usersTable, eq(followingTable.following_id, usersTable.id))
    .where(eq(followingTable.user_id, userId));
  return followers;
};

export const followUser = async (userId: number, followingId: number) => {
  const following = await database.insert(followingTable).values({
    user_id: userId,
    following_id: followingId,
  });
  return following;
};

export const unfollowUser = async (userId: number, followingId: number) => {
  const following = await database
    .delete(followingTable)
    .where(
      and(
        eq(followingTable.user_id, userId),
        eq(followingTable.following_id, followingId)
      )
    );
  return following;
};
