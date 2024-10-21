// components/common/WithdrawTransactionModal.js
import React from "react";
import styles from "./WithdrawTransactionModal.module.css";

const WithdrawTransactionModal = ({ isOpen, onClose, onConfirm, transaction }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Confirm Withdrawal</h2>
        <p>Do you want to allow money to withdraw for user {transaction.user_name}?</p>
        <div className={styles.buttonGroup}>
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawTransactionModal;
