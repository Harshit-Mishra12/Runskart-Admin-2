import React from "react";
import styles from "./TableStyles.module.css";
import CustomButton from "../common/CustomButton";
import { useNavigate } from "react-router-dom";

const MatchesComponent = ({ matches }) => {
  // Function to format the date and time
  const navigate = useNavigate();
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

            return (
              <tr key={match.id}>
                <td>{date}</td>
                <td>{time}</td>
                <td>{match.team1}</td>
                <td>{match.team2}</td>
                <td>{match.venue}</td>
                <td>
                  <CustomButton type="primary"   onClick={() => {
                        navigate(`/events/match/${match.match_id}`);
                      }}>Action</CustomButton>
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
