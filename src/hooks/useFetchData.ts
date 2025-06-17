import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";


export const useFetchData = <TData>(
  endpoint: string
) => {
  const apiClient = new APIClient<TData>(endpoint); // Create a new APIClient instance in the hook
  return useQuery<TData, Error>({
    queryKey: [endpoint],
    queryFn: apiClient.getAll,
  }
  );
};

export default useFetchData;
