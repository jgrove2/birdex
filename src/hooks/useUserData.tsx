"use client";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/schema";

const fetchUserData = async (
  clerkUserId: string | undefined | null
): Promise<User | undefined> => {
  if (!clerkUserId) {
    return {
      id: 0,
      clerk_id: "",
      user_name: "",
      profile_picture: "",
      blurb: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
  const response = await fetch(`/api/users?userId=${clerkUserId}`);
  const data = await response.json();
  if (data.length === 0) {
    return {
      id: 0,
      clerk_id: clerkUserId,
      user_name: "",
      profile_picture: "",
      blurb: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
  return data;
};

export const useUserData = (clerkUserId: string | undefined | null) => {
  return useQuery({
    queryKey: ["userData", clerkUserId],
    queryFn: () => fetchUserData(clerkUserId),
  });
};
