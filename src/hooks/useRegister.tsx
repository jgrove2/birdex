import { useMutation } from "@tanstack/react-query";

export const register = async (
  userId: string,
  userName: string,
  profilePicture: string,
  blurb?: string
) => {
  const response = await fetch("/api/register", {
    method: "POST",
    body: JSON.stringify({ userId, userName, profilePicture, blurb }),
  });
  return response.json();
};

export const useRegister = (
  userId: string,
  userName: string,
  profilePicture: string,
  blurb?: string
) => {
  return useMutation({
    mutationFn: () => register(userId, userName, profilePicture, blurb),
  });
};
