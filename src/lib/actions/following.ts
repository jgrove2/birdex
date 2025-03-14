"use server";
import {
  followUser,
  getFollowers,
  getFollowing,
  unfollowUser,
} from "../queries/following";

export const followAction = async (userId: number, followingId: number) => {
  const following = await followUser(userId, followingId);
  return following;
};

export const unfollowAction = async (userId: number, followingId: number) => {
  const following = await unfollowUser(userId, followingId);
  return following;
};

export const getFollowersAction = async (userId: number) => {
  const followers = await getFollowers(userId);
  return followers;
};

export const getFollowingAction = async (userId: number) => {
  const following = await getFollowing(userId);
  return following;
};
