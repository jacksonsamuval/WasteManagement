import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";  // Importing the left arrow icon from react-icons
import "./Navbar.css";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // useNavigate for redirection

  useEffect(() => {
    // Check if the user is logged in by checking localStorage
    const username = localStorage.getItem("username");
    const imageUrl = localStorage.getItem("imageUrl");

    if (username && imageUrl) {
      setUser({ username, imageUrl });
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  const handleLogout = () => {
    // Clear user data and token from localStorage on logout
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("imageUrl");
    setUser(null); // Reset user state

    // Redirect to login page after logout
    navigate("/login");
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          {/* Back Button */}
          {user && (
            <button className="back-button" onClick={handleBack}>
              <FaArrowLeft size={24} color="#005bb5" />
            </button>
          )}

          <div className="navbar-logo">
            <h1>WS</h1> {/* Replace with your logo or app name */}
          </div>
        </div>

        <ul className={`nav-links ${isMobile ? "active" : ""}`}>
          {user ? (
            // Display user's name and image if logged in
            <li className="user-info">
              <img src={user.imageUrl} alt={user.username} className="user-avatar" />
              <span>{user.username}</span>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
            </>
          )}
          {user && (
            <li>
              <button className="nav-link" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>

        <div className="hamburger" onClick={toggleMobileMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
