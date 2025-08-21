// src/lib/axios.ts
import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  withCredentials: false,
});

// Attach Authorization: Bearer <admin_token> automatically (Axios v1 types-safe)
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    // headers can be AxiosHeaders (class) or a plain object, depending on Axios internals
    if (config.headers instanceof AxiosHeaders) {
      config.headers.set("Authorization", `Bearer ${token}`);
    } else {
      // fallback for plain object case
      (config.headers as Record<string, string | undefined>) =
        (config.headers as Record<string, string | undefined>) ?? {};
      (config.headers as Record<string, string | undefined>)["Authorization"] =
        `Bearer ${token}`;
    }
  }
  return config;
});

export { API_BASE_URL };
export default api;
