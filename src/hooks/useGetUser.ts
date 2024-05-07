import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "../api/comments";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchCurrentUser,
    staleTime: Infinity,
  });
};
