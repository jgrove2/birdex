"use client";
import { useQuery } from "@tanstack/react-query";
import { SearchUser } from "@/types/schema";

const fetchFollowers = async (
  userId: number | undefined | null
): Promise<SearchUser[] | undefined> => {
  if (!userId) {
    return [];
  }
  const response = await fetch(`/api/users/followers?userId=${userId}`);
  const data = await response.json();

  return data;
};

export const useFollowers = (userId: number | undefined | null) => {
  return useQuery({
    queryKey: ["followers", userId],
    queryFn: () => fetchFollowers(userId),
  });
};
