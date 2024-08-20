import React from "react";
import styles from "./TableStyles.module.css";

const ResultsComponent = () => {
  // Dummy data
  const dummyResults = [
    { id: 1, username: "Alice", rank: 1, prizeAmount: "$100" },
    { id: 2, username: "Bob", rank: 2, prizeAmount: "$75" },
    { id: 3, username: "Charlie", rank: 3, prizeAmount: "$50" },
    { id: 4, username: "David", rank: 4, prizeAmount: "$25" },
    { id: 5, username: "Eve", rank: 5, prizeAmount: "$10" },
  ];

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Rank</th>
            <th>Prize Amount</th>
          </tr>
        </thead>
        <tbody>
          {dummyResults.map((result) => (
            <tr key={result.id}>
              <td>{result.id}</td>
              <td>{result.username}</td>
              <td>{result.rank}</td>
              <td>{result.prizeAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsComponent;
