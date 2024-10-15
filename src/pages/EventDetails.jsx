import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomButton from "../components/common/CustomButton";
import styles from "./EventDetails.module.css";
import { ProgressBar } from "react-bootstrap";
import {
  FaCalendarAlt,
  FaUsers,
  FaTrophy,
  FaMoneyBillWave,
  FaBan,
  FaUnlock,
  FaCheckCircle
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
import { useDispatch, useSelector } from "react-redux";
import {
  changestatus,
  eventdelete,
  fetchDownloadCsv,
  fetcheventdetail,
  fetcheventteamlist
} from "../redux/eventReducer/action";
import Skeleton from "../components/common/Skeleton";
import ResultsComponent from "../components/eventDetails/ResultsComponent";
import EditEventModal from "../components/models/EditEventModal";

const EventDetails = () => {
  const dispatch = useDispatch();
  const { eventDetail,eventTeamsList } = useSelector((store) => store.events);
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("matches");
  const [eventTeamsData, setEventTeamsData] = useState([]);
  const [statusChanged, setStatusChanged] = useState(false);
  const [loading, setLoading] = useState(false);
  const callback = (result) => {

    if (result.statusCode === 1) {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    dispatch(fetcheventdetail(id, callback)); // Fetch event detail
    dispatch(fetcheventteamlist(id, callback)); // Fetch event detail

  }, [dispatch, id]);
  useEffect(() => {
    setEventTeamsData(eventTeamsList)
  }, [eventTeamsList]);


  const { event, prizes, matches, occupancy } = eventDetail || {};
  const userParticipationLimit = event?.user_participation_limit ?? 0;
  const occupancyPercentage = userParticipationLimit
    ? (occupancy / userParticipationLimit) * 100
    : 0;

  const handleEventDelete = () => {
    setLoading(true);
    dispatch(eventdelete(id, callback));
  };

  const handleCsvDownload = () => {
    dispatch(fetchDownloadCsv(id, (result) => {
        if (result.statusCode === 1) {
            console.log("Download initiated:", result.message);
        } else {
            console.error("Download failed:", result.message);
        }
    }));
};


  const handleUpdateStatus = () => {
    setLoading(true);
    dispatch(changestatus(id, callback));
    setStatusChanged(true);
  };

  const getColor = (total, filled) => {
    if (filled / total >= 0.9) return "success";
    if (filled / total >= 0.7) return "info";
    if (filled / total >= 0.5) return "warning";
    return "danger";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "CREATED":
        return colors.primary; // E.g., blue for CREATED
      case "RELEASED":
        return colors.secondary; // E.g., green for RELEASED
      case "LIVE":
        return colors.success; // E.g., dark green for LIVE
      case "COMPLETED":
        return colors.info; // E.g., light blue for COMPLETED
      case "CANCELLED":
        return colors.danger; // E.g., red for CANCELLED
      case "UPCOMING":
        return colors.info;
      default:
        return colors.default; // E.g., gray for unknown status
    }
  };

  const eventDetails = [
    {
      label: "Event Status",
      value: event?.status,
      icon: (
        <FaTrophy
          className={styles.icon}
          style={{ color: getStatusColor(event?.status) }}
        />
      ),
    },
    {
      icon: <FaCalendarAlt className={styles.icon} />,
      label: "Go Live Date",
      value: event?.go_live_date,
    },
    {
      icon: <FaMoneyBillWave className={styles.icon} />,
      label: "Team Creation Cost",
      value: `₹${event?.team_creation_cost?.toLocaleString()}`,
    },
    {
      icon: <FaUsers className={styles.icon} />,
      label: "Team Size Limit",
      value: event?.team_size,
    },
    {
      icon: <FaUsers className={styles.icon} />,
      label: "Participation Limit",
      value: userParticipationLimit.toLocaleString(),
    },
    {
      icon: <TbCricket className={styles.icon} />,
      label: "Matches",
      value: event?.matches_count?.toLocaleString(),
    },
    {
      icon: <GiCricketBat className={styles.icon} />,
      label: "Batsman Limit",
      value: event?.batsman_limit?.toLocaleString(),
    },
    {
      icon: <GiCricketBat className={styles.icon} />,
      label: "Wicket Keeper Limit",
      value: event?.wicketkeeper_limit?.toLocaleString(),
    },
    {
      icon: <BiCricketBall className={styles.icon} />,
      label: "Bowler Limit",
      value: event?.bowler_limit?.toLocaleString(),
    },
    {
      icon: <MdSportsCricket className={styles.icon} />,
      label: "All Rounder Limit",
      value: event?.all_rounder_limit?.toLocaleString(),
    },
  ];

  const prizeDetails = prizes?.map((prize, index) => ({
    label: `Rank ${prize.rank_from}${
      prize.rank_to > prize.rank_from ? `-${prize.rank_to}` : ""
    }`,
    value: `₹${prize.prize_amount.toLocaleString()}`,
  }));
  const adjustedOccupancyPercentage = Math.max(occupancyPercentage, 1);
  return (
    <div className={styles.eventDetailsContainer}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>{event?.name}</h1>
          <div className={styles.statusButtons}>
            {loading ? (
              <Skeleton height={30} width="100%" />
            ) : (
              <CustomButton
                type={event && event.activate_status === "ACTIVE" ? "success" :"danger"}
                onClick={handleUpdateStatus}
                disabled={
                  (event && event.status !== "UPCOMING") ||
                  (event && event.activate_status === "ACTIVE")
                }
                alert={true}
                alertMessage={
                  event && event.activate_status === "INACTIVE"
                    ? "Are you sure you want to Activate the Event?"
                    : ""
                }
              >
                {event && event.activate_status === "ACTIVE"  ? <FaCheckCircle /> : <FaBan />}

                <span style={{ marginLeft: "0.5rem" }}>
                  {event && event.activate_status}
                </span>
              </CustomButton>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          {/* <CustomButton type="outline" onClick={() => navigate("/events")}>
            EDIT
          </CustomButton> */}
          <EditEventModal
            eventStatus={event?.status}
            eventActiveStatus={event && event.activate_status}
            event={event}
            eventId={id}
            matchesCount={matches && matches.length}
            prizes={prizes && prizes.length > 0 ? prizes.slice(0, -1) : []}
            otherPrizes={
              prizes && prizes.length > 0
                ? prizes[prizes.length - 1].prize_amount
                : ""
            }
          />
          <CustomButton type="outline" onClick={() => navigate("/events")}>
            Back to Events
          </CustomButton>
          <CustomButton type="outline" onClick={handleCsvDownload}>
           Download Teams
          </CustomButton>
          {event?.status === "Created" && (
            <CreateEventModal edit={true} event={event} />
          )}
        </div>
      </div>

      <div className={styles.eventInfo}>
        {loading
          ? Array(8)
              .fill(0)
              .map((_, index) => <Skeleton key={index} height="100px" />)
          : eventDetails.map(
              (detail, index) =>
                detail.value && (
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
                        fontWeight:
                          detail.label === "Event Status" ? "bold" : "normal",
                      }}
                    >
                      {detail.value}
                    </span>
                  </div>
                )
            )}
      </div>

      {event && (
        <>
          <div className={styles.occupancy}>
            <h2>Event Occupancy</h2>
            {loading ? (
              <Skeleton height={30} width="100%" />
            ) : (
              <>
                <ProgressBar
                  now={occupancyPercentage}
                  label={`${occupancy}/${userParticipationLimit}`}
                  variant={getColor(userParticipationLimit, occupancy)}
                  animated
                  className={styles.progressBar}
                  style={{ textAlign: "center" }} // Ensure label is centered
                />
                {`${occupancy}/${userParticipationLimit}`}
              </>
            )}
          </div>

          <div className={styles.prizes}>
            <h2>Prize Distribution</h2>
            <div className={styles.prizeGrid}>
              {loading
                ? Array(3)
                    .fill(null)
                    .map((_, index) => (
                      <Skeleton
                        key={index}
                        height={150}
                        width="100%"
                        style={{ marginBottom: "1rem" }}
                      />
                    ))
                : prizeDetails.map((prize, index) => (
                    <div key={index} className={styles.prizeCard}>
                      <FaTrophy className={styles.trophyIcon} />
                      <span className={styles.prizeLabel}>{prize.label}</span>
                      <span className={styles.prizeValue}>{prize.value}</span>
                    </div>
                  ))}
            </div>
          </div>
        </>
      )}

      <div className={styles.actions}>
        {event?.status === "COMPLETED" && (
          <CustomButton type="primary" alert={true}>
            Release Event
          </CustomButton>
        )}
        {event?.status === "CREATED" && (
          <CustomButton onClick={handleEventDelete} type="danger" alert={true}>
            Delete Event
          </CustomButton>
        )}
      </div>

      {event && (
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
            {event.status === "COMPLETED" && (
              <button
                className={`${styles.tab} ${
                  activeTab === "results" ? styles.activeTab : ""
                }`}
                onClick={() => setActiveTab("results")}
              >
                Results
              </button>
            )}
          </div>
          <div className={styles.tabContent}>
            {activeTab === "matches" && <MatchesComponent matches={matches} />}
            {activeTab === "teams" && (
              <UserTeamComponent
                teams={eventTeamsData}
                // teams={generateRandomTeams(50, event.status)}
              />
            )}
            {activeTab === "results" && (
              <ResultsComponent teams={generateRandomTeams(50, event.status)} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
