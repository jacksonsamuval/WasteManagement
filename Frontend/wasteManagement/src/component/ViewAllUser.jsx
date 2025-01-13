import React, { useState, useEffect } from "react";
import { FaMapMarkedAlt, FaEye } from 'react-icons/fa';

const ViewAllUser = () => {
  const [userData, setUserData] = useState([]); // Renaming problemData to userData
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8080/user/getAllUser", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data); // Store the response data into userData
        } else {
          const error = await response.json();
          setErrorMessage(`Error: ${error.message}`);
        }
      } catch (error) {
        setErrorMessage("Failed to fetch the report. Please try again.");
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [token]);


  return (
    <div style={styles.container}>
      <div style={styles.problemDetails}>
        <header style={styles.headerContainer}>
          <h1 style={styles.header}>All Users</h1>
          <p style={styles.subHeader}>Details of all users registered in the system</p>
        </header>

        {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}

        {userData.length > 0 ? (
          <div style={styles.problemContent}>
            {userData.map((user, index) => (
              <div key={index} style={styles.problemCard}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>User: {user.name}</h3>
                  <div style={styles.statusTag}>{user.role}</div>
                </div>

                <div style={styles.problemInfo}>
                  <div style={styles.problemColumn}>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Mobile No:</strong> {user.mobileNo}</p>
                  </div>

                  <div style={styles.problemColumn}>
                    <p><strong>Role:</strong> {user.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={styles.loadingMessage}>Loading...</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f7fb",
    minHeight: "100vh",
    fontFamily: "'Roboto', sans-serif",
    padding: "30px",
  },
  problemDetails: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "30px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "900px",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    maxHeight: "80vh",
    overflowY: "auto",
  },
  headerContainer: {
    textAlign: "center",
    marginBottom: "30px",
  },
  header: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "10px",
  },
  subHeader: {
    fontSize: "18px",
    color: "#777",
    marginBottom: "20px",
  },
  errorMessage: {
    color: "#f44336",
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "20px",
  },
  problemContent: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  problemCard: {
    backgroundColor: "#fafafa",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  cardTitle: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#333",
  },
  statusTag: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "4px",
    fontWeight: "600",
    fontSize: "14px",
  },
  problemInfo: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    marginBottom: "20px",
  },
  problemColumn: {
    flex: 1,
    minWidth: "30%",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "15px",
    marginTop: "20px",
  },
  icon: {
    fontSize: "20px",
    marginRight: "10px",
  },
  loadingMessage: {
    fontSize: "16px",
    color: "#888",
  },
};

export default ViewAllUser;
