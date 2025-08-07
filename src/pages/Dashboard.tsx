import React from "react";

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    window.location.reload();
  };

  return (
    <div>
      <h1>Welcome to the ELECTA Admin Dashboard</h1>
      <p>This is where the main content and management tools will be.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
