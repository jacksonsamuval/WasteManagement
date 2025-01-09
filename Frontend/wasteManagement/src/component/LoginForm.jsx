import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css";

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        username,
        password,
      });

      // Store token and user details in localStorage
      localStorage.setItem("token", response.data.token || response.data);
      localStorage.setItem("username", response.data.username); // assuming the response contains the username
      localStorage.setItem("imageUrl", response.data.imageUrl); // assuming the response contains the image URL

      if (onLoginSuccess) onLoginSuccess();
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
            <img src="#" alt="Logo" className="logo" />
          </div>

          <h2>Welcome Back</h2>
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
