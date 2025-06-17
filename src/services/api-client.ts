import axios, { AxiosRequestConfig } from "axios";
import Cookies from "universal-cookie";

const axiosInstance = axios.create({
    // baseURL:'http://192.168.232.186:8000/api/',
    baseURL:'http://127.0.0.1:8000/api/',
});

export interface FetchResponse<T>{
    message: String;
    data: T;
}

class apiClient <T>{
    
    endpoint: string;

    constructor(endpoint: string){
        this.endpoint=endpoint;
    }
    //arrow func is needed
    getAll = () => {
        
  const cookies = new Cookies()
        const token = cookies.get("authToken");
        return axiosInstance.get<FetchResponse<T>>(this.endpoint,{
            headers: {
                Authorization: `Bearer ${token}`, // Include token in Authorization header
            },
        }).then((res)=> res.data)
            .catch((error => error));
        
    }

    post = (data?) => {
        const cookies = new Cookies()
        const token = cookies.get("authToken");
        
        const axiosConfig: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`, 
                'Content-Type': 'multipart/form-data',
                // for upload multi images
            }
          };
          console.log("Data sent to server:", data); 
          console.log(axiosConfig);
        return axiosInstance
        .post<FetchResponse<T>>(this.endpoint, data, axiosConfig)
        .then((res)=> res.data)
        .catch((error) => {
            console.error("API error:", error);
            return Promise.reject(error.response.data); // Propagate the error
        });
        
    }
}
export default apiClient;

