import React, { useState } from "react";
import axios from "axios";
import "../App.css"; // We'll share the main CSS file for now

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const params = new URLSearchParams();
    params.append("username", email);
    params.append("password", password);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/admin/login",
        params
      );
      const token = response.data.access_token;

      alert("Login successful!");
      localStorage.setItem("admin_token", token);

      // This reloads the page to let the main router redirect to the dashboard
      window.location.reload();
    } catch (error) {
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
}

export default LoginPage;
