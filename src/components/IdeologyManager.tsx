import React, { useState, useEffect, useCallback } from "react"; // 1. Import useCallback
import axios from "axios";

interface Ideology {
  id: string;
  title: string;
  description?: string;
}

const IdeologyManager: React.FC = () => {
  const [ideologies, setIdeologies] = useState<Ideology[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const token = localStorage.getItem("admin_token");

  // 2. Wrap the function in useCallback
  const fetchIdeologies = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/ideologies",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIdeologies(response.data);
    } catch (error) {
      console.error("Failed to fetch ideologies", error);
    }
  }, [token]); // Add token as a dependency for the callback

  // 3. Add fetchIdeologies to the dependency array
  useEffect(() => {
    fetchIdeologies();
  }, [fetchIdeologies]);

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/api/v1/ideologies",
        { title: newTitle, description: newDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Ideology created successfully!");
      fetchIdeologies();
      setNewTitle("");
      setNewDescription("");
    } catch (error) {
      console.error("Failed to create ideology", error);
      alert("Failed to create ideology.");
    }
  };

  return (
    <div>
      <h3>Manage Ideology Checklist</h3>
      <form onSubmit={handleCreate} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Title (e.g., Judicial Reform)"
          required
        />
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Description (optional)"
        />
        <button type="submit">Create New</button>
      </form>

      <h4>Existing Ideologies</h4>
      <ul>
        {ideologies.map((ideology) => (
          <li key={ideology.id}>{ideology.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default IdeologyManager;
