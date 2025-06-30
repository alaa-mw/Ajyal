import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { logoutSuccess } from "../features/auth/Redux/authSlice";
import store from "../store";

const baseAxios = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// Interceptor للردود
baseAxios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      store.dispatch(logoutSuccess());  // logout when token expired
    }
    return Promise.reject(error);
  }
);

// Interceptor للطلبات
baseAxios.interceptors.request.use((config) => {
  // config.baseURL = getDynamicBaseURL();
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface FetchResponse<T> {
  message: string;
  token?: string;
  role?: ["secretariat" | "manager" | "teacher"];
  data: T;
}

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  private request = <TData>(config: AxiosRequestConfig) => {
    return baseAxios
      .request<FetchResponse<TData>>(config)
      .then((res) => res.data)
      .catch((error: AxiosError) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error.response?.data || error);
      });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get = (queryParams:Record<string ,any>  = {}) => {
    const params = new URLSearchParams();
    for (const key in queryParams) {
      if (queryParams[key] !== undefined) {
        params.append(key, queryParams[key]);
      }
    }
    const queryString = params.toString();

    return this.request<T>({ method: "GET", url: queryString ? `${this.endpoint}?${queryString}` : this.endpoint })
  };

  post = (data?: unknown) =>
    this.request<T>({
      method: "POST",
      url: this.endpoint,
      data,
      headers: { "Content-Type": "multipart/form-data" },
    });

  postNoToken = (data?: unknown) =>
    this.request<T>({
      method: "POST",
      url: this.endpoint,
      data,
      headers: { Authorization: undefined },
    });
}

export default APIClient;

// const getDynamicBaseURL = () => {
//   const userRole = localStorage.getItem("userRole");
//   return userRole && rolesConfig[userRole]?.apiPrefix
//     ? `http://127.0.0.1:8000/api${rolesConfig[userRole].apiPrefix}`
//     : "http://127.0.0.1:8000/api";
// };