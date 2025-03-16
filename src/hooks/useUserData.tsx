"use client";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/schema";
import { ClerkUser } from "@/types/clerk";
import { register } from "./useRegister";
const fetchUserData = async (
  user: ClerkUser | undefined | null
): Promise<User | undefined> => {
  if (!user?.id) {
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
  const response = await fetch(`/api/users?userId=${user.id}`);
  if (response.status === 404) {
    const response_register = await register(
      user.id,
      user.fullName,
      user.imageUrl,
      user.username
    );
    if (response_register.ok) {
      const response_data = await response_register.json();
      return {
        id: response_data.id,
        clerk_id: response_data.clerk_id,
        user_name: response_data.user_name,
        profile_picture: response_data.profile_picture,
        blurb: response_data.blurb,
        createdAt: response_data.createdAt,
        updatedAt: response_data.updatedAt,
      };
    } else {
      throw new Error("Failed to register user");
    }
  }
  const data = await response.json();
  return data;
};

export const useUserData = (user: ClerkUser | undefined | null) => {
  return useQuery({
    queryKey: ["userData", user],
    queryFn: () => fetchUserData(user),
  });
};
