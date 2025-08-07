import React, { useState, useEffect } from "react";
import axios from "axios";

function IdeologyManager() {
  const [ideologies, setIdeologies] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Function to fetch the list of ideologies from the backend
  const fetchIdeologies = async () => {
    try {
      const token = localStorage.getItem("admin_token");
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
  };

  // useEffect hook to run fetchIdeologies when the component first loads
  useEffect(() => {
    fetchIdeologies();
  }, []);

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("admin_token");
      await axios.post(
        "http://localhost:8000/api/v1/ideologies",
        { title: newTitle, description: newDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // --- ADJUSTMENT IMPLEMENTED ---
      alert("Ideology created successfully!"); // 1. Give user feedback
      fetchIdeologies(); // 2. Refresh the list
      // --- END ADJUSTMENT ---

      setNewTitle("");
      setNewDescription("");
    } catch (error) {
      console.error("Failed to create ideology", error);
      alert("Failed to create ideology. Check the console for details.");
    }
  };

  return (
    <div>
      <h2>Manage Ideology Checklist</h2>

      {/* Form for creating new ideologies */}
      <form onSubmit={handleCreate}>
        <h3>Create New Ideology Point</h3>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Title (e.g., Judicial Reform)"
          required
        />
        <br />
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Description (optional)"
        />
        <br />
        <button type="submit">Create</button>
      </form>

      <hr />

      {/* List of existing ideologies */}
      <h3>Existing Ideologies</h3>
      <ul>
        {ideologies.map((ideology) => (
          <li key={ideology.id}>{ideology.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default IdeologyManager;
