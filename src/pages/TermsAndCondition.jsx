import React, { useState } from "react";
import CustomButton from "../components/common/CustomButton"; // Assuming you already have a CustomButton component
import styles from "./FAQ.module.css"; // Reusing the existing styles
import API_URL from "../config";


const TermsAndConditionUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");

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
    if (!selectedFile) {
      setMessage("Please select a file before uploading.");
      return;
    }

    const token = JSON.parse(localStorage.getItem("token"));

    if (!token) {
      setMessage("Authorization token is missing. Please log in again.");
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
        setMessage(result.message || "File uploaded successfully!");
        setSelectedFile(null);
      } else {
        const errorResponse = await response.json();
        setMessage(errorResponse.message || "Failed to upload the file. Please try again.");
      }
    } catch (error) {
      console.error("Error during file upload:", error);
      setMessage("An error occurred while uploading the file. Please try again later.");
    }
  };


  return (
    <div className={styles.faqContainer}>
      <div className={styles.statsBar}>
        <div className={styles.stat}>
          <span className={styles.statLabel}> Terms and Conditions</span>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className={styles.input} // Reusing FAQ input styles
        />
        {message && <div className={styles.errorMessage}>{message}</div>}
      </div>

      <div className={styles.actionsection}>
        <CustomButton type="primary" onClick={handleUpload}>
          Upload
        </CustomButton>
      </div>
    </div>
  );
};

export default TermsAndConditionUpload;
