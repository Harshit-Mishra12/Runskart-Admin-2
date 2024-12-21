import React, { useState } from "react";
import CustomButton from "../components/common/CustomButton"; // Assuming you already have a CustomButton component
import styles from "./FAQ.module.css"; // Reusing the existing styles
import API_URL from "../config";
import Snackbar from "../components/common/Snackbar";

const TermsAndConditionUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [snackbarSeverity, setSnackbarSeverity] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setMessage(""); // Clear any previous message
    } else {
      setMessage("Only PDF files are allowed.");
    }
  };

  const handleUpload = async () => {
    setIsLoading(true);
    if (!selectedFile) {
      setMessage("Please select a file before uploading or select correct file.");
      setIsLoading(false);
      return;
    }

    const token = JSON.parse(localStorage.getItem("token"));

    if (!token) {
      setMessage("Authorization token is missing. Please log in again.");
      setIsLoading(false);
      return;
    }

    const config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        `${API_URL}/admin/uploadTermsAndConditions`,
        {
          ...config,
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        setIsLoading(false);
        setMessage(result.message || "File uploaded successfully!");
        setSnackbarMessage("File uploaded successfully!");
        setSnackbarSeverity("success");

        // Clear the selected file after successful upload
        setSelectedFile(null);
        document.getElementById("fileInput").value = "";  // This ensures the file input is also reset
      } else {
        const errorResponse = await response.json();
        setSnackbarMessage("Failed to upload the file. Please try again!");
        setSnackbarSeverity("error");
        setMessage(errorResponse.message || "Failed to upload the file. Please try again.");
      }
    } catch (error) {
      setIsLoading(false);
      setSnackbarMessage("An error occurred while uploading the file. Please try again!");
      setSnackbarSeverity("error");
      console.error("Error during file upload:", error);
      setMessage("An error occurred while uploading the file. Please try again later.");
    }
  };

  return (
    <div className={styles.faqContainer}>
      {snackbarMessage && (
        <Snackbar
          message={snackbarMessage}
          severity={snackbarSeverity}
          onClose={() => setSnackbarMessage(null)}
        />
      )}

      <div className={styles.statsBar}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Terms and Conditions</span>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <input
          id="fileInput" // This ID allows us to reset the input after successful upload
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className={styles.input} // Reusing FAQ input styles
        />
        {/* {selectedFile && (
          <div className={styles.fileName}>
            {selectedFile.name}
          </div>
        )} */}
        {message && <div className={styles.errorMessage}>{message}</div>}
      </div>

      <div className={styles.actionsection}>
        <CustomButton isLoading={isLoading} type="primary" onClick={handleUpload}>
          Upload
        </CustomButton>
      </div>
    </div>
  );
};

export default TermsAndConditionUpload;
