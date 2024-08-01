import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomButton from "../components/common/CustomButton";
import styles from "./EventDetails.module.css";
import { ProgressBar } from "react-bootstrap";
import { eventsdata } from "../utils/eventsdata";
import {
  FaCalendarAlt,
  FaUsers,
  FaTrophy,
  FaMoneyBillWave,
} from "react-icons/fa";
import { TbCricket } from "react-icons/tb";
import { BiCricketBall } from "react-icons/bi";
import { MdSportsCricket } from "react-icons/md";
import { GiCricketBat } from "react-icons/gi";
import { colors } from "../utils/styles";
import CreateEventModal from "../components/models/CreateEventModal";
import MatchesComponent from "../components/eventDetails/MatchesComponent";
import UserTeamComponent from "../components/userDetails/UserTeamComponent";
import { generateRandomTeams } from "../utils/tempData";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("matches");
  const event = eventsdata.find((e) => e.id === parseInt(id));

  if (!event) {
    return <div className={styles.notFound}>Event not found</div>;
  }

  const getColor = (total, filled) => {
    if (filled / total >= 0.9) return "success";
    if (filled / total >= 0.7) return "info";
    if (filled / total >= 0.5) return "warning";
    return "danger";
  };

  const handleCancel = () => console.log("Cancel event");
  const handleStart = () => console.log("Start event");
  const handleResult = () => console.log("Show results");

  const getButtonText = (status) => {
    switch (status) {
      case "Created":
        return "Release Event";
      case "Released":
        return "Cancel Event";
      case "Live":
        return "Show Results";
      case "Completed":
        return "Show Results";
      case "Cancelled":
        return "Go Back";
      default:
        return "Unknown Action";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Created":
        return colors.primary;
      case "Released":
        return colors.secondary;
      case "Live":
        return colors.success;
      case "Cancelled":
        return colors.danger;
      default:
        return colors.info;
    }
  };

  const eventDetails = [
    {
      label: "Event Status",
      value: event.status,
      icon: (
        <FaTrophy
          className={styles.icon}
          style={{ color: getStatusColor(event.status) }}
        />
      ),
    },
    {
      icon: <FaCalendarAlt className={styles.icon} />,
      label: "Go Live Date",
      value: event.goLiveDate,
    },
    {
      icon: <FaMoneyBillWave className={styles.icon} />,
      label: "Team Creation Cost",
      value: `₹${event.teamCreationCost.toLocaleString()}`,
    },
    {
      icon: <FaUsers className={styles.icon} />,
      label: "Team Size Limit",
      value: event.teamSizeLimit,
    },
    {
      icon: <FaUsers className={styles.icon} />,
      label: "Participation Limit",
      value: event.userParticipationLimit.toLocaleString(),
    },
    {
      icon: <TbCricket className={styles.icon} />,
      label: "Matches",
      value: event.matches.length.toLocaleString(),
    },
    {
      icon: <GiCricketBat className={styles.icon} />,
      label: "Batsman Limit",
      value: event.batsmanLimit.toLocaleString(),
    },
    {
      icon: <BiCricketBall className={styles.icon} />,
      label: "Bowler Limit",
      value: event.bowlerLimit.toLocaleString(),
    },
    {
      icon: <MdSportsCricket className={styles.icon} />,
      label: "All Rounder Limit",
      value: event.allRounderLimit.toLocaleString(),
    },
  ];

  // const prizeDetails = [
  //   { label: "1st Prize", value: `₹${event.firstPrize.toLocaleString()}` },
  //   { label: "2nd Prize", value: `₹${event.secondPrize.toLocaleString()}` },
  //   { label: "3rd Prize", value: `₹${event.thirdPrize.toLocaleString()}` },
  //   { label: "4th Prize", value: `₹${event.fourthPrize.toLocaleString()}` },
  //   { label: "5th Prize", value: `₹${event.fifthPrize.toLocaleString()}` },
  //   { label: "Other Prizes", value: `₹${event.otherPrizes.toLocaleString()}` },
  // ];

  const prizeDetails = event.prizes.map((prize, index) => ({
    label: `Rank ${index + 1}`,
    value: `₹${prize.amount.toLocaleString()}`,
  }));

  if (parseInt(event.otherPrizes) > 0) {
    prizeDetails.push({
      label: "Other Prizes",
      value: `₹${event.otherPrizes.toLocaleString()}`,
    });
  }

  return (
    <div className={styles.eventDetailsContainer}>
      <div className={styles.header}>
        <h1>{event.name}</h1>
        <div
          style={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <CustomButton type="outline" onClick={() => navigate("/events")}>
            Back to Events
          </CustomButton>
          {event.status === "Created" && (
            <CreateEventModal edit={true} event={event} />
          )}
        </div>
      </div>

      <div className={styles.eventInfo}>
        {eventDetails.map((detail, index) => (
          <div key={index} className={styles.infoCard}>
            {detail.icon}
            <span className={styles.label}>{detail.label}</span>
            <span
              className={styles.value}
              style={{
                color:
                  detail.label === "Event Status"
                    ? getStatusColor(event.status)
                    : "black",
                fontWeight: detail.label === "Event Status" ? "bold" : "normal",
              }}
            >
              {detail.value}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.occupancy}>
        <h2>Event Occupancy</h2>
        <ProgressBar
          now={(event.teamsAllocated / event.userParticipationLimit) * 100}
          label={`${event.teamsAllocated}/${event.userParticipationLimit}`}
          variant={getColor(event.userParticipationLimit, event.teamsAllocated)}
          animated
          className={styles.progressBar}
        />
      </div>

      <div className={styles.prizes}>
        <h2>Prize Distribution</h2>
        <div className={styles.prizeGrid}>
          {prizeDetails.map((prize, index) => (
            <div key={index} className={styles.prizeCard}>
              <FaTrophy className={styles.trophyIcon} />
              <span className={styles.prizeLabel}>{prize.label}</span>
              <span className={styles.prizeValue}>{prize.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        {event.status !== "Cancelled" &&
          event.status !== "Live" &&
          event.status !== "Completed" && (
            <CustomButton
              type={
                event.status === "Created"
                  ? "primary"
                  : event.status === "Released"
                  ? "danger"
                  : event.status === "Live" || event.status === "Completed"
                  ? "success"
                  : "info"
              }
              onClick={handleCancel}
              alert={true}
            >
              {getButtonText(event.status)}
            </CustomButton>
          )}
        {event.status === "Created" && (
          <CustomButton type="danger" alert={true}>
            Delete Event
          </CustomButton>
        )}
      </div>

      <div className={styles.tabContainer}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${
              activeTab === "matches" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("matches")}
          >
            Matches
          </button>
          {event.status !== "Created" && (
            <button
              className={`${styles.tab} ${
                activeTab === "teams" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("teams")}
            >
              Teams
            </button>
          )}
        </div>
        <div className={styles.tabContent}>
          {activeTab === "matches" && (
            <MatchesComponent matches={event.matches} />
          )}
          {activeTab === "teams" && (
            <UserTeamComponent teams={generateRandomTeams(50, event.status)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
