import React from "react";
import styles from "./TableStyles.module.css";

const ResultsComponent = ({ results }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team Name</th>
            <th>Owner</th>
            <th>Points</th>
            <th>Prize</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id}>
              <td>{result.rank}</td>
              <td>{result.teamName}</td>
              <td>{result.owner}</td>
              <td>{result.points}</td>
              <td>{result.prize}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsComponent;
