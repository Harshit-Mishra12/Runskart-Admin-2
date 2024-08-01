import React from "react";
import styles from "./TableStyles.module.css";

const TeamsComponent = ({ teams }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Owner</th>
            <th>Leader</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id}>
              <td>{team.name}</td>
              <td>{team.owner}</td>
              <td>{team.leader}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamsComponent;
