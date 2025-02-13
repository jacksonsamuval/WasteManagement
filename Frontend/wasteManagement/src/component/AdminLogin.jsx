import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate to handle redirection
import "./LoginForm.css";

const AdminLogin = ({ onAdminLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook for redirection

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        username,
        password,
      });

      if (response.data.role === "ADMIN") {
        localStorage.setItem("token", response.data.token || response.data);
        localStorage.setItem("username", response.data.username); 
        localStorage.setItem("role", response.data.role); 
        if (onAdminLoginSuccess) onAdminLoginSuccess();  
      } else {
        setError("You do not have admin privileges.");
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error(error);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <div className="logo-container">
          <img src="logo.png" alt="logo" style={{height:65, borderRadius: 10}}/>
          </div>

          <h2>Admin Login</h2>
          <p className="subheading">Please log in to continue</p>

          {error && <div className="error-message">{error}</div>}

          <div className="input-group">
            <input
              type="text"
              className="input-field"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Login
          </button>

          <div className="footer">
            <p>
              Forgot your password? <a href="/reset-password">Reset it</a> 
            </p>
            <br/>
            <p>
              Back to User Login?  <a href="/">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
