import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import axios from "axios";
import "./Navbar.css";

const defaultImageUrl = "https://via.placeholder.com/150"; // Dummy profile image URL

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from localStorage or API
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    const imageUrl = localStorage.getItem("imageUrl");

    if (username && role) {
      setUser({ username, role, imageUrl });
    }

    // Listen for changes to localStorage and update the user state accordingly
    const handleStorageChange = () => {
      const username = localStorage.getItem("username");
      const role = localStorage.getItem("role");
      const imageUrl = localStorage.getItem("imageUrl");

      if (username && role) {
        setUser({ username, role, imageUrl });
      } else {
        setUser(null);
      }
    };

    // Attach storage event listener to update state when localStorage changes
    window.addEventListener("storage", handleStorageChange);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // Run only once on component mount

  const toggleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  const handleLogout = () => {
    // Clear localStorage and reset user state
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("imageUrl");
    setUser(null); 
    window.location.reload(); 
    navigate("/"); // Redirect to login page
  };

  const handleProfilePictureClick = () => {
    document.getElementById("profile-pic-input").click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "http://localhost:8080/user/uploadProfilePicture", // Replace with your API endpoint
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const imageUrl = response.data.imageUrl;
        localStorage.setItem("imageUrl", imageUrl); // Update localStorage with the new image URL
        setUser({ ...user, imageUrl }); // Update the user state with the new image URL
        window.location.reload(); // Refresh the page to reflect the new profile picture
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again.");
      }
    }
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
            <h1>WS</h1>
          </div>
        </div>

        <ul className={`nav-links ${isMobile ? "active" : ""}`}>
          {user ? (
            <>
              <li className="user-info">
                <div className="profile-container" onClick={handleProfilePictureClick}>
                  <img
                    src={user.imageUrl || defaultImageUrl}
                    alt={user.username || "Default Avatar"}
                    className="user-avatar"
                  />
                  {user.imageUrl ? null : (
                    <div className="add-avatar-text">
                      <FaPlus size={24} color="#005bb5" />
                      Add Profile Picture
                    </div>
                  )}
                </div>
                <span>
                  Welcome, {user.role === "ADMIN" ? `Admin ${user.username}` : user.username}!
                </span>
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
                <Link to="/" className="nav-link">
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
        </ul>

        <div className="hamburger" onClick={toggleMobileMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>

      <input
        id="profile-pic-input"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </nav>
  );
};

export default Navbar;
