import React from "react";
import styles from "./TableStyles.module.css";

const MatchesComponent = ({ matches }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Team 1</th>
            <th>Team 2</th>
            <th>Venue</th>
            {/* <th>Status</th> */}
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.id}>
              <td>{match.date}</td>
              <td>{match.time}</td>
              <td>{match.team1}</td>
              <td>{match.team2}</td>
              <td>{match.venue}</td>
              {/* <td>{match.status}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatchesComponent;
