// import axios, { AxiosRequestConfig } from "axios";
// import { rolesConfig } from "../rolesConfig";

// const userRole = localStorage.getItem("userRole") ;
// const axiosInstance = axios.create({
//     baseURL: userRole ? `http://127.0.0.1:8000/api/${rolesConfig[userRole].endpoint}`
//                      :`http://127.0.0.1:8000/api`,
// });

// export interface FetchResponse<T>{
//     message: string;
//     token?:string;
//     data?: T;
// }

// class apiClient <T>{
    
//     endpoint: string;
//     token : string | null;
    
//     constructor(endpoint: string){
//         this.endpoint = endpoint;
//         this.token = localStorage.getItem("authToken");
//     }
//     //arrow func is needed

//     postNoToken = (data?) =>{
//         return axiosInstance
//         .post<FetchResponse<T>>(this.endpoint, data)
//         .then((res)=> res.data)
//         .catch((error) => {
//             return Promise.reject(error.response.data); // Propagate the error
//         });
//     }

//     get = () => {
//         return axiosInstance.get<FetchResponse<T>>(this.endpoint,{
//             headers: {
//                 Authorization: `Bearer ${this?.token}`, 
//             },
//         })
//         .then((res)=> res.data)
//         .catch((error => error));
//     }

//     post = (data?) => {
        
//         const axiosConfig: AxiosRequestConfig = {
//             headers: {
//                 Authorization: `Bearer ${this?.token}`, 
//                 'Content-Type': 'multipart/form-data',
//                 // for upload multi images
//             }
//         };

//         console.log("Data sent to server:", data); 
//         console.log(axiosConfig);

//         return axiosInstance
//         .post<FetchResponse<T>>(this.endpoint, data, axiosConfig)
//         .then((res)=> res.data)
//         .catch((error) => {
//             console.error("API error:", error);
//             return Promise.reject(error.response.data); // Propagate the error
//         });
        
//     }
// }
// export default apiClient;

import axios, { AxiosRequestConfig } from "axios";
import { rolesConfig } from "../rolesConfig";

const baseAxios = axios.create({
  baseURL: "http://127.0.0.1:8000/api", 
});

const getDynamicBaseURL = () => {
  const userRole = localStorage.getItem("userRole");
  return userRole && rolesConfig[userRole]?.endpoint
    ? `http://127.0.0.1:8000/api${rolesConfig[userRole].endpoint}`
    : "http://127.0.0.1:8000/api";
};

// Interceptor to dynamically set `baseURL` and `Authorization` before each request
baseAxios.interceptors.request.use((config) => {
  // Update baseURL based on current role
  config.baseURL = getDynamicBaseURL();

  // Attach latest token (avoid stale token issues)
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export interface FetchResponse<T> {
  message: string;
  token?: string;
  data?: T;
}

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  // Generic request method (reusable for GET/POST/PUT/DELETE)
  private request = <TData>(config: AxiosRequestConfig) => {
    return baseAxios
      .request<FetchResponse<TData>>(config) //ترسل الطلب إلى السيرفر باستخدام الإعدادات 
      .then((res) => res.data)
      .catch((error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error.response?.data || error);
      });
  };

  get = () => this.request<T>({ method: "GET", url: this.endpoint });

  post = (data?: unknown) =>
    this.request<T>({
      method: "POST",
      url: this.endpoint,
      data,
      headers: { "Content-Type": "multipart/form-data" }, // Adjust as needed
    });

  postNoToken = (data?: unknown) =>
    this.request<T>({
      method: "POST",
      url: this.endpoint,
      data,
      headers: { Authorization: undefined }, // Explicitly remove token
    });
}

export default APIClient;