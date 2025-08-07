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

const App: React.FC = () => {
  const token = localStorage.getItem("admin_token");

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={token ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route
            path="/"
            element={token ? <DashboardPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
