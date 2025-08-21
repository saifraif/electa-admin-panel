import api from "../lib/axios"; // ✅ use central axios instance

export async function fetchUsers() {
  const response = await api.get("/users"); // note: api already prefixes /api/v1
  return response.data;
}
