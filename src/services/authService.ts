import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Match your backend URL

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  localStorage.setItem("token", response.data.token);
  axios.defaults.headers.common["x-auth-token"] = response.data.token; // Auto-attach to future requests
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["x-auth-token"];
};

export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  // Decode token without verification (for frontend only)
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(atob(base64));
};
