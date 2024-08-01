import React, { useState } from "react";
import CustomButton from "../components/common/CustomButton";
import styles from "./Events.module.css";
import CreateEventModal from "../components/models/CreateEventModal";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProgressBar } from "react-bootstrap";
import { eventsdata } from "../utils/eventsdata";
import { useNavigate } from "react-router-dom";
import { colors } from "../utils/styles";
import EventStatus from "../components/common/EventStatus";

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState(eventsdata);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const handleDateSubmit = () => {
    // Fetch data based on the entered date
    // For now, we will just filter the tempEvents based on the date
    const filteredEvents = tempEvents.filter(
      (event) => event.createdDate === date
    );
    setEvents(filteredEvents);
  };

  const getColor = (total, filled) => {
    if (filled / total >= 0.9) {
      return "success";
    } else if (filled / total >= 0.7) {
      return "info";
    } else if (filled / total >= 0.5) {
      return "warning";
    } else {
      return "danger";
    }
  };

  return (
    <div className={styles.eventsContainer}>
      <div className={styles.header}>
        <h1>Events</h1>
        <CreateEventModal />
      </div>
      <div className={styles.tableControls}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={styles.dateInput}
        />
        <CustomButton type="primary" onClick={handleDateSubmit} height="40px">
          Submit
        </CustomButton>
      </div>
      <div className={styles.statsBar}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{events.length}</span>
          <span className={styles.statLabel}>Total Events</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>
            {events.reduce(
              (sum, event) => sum + event.userParticipationLimit,
              0
            )}
          </span>
          <span className={styles.statLabel}>Total Teams Limit</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>
            {events
              .reduce((sum, event) => sum + event.teamsAllocated, 0)
              .toLocaleString()}
          </span>
          <span className={styles.statLabel}>Total Teams Allocted</span>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.eventsTable}>
          <thead>
            <tr>
              {[
                "Name",
                "Go Live Date",
                "Creation Cost",
                // "Team Size Limit",
                // "Participation Limit",
                // "Winner Limit",
                "Occupancy",
                "Status",
                "Actions",
              ].map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.name}</td>
                <td>{event.goLiveDate}</td>
                <td>₹{event.teamCreationCost.toLocaleString()}</td>
                {/* <td>{event.teamSizeLimit}</td> */}
                {/* <td>{event.userParticipationLimit.toLocaleString()}</td> */}
                {/* <td>{event.winnersLimit.toLocaleString()}</td> */}
                <td>
                  <ProgressBar
                    now={
                      (event.teamsAllocated / event.userParticipationLimit) *
                      100
                    }
                    label={`${event.teamsAllocated}/${event.userParticipationLimit} `}
                    variant={getColor(
                      event.userParticipationLimit,
                      event.teamsAllocated
                    )}
                    animated
                    style={{
                      height: "25px",
                      border: "1px solid rgba(0,0,0,0.2)",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  />
                </td>
                <td>
                  <EventStatus status={event.status} />
                </td>
                <td>
                  <div
                    style={{
                      margin: "5px",
                    }}
                  >
                    <CustomButton
                      type="secondary"
                      size="small"
                      onClick={() => {
                        navigate(`/events/${event.id}`);
                      }}
                    >
                      View
                    </CustomButton>
                  </div>

                  {/* <CustomButton type="outline" size="small">
                    Result
                  </CustomButton> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Events;
