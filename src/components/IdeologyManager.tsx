import React, { useState, useEffect, useCallback } from "react";
import api from "../lib/axios"; // ✅ use the central axios instance

interface Ideology {
  id: string;
  title: string;
  description?: string;
}

const IdeologyManager: React.FC = () => {
  const [ideologies, setIdeologies] = useState<Ideology[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Fetch ideologies from backend
  const fetchIdeologies = useCallback(async () => {
    try {
      const response = await api.get("/ideologies");
      setIdeologies(response.data);
    } catch (error) {
      console.error("Failed to fetch ideologies", error);
    }
  }, []);

  useEffect(() => {
    fetchIdeologies();
  }, [fetchIdeologies]);

  // Create new ideology
  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await api.post("/ideologies", {
        title: newTitle,
        description: newDescription,
      });
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
