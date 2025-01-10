import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPlus } from "react-icons/fa";  // Importing the plus icon
import axios from 'axios'; // To make HTTP requests
import "./Navbar.css";

// You can replace this with your own default image
const defaultImageUrl = "https://via.placeholder.com/150"; // Dummy profile image URL

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

  const handleProfilePictureClick = () => {
    document.getElementById("profile-pic-input").click(); // Trigger file input click
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      // Create a FormData object to send the image file
      const formData = new FormData();
      formData.append('file', file);

      try {
        // Send a POST request to upload the image to the server
        const response = await axios.post('http://localhost:8080/user/uploadProfilePicture', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem("token")}`, // Assuming you have JWT token stored
          },
        });

        // After successful upload, save the URL to localStorage and update the state
        const imageUrl = response.data.imageUrl; // Assuming the response contains the image URL
        localStorage.setItem("imageUrl", imageUrl); // Store the image URL in localStorage
        setUser({ ...user, imageUrl }); // Update the user state with the new image URL

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
              <div className="profile-container" onClick={handleProfilePictureClick}>
                <img
                  src={user.imageUrl || defaultImageUrl} // Use the default image if no profile image exists
                  alt={user.username || "Default Avatar"}
                  className="user-avatar"
                />
                {user.imageUrl ? null : (
                  <div className="add-avatar-text">
                    <FaPlus size={24} color="#005bb5" /> {/* Plus icon to add profile picture */}
                    Add Profile Picture
                  </div>
                )}
              </div>
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

      {/* Hidden file input */}
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
