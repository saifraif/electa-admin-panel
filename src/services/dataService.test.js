import axios from "axios";
import { fetchUsers } from "./dataService";

jest.mock("axios");

describe("dataService", () => {
  test("fetches users successfully", async () => {
    const mockUsers = [{ id: 1, name: "John" }];
    axios.get.mockResolvedValue({ data: mockUsers });

    const result = await fetchUsers();
    expect(result).toEqual(mockUsers);
    expect(axios.get).toHaveBeenCalledWith("/api/users");
  });
});
