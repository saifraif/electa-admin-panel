import React from "react";

const DashboardPage: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    window.location.reload();
  };

  return (
    <div>
      <h1>Welcome to the ELECTA Admin Dashboard</h1>
      <p>
        This is where you will manage Charter clauses and other platform
        content.
      </p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DashboardPage;
