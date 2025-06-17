import { useMutation } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";
import { User } from "../Interfaces/User";

const apiClient = new APIClient<User[]>('/filter');

const useUsers = (filter ) => {
    return useMutation<FetchResponse<User[]>, Error, typeof filter>({
      mutationFn: (filter ) => {
        return apiClient.post(
            filter
        );
      },
    });
  };    

export default useUsers;