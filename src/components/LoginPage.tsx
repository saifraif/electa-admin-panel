import React, { useState } from "react";
import api from "../lib/axios"; // ✅ use central axios instance
import "../App.css";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    params.append("username", email);
    params.append("password", password);

    try {
      // ✅ no need for full URL, api already has baseURL
      const response = await api.post("/admin/login", params);
      const token = response.data.access_token;

      if (token) {
        localStorage.setItem("admin_token", token);
        alert("Login successful!");
        window.location.reload();
      } else {
        alert("Login failed: no token returned.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-form">
      <h2>ELECTA Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
