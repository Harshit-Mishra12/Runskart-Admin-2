import React, { useState } from "react";
import CustomButton from "../components/common/CustomButton";
import styles from "./Transactions.module.css";

const tempTransactions = [
  {
    id: 1,
    date: "2023-07-15",
    transactionNumber: "TRX001",
    amount: 500,
    userName: "John Doe",
    type: "Credit",
    status: "Completed",
  },
  {
    id: 2,
    date: "2023-07-14",
    transactionNumber: "TRX002",
    amount: 250,
    userName: "Jane Smith",
    type: "Debit",
    status: "Pending",
  },
  {
    id: 3,
    date: "2023-07-13",
    transactionNumber: "TRX003",
    amount: 1000,
    userName: "Alice Johnson",
    type: "Credit",
    status: "Completed",
  },
  // Add more transaction objects as needed
];

const Transactions = () => {
  const [transactions, setTransactions] = useState(tempTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDateFilter = (event) => {
    setDateFilter(event.target.value);
  };

  const filteredTransactions = transactions.filter(
    (transaction) =>
      (transaction.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.transactionNumber
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) &&
      (dateFilter === "" || transaction.date === dateFilter)
  );

  const totalAmount = filteredTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  return (
    <div className={styles.transactionsContainer}>
      <div className={styles.header}>
        <h1>Transactions</h1>
        <div className={styles.controls}>
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchInput}
          />
          <input
            type="date"
            value={dateFilter}
            onChange={handleDateFilter}
            className={styles.dateInput}
          />
        </div>
      </div>
      <div className={styles.statsBar}>
        <div className={styles.stat}>
          <span className={styles.statValue}>
            {filteredTransactions.length}
          </span>
          <span className={styles.statLabel}>Total Transactions</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>
            ₹{totalAmount.toLocaleString()}
          </span>
          <span className={styles.statLabel}>Total Amount</span>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.transactionsTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Transaction Number</th>
              <th>Amount</th>
              <th>User Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.transactionNumber}</td>
                <td>₹{transaction.amount.toLocaleString()}</td>
                <td>{transaction.userName}</td>
                <td>
                  <span
                    className={
                      transaction.type === "Credit"
                        ? styles.credit
                        : styles.debit
                    }
                  >
                    {transaction.type}
                  </span>
                </td>
                <td>
                  <span
                    className={
                      transaction.status === "Completed" ||
                      transaction.status === "Refunded"
                        ? styles.completed
                        : styles.pending
                    }
                  >
                    {transaction.status}
                  </span>
                </td>
                <td>
                  <CustomButton
                    type="secondary"
                    size="small"
                    onClick={() =>
                      console.log(
                        `View details for transaction ${transaction.id}`
                      )
                    }
                  >
                    View Details
                  </CustomButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
