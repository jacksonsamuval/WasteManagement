import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar"; // Import Navbar component
import LoginForm from "./component/LoginForm";
import RegisterForm from "./component/RegisterForm";
import Dashboard from "./component/Dashboard";
import Problem from "./component/Problem"
import ViewProblem from "./component/ViewProblem";
import CompletedProblem from "./component/CompletedProblem";
import AdminDashboard from "./component/AdminDashboard";
import AdminLogin from "./component/AdminLogin"
import ViewAllProblem from "./component/ViewAllProblem";
import ViewAllCompletedProblem from "./component/viewAllCompletedProblem";
import ViewAllUser from "./component/ViewAllUser";
import HomePage from "./pages/HomePage";

const App = () => {
  const handleLoginSuccess = () => {
    window.location.href = "/dashboard";
  };

  const handleAdminLoginSuccess = () => {
    window.location.href = "/adminDashboard";
  };

  const handleRegisterSuccess = () => {
    alert("Registration successful! Please Login.");
    window.location.href = "/login";
  };

  return (
    <Router>
      <div className="app-container">
        
        <Navbar/> 
        <Routes>
          <Route
            path="/login"
            element={<LoginForm onLoginSuccess={handleLoginSuccess} />}
          />

          <Route
            path="/"
            element={<HomePage />}
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
            path="adminDashboard"
            element={<AdminDashboard/>}
          />
          <Route
            path="/problem"
            element={<Problem/>}
          />
          <Route
            path="/viewProblem"
            element={<ViewProblem/>}
          />
          <Route 
            path="/completedProblem"
            element={<CompletedProblem/>}
          />
          <Route 
            path="/adminLogin"
            element={<AdminLogin onAdminLoginSuccess={handleAdminLoginSuccess}/>}
          />
          <Route 
            path="/viewAllProblem"
            element={<ViewAllProblem/>}
          />
          <Route 
            path="/viewAllCompletedProblem"
            element={<ViewAllCompletedProblem />}
          />
          <Route 
            path="/viewUsers"
            element={<ViewAllUser />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
