import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";


export const useFetchDataId = <TData>(
    endpoint: string,
    id?: string
) => {
    const apiClient = new APIClient<TData>(endpoint); 
    return useQuery<TData, Error>({
        queryKey: [endpoint, id], 
        queryFn: apiClient.getAll,
        enabled: !!id, // Only enable the query if id is truthy
    });
};


export default useFetchDataId;