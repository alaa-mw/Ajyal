import { useQuery } from "@tanstack/react-query";
import APIClient, { FetchResponse } from "../services/api-client";

// Implementation
export const useLazyFetch = <TData>(endpoint: string, options={}) => {
  const apiClient = new APIClient<TData>(endpoint);
  
  return useQuery<FetchResponse<TData>, Error>({
    queryKey: [endpoint],
    queryFn: (context) => {
      const queryParams = context.meta?.queryParams || {};
      return  apiClient.get(queryParams);
    },
    enabled: false,
    ...options// هذه الطريقة يمكنك تمرير خيارات إضافية مثل onSuccess و onError عند الحاجة.
  });
};

{
    /*
 استخدم useLazyFetch مع تعطيل الجلب التلقائي
  const { refetch: fetchTAd } = useLazyFetch<Advertisement[]>(
    "/advertisement/teacherAdvertisements",
    {
      onSuccess: (data) => setAdsData(data?.data || []),
      enabled: false // تعطيل الجلب التلقائي
    }
  );
    */
}
