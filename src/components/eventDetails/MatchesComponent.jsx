import React from "react";
import styles from "./TableStyles.module.css";
import CustomButton from "../common/CustomButton";
import { useNavigate } from "react-router-dom";

const MatchesComponent = ({ matches }) => {
  const navigate = useNavigate();

  // Function to format the date and time
  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = dateTime.toLocaleDateString(undefined, options);
    const time = dateTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return { date, time };
  };

  // Function to check if the match date is in the past
  const isMatchInThePast = (dateTimeString) => {
    const currentDateTime = new Date();
    const matchDateTime = new Date(dateTimeString);
    console.log("check time:",currentDateTime ," " ,matchDateTime);
    return matchDateTime <= currentDateTime; // If match date-time is in the past or equal to current, return true
  };

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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => {
            const { date, time } = formatDateTime(match.date_time);
            const isDisabled = isMatchInThePast(match.date_time); // Disable if the match is in the future

            return (
              <tr key={match.id}>
                <td>{date}</td>
                <td>{time}</td>
                <td>{match.team1}</td>
                <td>{match.team2}</td>
                <td>{match.venue}</td>
                <td>
                  <CustomButton
                    type="primary"
                    onClick={() => navigate(`/events/match/${match.match_id}`)}
                    disabled={isDisabled} // Disable button if the match is in the future
                  >
                    Action
                  </CustomButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MatchesComponent;
