import { useMutation } from "@tanstack/react-query";

const fetchSearch = async (searchTerm: string, userId: number) => {
  const response = await fetch(
    `/api/users/search?search=${searchTerm}&userId=${userId}`
  );
  const data = await response.json();
  return data;
};

export const useSearch = (searchTerm: string, userId: number) => {
  return useMutation({
    mutationFn: () => fetchSearch(searchTerm, userId),
  });
};
