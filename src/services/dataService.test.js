import api from "../lib/axios"; // ✅ mock the central axios instance
import { fetchUsers } from "./dataService";

jest.mock("../lib/axios");

describe("dataService", () => {
  test("fetches users successfully", async () => {
    const mockUsers = [{ id: 1, name: "John" }];
    api.get.mockResolvedValue({ data: mockUsers });

    const result = await fetchUsers();
    expect(result).toEqual(mockUsers);
    expect(api.get).toHaveBeenCalledWith("/users");
  });
});
