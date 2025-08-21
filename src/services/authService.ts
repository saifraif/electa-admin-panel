import api from "../lib/axios";

/**
 * Admin login
 * - Sends credentials to /admin/login (FastAPI typically expects form data: username/password)
 * - Saves JWT to localStorage under "admin_token"
 * - Returns the raw response payload (so caller can read roles/claims if provided)
 */
export const login = async (email: string, password: string) => {
  const params = new URLSearchParams();
  params.append("username", email);
  params.append("password", password);

  const res = await api.post("/admin/login", params);
  const token: string | undefined = res?.data?.access_token;

  if (token) {
    localStorage.setItem("admin_token", token);
  } else {
    throw new Error("Login succeeded but no access_token was returned.");
  }

  return res.data;
};

/**
 * Admin logout
 * - Removes "admin_token" from localStorage
 * - No need to touch axios defaults; the api interceptor reads the token per request
 */
export const logout = () => {
  localStorage.removeItem("admin_token");
};

/**
 * Decode current admin JWT (unsafe decode; frontend only)
 * - Returns the decoded payload or null if missing/invalid
 */
export const getCurrentUser = () => {
  const token = localStorage.getItem("admin_token");
  if (!token) return null;

  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;

    // Fix base64 padding and URL-safe characters
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);

    const json = atob(padded);
    return JSON.parse(json);
  } catch {
    return null;
  }
};
