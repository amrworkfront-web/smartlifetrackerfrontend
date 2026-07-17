import axios from "axios";
import type { AxiosInstance, AxiosError } from "axios";

export interface ApiErrorResponse {
  message?: string;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        const locale = window.location.pathname.split("/")[1] || "en";
        window.location.href = `/${locale}/login`;
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
