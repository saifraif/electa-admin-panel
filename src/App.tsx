import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import IngestPage from "./pages/IngestPage";

const token = localStorage.getItem("access_token"); // or your actual key
const App: React.FC = () => {
  // ✅ Standardize on admin_token
  const adminToken = localStorage.getItem("admin_token");

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={adminToken ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="/"
            element={adminToken ? <DashboardPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/ingest"
            element={token ? <IngestPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
