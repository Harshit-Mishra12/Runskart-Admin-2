import React, { useState } from "react";
import styles from "./CustomButton.module.css";

const CustomButton = ({
  children,
  type = "primary",
  onClick,
  disabled = false,
  fullWidth = false,
  className = "",
  isLoading = false,
  width = "auto",
  height = "45px",
  alert = false,
  alertMessage = "Are you sure you want to proceed?",
  showStatusInput = false,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");


  const buttonClass = `
    ${styles.button}
    ${styles[type]}
    ${fullWidth ? styles.fullWidth : ""}
    ${disabled || isLoading ? styles.disabled : ""}
    ${className}
  `.trim();

  const handleClick = () => {
    if (alert) {
      setShowAlert(true);
    } else {
      onClick();
    }
  };

  const handleAlertAccept = () => {
    setShowAlert(false);
    onClick(statusMessage);
  };

  const handleAlertCancel = () => {
    setShowAlert(false);
  };

  return (
    <>
      <button
        className={buttonClass}
        onClick={handleClick}
        disabled={disabled || isLoading}
        style={{ width: fullWidth ? "100%" : width, height: height }}
      >
        {isLoading ? <span className={styles.spinner}></span> : children}
      </button>
      {showAlert && (
        <div className={styles.alertOverlay}>
          <div className={styles.alertBox}>
            <p>{alertMessage}</p>
            <input
                  type="text"
                  id="statusMessage"
                  value={statusMessage}
                  onChange={(e) => setStatusMessage(e.target.value)}
                  placeholder="Enter a status message"
                  className={styles.statusInput}
                />
            <div className={styles.alertButtons}>
              <button
                className={styles.alertAccept}
                onClick={handleAlertAccept}
              >
                Accept
              </button>
              <button
                className={styles.alertCancel}
                onClick={handleAlertCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomButton;
