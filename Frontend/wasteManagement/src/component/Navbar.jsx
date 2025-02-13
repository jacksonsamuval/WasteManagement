import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaViacoin } from "react-icons/fa";
import "./Navbar.css";
import { FaV } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from localStorage
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    const imageUrl = localStorage.getItem("image");

    if (username && role) {
      setUser({ username, role, imageUrl });
    }

    // Listen for changes to localStorage and update the user state accordingly
    const handleStorageChange = () => {
      const username = localStorage.getItem("username");
      const role = localStorage.getItem("role");
      const imageUrl = localStorage.getItem("image");

      if (username && role) {
        setUser({ username, role, imageUrl });
      } else {
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); 

  const toggleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  const handleLogout = () => {
    // Clear localStorage and reset user state
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("image");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          {user && (
            <button className="back-button" onClick={() => navigate(-1)}>
              <FaArrowLeft size={24} color="#005bb5" />
            </button>
          )}
          <div className="navbar-logo">
            <img src="logo-black.png" alt="logo" style={{height:50}}/>
          </div>
        </div>

        <ul className={`nav-links ${isMobile ? "active" : ""}`}>
          {user ? (
            <>
              <li className="user-info">
                {/* <div className="profile-container">
                  {user.imageUrl ? (
                    <img
                      src={user.imageUrl}
                      alt={user.username || "Default Avatar"}
                      className="user-avatar"
                    />
                  ) : (
                    <div className="default-avatar">Default</div>
                  )}
                </div> */}
                <span>
                  Welcome,{" "}
                  {user.role === "ADMIN"
                    ? `Admin ${user.username}`
                    : user.username}
                  !
                </span>
              </li>
              <li>
                <a href="/">
                  <FaHome size={24} color="#000000" />
                </a>
              </li>

              <li>
                <button className="nav-link" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
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
              <li>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
            </>
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
