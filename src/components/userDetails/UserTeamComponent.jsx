import React from "react";
import styles from "./TableStyles.module.css";
import CustomButton from "../common/CustomButton";
import EventStatus from "../common/EventStatus";

const UserTeamComponent = ({ teams }) => {
  const renderPrize = (status, prize) => {
    switch (status) {
      case "Released":
        return "N/A";
      case "Live":
        return "Pending";
      case "Cancelled":
        return "Cancelled";
      case "Completed":
        return prize;
      default:
        return "Unknown";
    }
  };

  const renderPoints = (status, points) => {
    switch (status) {
      case "Released":
        return "N/A";
      case "Live":
        return "Pending";
      case "Cancelled":
        return "0";
      case "Completed":
        return points;
      default:
        return "Unknown";
    }
  };

  const renderRank = (status, rank) => {
    switch (status) {
      case "Released":
        return "N/A";
      case "Live":
        return "Pending";
      case "Cancelled":
        return "N/A";
      case "Completed":
        return rank;
      default:
        return "Unknown";
    }
  };

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
            <th>Prize</th>
            <th>Entry Transaction</th>
            <th>Prize Transaction</th>
            <th>Event Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id}>
              <td>{renderRank(team.eventStatus, team.rank)}</td>
              <td>{team.date}</td>
              <td>{team.teamName}</td>
              <td>{team.owner}</td>
              <td>{renderPoints(team.eventStatus, team.points)}</td>
              <td>{renderPrize(team.eventStatus, team.prize)}</td>
              <td>
                <span
                  className={
                    team.entryTransaction === "Completed"
                      ? styles.completed
                      : styles.pending
                  }
                >
                  {team.entryTransaction}
                </span>
              </td>
              <td>
                <span
                  className={
                    team.prizeTransaction === "Completed" ||
                    team.prizeTransaction === "Refunded"
                      ? styles.completed
                      : styles.pending
                  }
                >
                  {team.prizeTransaction}
                </span>
              </td>
              <td>
                <EventStatus status={team.eventStatus} />
              </td>
              <td>
                <CustomButton
                  type="secondary"
                  onClick={() => console.log("View Results")}
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
