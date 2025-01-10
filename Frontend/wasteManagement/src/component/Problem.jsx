import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Importing useNavigate

// Enhanced styling with clean lines, rounded edges, and soft gradients
const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "40px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1), 0 8px 32px rgba(0, 0, 0, 0.05)",
    textAlign: "center",
  },
  header: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "30px",
    letterSpacing: "0.5px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputContainer: {
    position: "relative",
  },
  label: {
    fontSize: "14px",
    color: "#888",
    fontWeight: "500",
    marginBottom: "5px",
    textAlign: "left",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "12px 20px",
    fontSize: "16px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    backgroundColor: "#f8f8f8",
    transition: "border 0.3s ease, box-shadow 0.3s ease",
    outline: "none",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  inputFocus: {
    borderColor: "#0072ff",
    boxShadow: "0 4px 12px rgba(76, 175, 80, 0.2)",
  },
  button: {
    padding: "12px 24px",
    fontSize: "16px",
    backgroundColor: "#0072ff",  // Initial blue color
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s", // Smooth transition for background and transform
    fontWeight: "600",
    letterSpacing: "1px",
  },
  buttonHover: {
    backgroundColor: "#005bb5",  // Dark blue background for hover
    transform: "scale(1.05)",  // Slight scaling effect on hover
  },

  error: {
    color: "#f44336",
    fontSize: "14px",
    marginTop: "-10px",
    marginBottom: "20px",
  },
};

const Dashboard = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // State for the image file
  const [errorMessage, setErrorMessage] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();  // Initialize navigate

  // Get the user's current location (latitude and longitude)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          setErrorMessage("Failed to get your location.");
        }
      );
    } else {
      setErrorMessage("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!latitude || !longitude || !description || !image) {
      setErrorMessage("All fields are required!");
      return;
    }

    setErrorMessage(""); // Reset error message

    // FormData to handle the image file
    const formData = new FormData();
    formData.append("description", description);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:8080/user/report", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert("Problem reported successfully!");
        // Clear form fields after successful submission
        setLatitude("");
        setLongitude("");
        setDescription("");
        setImage(null);

        // Redirect to the dashboard
        navigate("/dashboard"); // Replace '/dashboard' with your actual route for the dashboard page
      } else {
        const error = await response.json();
        setErrorMessage(`Failed to report the problem: ${error.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Error reporting the problem. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Submit a New Problem</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Latitude: (Allow location Access to Procees)</label>
          <input
            style={{
              ...styles.input,
              ...(latitude && styles.inputFocus), // Apply focus style conditionally
            }}
            type="text"
            value={latitude}
            readOnly // Make latitude read-only as it is auto-detected
          />
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Longitude:</label>
          <input
            style={{
              ...styles.input,
              ...(longitude && styles.inputFocus),
            }}
            type="text"
            value={longitude}
            readOnly // Make longitude read-only as it is auto-detected
          />
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Description:</label>
          <textarea
            style={{
              ...styles.input,
              height: "100px",
              resize: "none",
              ...(description && styles.inputFocus),
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Upload Image:</label>
          <input
            style={styles.input}
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])} // Set image state with the uploaded file
          />
        </div>

        {errorMessage && <p style={styles.error}>{errorMessage}</p>}

        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#005bb5")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#0072ff")}
        >
          Submit Problem
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
