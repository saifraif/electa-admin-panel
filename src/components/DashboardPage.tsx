import React from "react";
import IdeologyManager from "./IdeologyManager";
import ComplianceManager from "./ComplianceManager"; // 1. Import the new component

const DashboardPage: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    window.location.reload();
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <h1>ELECTA Admin Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <hr />

      <div style={{ padding: "1rem", display: "flex", gap: "2rem" }}>
        <div style={{ flex: 1 }}>
          <IdeologyManager />
        </div>
        <div style={{ flex: 1 }}>
          {/* 2. Render the new component here */}
          <ComplianceManager />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
