import React from "react";
import styles from "./TableStyles.module.css";
import CustomButton from "../common/CustomButton";
import EventStatus from "../common/EventStatus";

const UserTeamComponent = ({ teams }) => {
  // const renderPrize = (status) => {
  //   switch (status) {
  //     case "active":
  //       return "Pending";
  //     case "completed":
  //       return "Prize Released"; // Assuming prize info isn't in the team data; adjust if available.
  //     default:
  //       return "Unknown";
  //   }
  // };

  // const renderPoints = (status, points) => {
  //   switch (status) {
  //     case "active":
  //       return points || "0"; // Show points if available, or 0 as fallback
  //     case "completed":
  //       return points;
  //     default:
  //       return "Unknown";
  //   }
  // };

  // const renderRank = (status) => {
  //   switch (status) {
  //     case "active":
  //       return "Pending";
  //     case "completed":
  //       return "Rank Available"; // Assuming rank is not part of the data you provided.
  //     default:
  //       return "Unknown";
  //   }
  // };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Date</th>
            <th>Team Name</th>
            <th>Owner</th>
            <th>Points</th>
            {/* <th>Prize</th> */}
            <th>Entry Transaction</th>
            <th>Prize Transaction</th>
            <th>Event Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {teams.map(({ team, isMy }, index) => (
            <tr key={team.id}>
              <td>{team.rank}</td>
              <td>{new Date(team.created_at).toLocaleDateString()}</td>
              <td>{team.name}</td>
              <td>{isMy ? "You" : team.user_name}</td>
              <td>{team.points_scored}</td>
              {/* <td>{team.status}</td> */}
              <td>
                <span className={styles.completed}>
                  {"Pending"}
                </span>
              </td>
              <td>
                <span className={styles.completed}>
                  {"Pending"}
                </span>
              </td>
              <td>
                <EventStatus status={team.status} />
              </td>
              <td>
                <CustomButton
                  type="secondary"
                  onClick={() => console.log(`View Results for Team ${team.id}`)}
                >
                  View
                </CustomButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTeamComponent;
