import { useMutation } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";

export const useSendData = <TData> ( endpoint , data? ) => {
    const apiClient = new APIClient<TData>(endpoint); 
    return useMutation<FetchResponse<TData>, Error, typeof data>({
      mutationFn: (data? ) => {
        console.log("mutate",data);
        return  apiClient.post(
          data
        );
      },
     });
  };    

export default useSendData;
