import React from "react";
import IdeologyManager from "../components/IdeologyManager"; // Import the new component

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    window.location.reload();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>ELECTA Admin Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <hr style={{ margin: "1rem 0" }} />

      {/* Render the IdeologyManager component here */}
      <IdeologyManager />
    </div>
  );
};

export default Dashboard;
