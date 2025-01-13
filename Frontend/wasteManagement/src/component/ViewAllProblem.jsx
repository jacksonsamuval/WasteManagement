import React, { useState, useEffect } from "react";
import { FaMapMarkedAlt, FaEye, FaTrash } from "react-icons/fa";

const ViewAllProblem = () => {
  const [problemData, setProblemData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProblemReports = async () => {
      try {
        const response = await fetch("http://localhost:8080/report/viewAll", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
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

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:8080/report/updateStatus/${id}/${newStatus}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setSuccessMessage("Status updated successfully!");
        setProblemData((prevData) =>
          prevData.map((problem) =>
            problem.id === id ? { ...problem, status: newStatus } : problem
          )
        );
      } else {
        const error = await response.json();
        setErrorMessage(`Error: ${error.message}`);
      }
    } catch (error) {
      setErrorMessage("Failed to update the status. Please try again.");
      console.error("Error updating status:", error);
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
        {successMessage && <p style={styles.successMessage}>{successMessage}</p>}

        {problemData && problemData.length > 0 ? (
          <div style={styles.problemContent}>
            {problemData.map((problem, index) => (
              <div key={index} style={styles.problemCard}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>Problem Reported</h3>
                  <div style={styles.statusTag}>{problem.status}</div>
                </div>

                <div style={styles.problemInfo}>
                  <div style={styles.problemColumn}>
                    <p>
                      <strong>Description:</strong> {problem.description}
                    </p>
                    <p>
                      <strong>Reported By:</strong> {problem.user.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {problem.user.email}
                    </p>
                    <p>
                      <strong>Mobile No:</strong> {problem.user.mobileNo}
                    </p>
                  </div>

                  <div style={styles.problemColumn}>
                    <p>
                      <strong>Location:</strong> Latitude: {problem.latitude}, Longitude: {problem.longitude}
                    </p>
                    <p>
                      <strong>Created At:</strong> {new Date(problem.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div style={styles.buttonsContainer}>
                  <button onClick={() => handleViewImage(problem.image)} style={styles.viewImageButton}>
                    <FaEye style={styles.icon} />
                    View Image
                  </button>
                  <button
                    onClick={() => handleViewLocation(problem.latitude, problem.longitude)}
                    style={styles.mapButton}
                  >
                    <FaMapMarkedAlt style={styles.icon} />
                    View Location
                  </button>
                </div>

                <div style={styles.updateStatusContainer}>
                  <select
                    onChange={(e) => handleUpdateStatus(problem.id, e.target.value)}
                    style={styles.statusDropdown}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="PENDING">PENDING</option>
                    <option value="PROGRESS">PROGRESS</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                  <button
                    onClick={() => handleUpdateStatus(problem.id, problem.status)}
                    style={styles.updateButton}
                  >
                    Update Status
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={styles.noReportsMessage}>No Reports Available</p>
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
  successMessage: {
    color: "#28a745",
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "20px",
  },
  noReportsMessage: {
    fontSize: "18px",
    color: "#555",
    textAlign: "center",
    marginTop: "20px",
    fontWeight: "600",
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "200px",
  },
  updateStatusContainer: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
  },
  statusDropdown: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  updateButton: {
    backgroundColor: "#ffc107",
    color: "#fff",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
};

export default ViewAllProblem;
