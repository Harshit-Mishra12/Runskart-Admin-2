import React from "react";
import styles from "./TableStyles.module.css";

const ResultsComponent = ({ teams }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Transaction Id</th>
            <th>Owner name</th>
            <th>Team Name</th>
            <th>Rank</th>
            <th>Prize amount</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id}>
               <td>{team.transaction_id}</td>
              <td>{team.user_name}</td>
              <td>{team.team_name}</td>
              <td>{team.rank}</td>
              <td>{team.prize_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsComponent;
