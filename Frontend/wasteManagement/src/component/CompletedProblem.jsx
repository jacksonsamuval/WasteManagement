import React, { useState, useEffect } from "react";
import { FaMapMarkedAlt, FaEye, FaTrash } from 'react-icons/fa'; // Font Awesome icons

const CompletedProblem = () => {
  const [problemData, setProblemData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showImage, setShowImage] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProblemReports = async () => {
      try {
        const status = "COMPLETED"
        const response = await fetch(`http://localhost:8080/report/getCompleted/${status}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProblemData(data);
        } else {
          const error = await response.json();
          setErrorMessage(`Error: ${error.message}`);
        }
      } catch (error) {
        setErrorMessage("Failed to fetch the report. Please try again.");
        console.error("Error fetching the problem report:", error);
      }
    };

    fetchProblemReports();
  }, [token]);

  const handleViewLocation = (latitude, longitude) => {
    if (latitude && longitude) {
      const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
      window.open(url, "_blank");
    } else {
      setErrorMessage("Location data is unavailable.");
    }
  };

  const handleViewImage = (image) => {
    if (image) {
      const newWindow = window.open("", "_blank");
      newWindow.document.write(`
        <html>
          <head>
            <title>Enhanced Image View</title>
            <style>
              body { text-align: center; background-color: #f4f7fb; padding: 20px; }
              img { max-width: 90%; height: auto; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); }
              h2 { font-size: 24px; color: #333; }
            </style>
          </head>
          <body>
            <h2>Problem Image</h2>
            <img src="data:image/jpeg;base64,${image}" alt="Problem" />
          </body>
        </html>
      `);
    } else {
      setErrorMessage("No image available.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.problemDetails}>
        <header style={styles.headerContainer}>
          <h1 style={styles.header}>Problem Details</h1>
          <p style={styles.subHeader}>Check the status and details of your reported problems</p>
        </header>

        {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}

        {problemData.length > 0 ? (
          <div style={styles.problemContent}>
            {problemData.map((problem, index) => (
              <div key={index} style={styles.problemCard}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>Problem Reported</h3>
                  <div style={styles.statusTag}>{problem.status}</div>
                </div>

                <div style={styles.problemInfo}>
                  <div style={styles.problemColumn}>
                    <p><strong>Description:</strong> {problem.description}</p>
                    <p><strong>Reported By:</strong> {problem.user.name}</p>
                    <p><strong>Email:</strong> {problem.user.email}</p>
                    <p><strong>Mobile No:</strong> {problem.user.mobileNo}</p>
                  </div>

                  <div style={styles.problemColumn}>
                    <p><strong>Location:</strong> Latitude: {problem.latitude}, Longitude: {problem.longitude}</p>
                    <p><strong>Created At:</strong> {new Date(problem.createdAt).toLocaleString()}</p>
                  </div>
                </div>

                <div style={styles.buttonsContainer}>
                  <button onClick={() => handleViewImage(problem.image)} style={styles.viewImageButton}>
                    <FaEye style={styles.icon} />
                    View Image
                  </button>
                  <button onClick={() => handleViewLocation(problem.latitude, problem.longitude)} style={styles.mapButton}>
                    <FaMapMarkedAlt style={styles.icon} />
                    View Location
                  </button>
                </div>

                {showImage && problem.image && (
                  <div style={styles.imageContainer}>
                    <h3 style={styles.imageTitle}>Problem Image:</h3>
                    <img
                      src={`data:image/jpeg;base64,${problem.image}`}
                      alt="Problem"
                      style={styles.image}
                    />
                  </div>
                )}
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
  viewImageButton: {
    backgroundColor: "#17a2b8",
    color: "#fff",
    padding: "12px 24px",
    fontSize: "18px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "200px",
  },
  mapButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "12px 24px",
    fontSize: "18px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "200px",
  },
  imageContainer: {
    marginTop: "20px",
    textAlign: "center",
    maxWidth: "350px",
  },
  imageTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "10px",
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
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

export default CompletedProblem;
