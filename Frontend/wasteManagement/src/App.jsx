import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar"; // Import Navbar component
import LoginForm from "./component/LoginForm";
import RegisterForm from "./component/RegisterForm";
import Dashboard from "./component/Dashboard";
import Problem from "./component/Problem"

const App = () => {
  const handleLoginSuccess = () => {
    window.location.href = "/dashboard";
  };

  const handleRegisterSuccess = () => {
    alert("Registration successful! Please log in.");
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar /> {/* Add Navbar here */}
        <Routes>
          <Route
            path="/login"
            element={<LoginForm onLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path="/register"
            element={<RegisterForm onRegisterSuccess={handleRegisterSuccess} />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard/>}
          />
          <Route
            path="/problem"
            element={<Problem/>}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
