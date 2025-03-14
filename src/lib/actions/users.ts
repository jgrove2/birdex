"use server";

import { getUserById } from "../queries/users";

export const getUserByIdAction = async (userId: number) => {
  const user = await getUserById(userId);
  return user[0];
};
