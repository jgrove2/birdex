"use client";
import { useQuery } from "@tanstack/react-query";
import { SearchUser } from "@/types/schema";

const fetchFollowing = async (
  userId: number | undefined | null
): Promise<SearchUser[] | undefined> => {
  if (!userId) {
    return [];
  }
  const response = await fetch(`/api/users/following?userId=${userId}`);
  const data = await response.json();

  return data;
};

export const useFollowing = (userId: number | undefined | null) => {
  return useQuery({
    queryKey: ["following", userId],
    queryFn: () => fetchFollowing(userId),
  });
};
