import React, { useState, useEffect } from "react";
import CustomButton from "../components/common/CustomButton";
import styles from "./Transactions.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchtransactionlist, updatetransactionstatus } from "../redux/transactionReducer/action";
import WithdrawTransactionModal from "../components/models/WithdrawTransactionModal";

const Transactions = () => {
  const dispatch = useDispatch();
  const { transactionList } = useSelector((store) => store.transactions);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null); // Store selected transaction

  const transactionPerPage = 5;
  const totalPages = Math.ceil(1000 / transactionPerPage); // Adjust totalPages as necessary

  useEffect(() => {
    setTransactions(transactionList);
  }, [transactionList]);

  const callbackAfterFetchSuccess = () => {
    setLoading(false);
  };

  useEffect(() => {
    const params = {
      per_page: transactionPerPage,
      page: currentPage,
      date: dateFilter || "",
      transaction_id: searchTerm,
    };
    setLoading(true);
    dispatch(fetchtransactionlist(params, callbackAfterFetchSuccess));
  }, [dispatch, currentPage, dateFilter, searchTerm]);

  useEffect(() => {
    const updatedTransactions = transactions.filter(
      (transaction) =>
        (transaction.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (transaction.transaction_id
            ? transaction.transaction_id.toLowerCase().includes(searchTerm.toLowerCase())
            : false)) &&
        (dateFilter === "" || transaction.created_at.slice(0, 10) === dateFilter)
    );
    setFilteredTransactions(updatedTransactions);
  }, [transactions, searchTerm, dateFilter]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleDateFilter = (event) => {
    setDateFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleWithdrawAction = (transaction) => {
    setSelectedTransaction(transaction); // Set the selected transaction
    setIsModalOpen(true); // Open the modal
  };

  const handleConfirmWithdrawal = () => {
    console.log("Withdrawal allowed for transaction ", selectedTransaction);

    // Update the status to "COMPLETED"
    const updatedTransaction = {
      ...selectedTransaction,
      status: "COMPLETED", // Set the status to "COMPLETED"
    };

    // Update the Redux store
    const params = {
      user_id: selectedTransaction.user_id,
      id: selectedTransaction.id,
      status: "COMPLETED", // Include the new status
    };

    dispatch(updatetransactionstatus(params, callbackAfterFetchSuccess));

    // Update local state to reflect the change immediately in the UI
    setFilteredTransactions(prevTransactions =>
      prevTransactions.map(transaction =>
        transaction.id === selectedTransaction.id
          ? updatedTransaction
          : transaction
      )
    );

    // Close the modal
    setIsModalOpen(false);
  };

  const totalAmount = filteredTransactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className={styles.transactionsContainer}>
      <div className={styles.header}>
        {/* <h1>Transactions</h1> */}
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
      {/* <div className={styles.statsBar}>
        <div className={styles.stat}>
          <span className={styles.statValue}>
            {filteredTransactions.length}
          </span>
          <span className={styles.statLabel}>Total Transactions</span>
        </div>
      </div> */}

      <div className={styles.tableWrapper}>
        <table className={styles.transactionsTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Transaction Number</th>
              <th>Amount</th>
              <th>User Name</th>
              <th>Type</th>
              <th>Transaction Usecase</th>
              <th>Account no</th>
              <th>Account Name</th>
              <th>IFSC Code</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.created_at}</td>
                <td>{transaction.transaction_id}</td>
                <td>₹{transaction.amount.toLocaleString()}</td>
                <td>{transaction.user_name}</td>
                <td>
                  <span
                    className={
                      transaction.transaction_type === "Credit"
                        ? styles.credit
                        : styles.debit
                    }
                  >
                    {transaction.transaction_type}
                  </span>
                </td>
                <td>{transaction.transaction_usecase}</td>
                <td>{transaction.bank_details.account_name}</td>
                <td>{transaction.bank_details.account_number}</td>
                <td>{transaction.bank_details.ifsc_code}</td>
                <td>
                  <span
                    className={
                      transaction.status === "COMPLETED" ||
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
                    onClick={() => {
                      if (transaction.transaction_usecase === "withdraw" &&   transaction.status === "PENDING") {
                        handleWithdrawAction(transaction); // Open modal if usecase is withdraw
                      } else {
                        console.log(
                          `View details for transaction ${transaction.id}`
                        );
                      }
                    }}
                  >
                    Action
                  </CustomButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <CustomButton
          type="primary"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </CustomButton>
        <div className={styles.space}></div>
        <CustomButton
          type="primary"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </CustomButton>
      </div>

      {/* Render the modal */}
      <WithdrawTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmWithdrawal}
        transaction={selectedTransaction}
      />
    </div>
  );
};

export default Transactions;
