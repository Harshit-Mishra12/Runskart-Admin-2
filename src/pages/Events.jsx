import React, { useEffect, useState } from "react";
import CustomButton from "../components/common/CustomButton";
import styles from "./Events.module.css";
import CreateEventModal from "../components/models/CreateEventModal";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EventStatus from "../components/common/EventStatus";
import { fetchevents } from "../redux/eventReducer/action";
import { useDispatch, useSelector } from "react-redux";
import TableSkeleton from "../components/common/TableSkeleton";
import DummyTeamsButton from "../DummyTeams/DummyTeamsButton";

const Events = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const [enabledId, setEnabledId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setloading] = useState(false);
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
  const [clearButtonLoading, setClearButtonLoading] = useState(false);
  const [sortOption, setSortOption] = useState(0);
  const eventsPerPage = 5; // Set the number of events per page
  const { eventsList, totalEvents } = useSelector((store) => store.events); // Assume totalEvents is provided by the backend

  const totalPages = Math.ceil(totalEvents / eventsPerPage); // Calculate total pages

  const callbackAfterFetchSuccess = (result) => {
    if (result.statusCode === 1) {
      setloading(false);
      setSubmitButtonLoading(false);
      setClearButtonLoading(false);
    }
  };
  useEffect(() => {
    const params = {
      per_page: eventsPerPage,
      page: currentPage,
      date: date || "",
      go_live_date:sortOption
    };
    setloading(true);
    dispatch(fetchevents(params, callbackAfterFetchSuccess));
  }, [sortOption]);

  useEffect(() => {
    const params = {
      per_page: eventsPerPage,
      page: currentPage,
      date: date || "",
      go_live_date:sortOption
    };
    setloading(true);
    dispatch(fetchevents(params, callbackAfterFetchSuccess));
  }, [dispatch, currentPage]);

  const handleDateSubmit = () => {
    setloading(true);
    setSubmitButtonLoading(true);
    setCurrentPage(1); // Reset to page 1 when filtering by date
    const params = {
      per_page: eventsPerPage,
      page: 1,
      date: date || "",
      go_live_date:sortOption
    };

    dispatch(fetchevents(params, callbackAfterFetchSuccess));
  };
  const eventFormCreated = () => {
    setCurrentPage(1); // Reset to the first page
    fetchEvents();
  };

  const fetchEvents = () => {
    const params = {
      per_page: eventsPerPage,
      page: currentPage,
      date: date || "",
      go_live_date:sortOption
    };
    setDate("");
    setCurrentPage(1);
    dispatch(fetchevents(params, callbackAfterFetchSuccess));
  };
  const handleClearDate = () => {
    setClearButtonLoading(true);
    setDate(""); // Clear the date filter
    setCurrentPage(1); // Reset to page 1
    const params = {
      per_page: eventsPerPage,
      page: 1,
      date: "",
      go_live_date:sortOption
    };
    dispatch(fetchevents(params, callbackAfterFetchSuccess));
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const getColor = (total, filled) => {
    if (filled / total >= 0.9) return "success";
    if (filled / total >= 0.7) return "info";
    if (filled / total >= 0.5) return "warning";
    return "danger";
  };
  const sortByGoLiveDate = (sortOption) => {
    // Your sorting logic based on the selected option
    console.log('Sorting by:', sortOption);
  };

  const handleSortChange = (event) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);
    // Call your sorting function here, for example:
    sortByGoLiveDate(selectedOption);
  };

  return (
    <div className={styles.eventsContainer}>
      {/* <div className={styles.header}>
        <h1>Events</h1>
        <CreateEventModal eventFormCreated={eventFormCreated} />
      </div> */}
      <div className={styles.tableControlscontainer}>
        <div className={styles.tableControls}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Select Date"
          className={styles.dateInput}
        />
        <CustomButton
          type="primary"
          isLoading={submitButtonLoading}
          onClick={handleDateSubmit}
          height="40px"
        >
          Submit
        </CustomButton>
        <div className={styles.space}></div>
        <CustomButton
          type="secondary"
          isLoading={clearButtonLoading}
          onClick={handleClearDate}
          height="40px"
        >
          Clear
        </CustomButton>
        {/* Dropdown for sorting by Go Live Date */}
        <div className={styles.dropdownContainer}>
          <label htmlFor="sortBy">Sort By:</label>
          <select
            id="sortBy"
            value={sortOption}
            onChange={handleSortChange}
            className={styles.dropdown}
          >
            <option value="0">Select an option</option>
            <option value="1">Nearest Go Live Date </option>

          </select>
        </div>
        </div>
        <div className={styles.tableControlsend}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{totalEvents}</span>
          <span className={styles.statLabel}>Total Events</span>

        </div>
        <div>
        <CreateEventModal eventFormCreated={eventFormCreated} />
        </div>

        </div>


      </div>
      {/* <div className={styles.statsBar}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{totalEvents}</span>
          <span className={styles.statLabel}>Total Events</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>0</span>
          <span className={styles.statLabel}>Total Teams Limit</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>0</span>
          <span className={styles.statLabel}>Total Teams Allocated</span>
        </div>
      </div> */}
      <div className={styles.tableWrapper}>
        {loading ? (
          <TableSkeleton /> // Display skeleton when loading
        ) : (
          <table className={styles.eventsTable}>
            <thead>
              <tr>
                {[
                  "Name",
                  "Go Live Date",
                  "Creation Cost",
                  "Occupancy",
                  "Status",
                  "Active Status",
                  "Actions",
                ].map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {eventsList &&
                eventsList.map((event) => (
                  <tr key={event.id}>
                    <td>{event.event_name}</td>
                    <td>{event.go_live_date}</td>
                    <td>₹{event.team_creation_cost.toLocaleString()}</td>
                    <td>
                      <ProgressBar
                        now={
                          (event.occupancy / event.user_participation_limit) *
                          100
                        }
                        label={`${event.occupancy}/${event.user_participation_limit}`}
                        variant={getColor(
                          event.user_participation_limit,
                          event.occupancy
                        )}
                        animated
                        style={{
                          height: "18px",
                          border: "1px solid rgba(0,0,0,0.2)",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      />
                      {`${event.occupancy}/${event.user_participation_limit}`}
                    </td>

                    <td>
                      <EventStatus status={event.status} />
                    </td>
                    <td>
                      <EventStatus status={event.activate_status} />
                    </td>
                    <td>
                      <div style={{ margin: "5px" }}>
                        <CustomButton
                          type="secondary"
                          size="small"
                          onClick={() => navigate(`/events/${event.id}`)}
                        >
                          View
                        </CustomButton>
                        {event.status === "UPCOMING" && (
                          <DummyTeamsButton
                            eventId={event.id}
                            status={event.status}
                            name={event.event_name}
                            enabled={
                              event.status === "UPCOMING" &&
                              enabledId === event.id
                            }
                            setEnabledId={setEnabledId}
                            seatLeft={
                              event.user_participation_limit - event.occupancy
                            }
                            fetchEvents={fetchEvents}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
      <div className={styles.pagination}>
        <CustomButton
          type="primary"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </CustomButton>
        <div className={styles.space}></div>
        {/* <span>{`Page ${currentPage} of ${totalPages}`}</span> */}
        <CustomButton
          type="primary"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </CustomButton>
      </div>
    </div>
  );
};

export default Events;
