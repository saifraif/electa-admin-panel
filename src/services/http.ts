// Reuse the central axios instance so all requests share the same config/interceptors
import api from "../lib/axios";
import { AxiosError } from "axios";

// Optional: add a global 401 handler here (logout on unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    if (status === 401) {
      localStorage.removeItem("admin_token");
      // TODO: optionally redirect to login route
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
