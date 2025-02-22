import React, { useState, useEffect } from "react";
import styles from "./CreateEventModal.module.css";
import CustomButton from "../common/CustomButton";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { createevent, fetchmatches } from "../../redux/eventReducer/action";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../common/Spinner";
import SkeletonListCard from "../common/SkeletonListCard";
import classNames from "classnames";
import Snackbar from "../common/Snackbar";

const CreateEventModal = ({
  edit = false,
  event,
  eventFormCreated,
  eventsLoading,
}) => {
  const dispatch = useDispatch();
  const { matchesList } = useSelector((store) => store.events);
  const [isOpen, setIsOpen] = useState(false);
  const [matchesData, setMatchesData] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [snackbarSeverity, setSnackbarSeverity] = useState(null);
  const [totalPrizeAmount, setTotalPrizeAmount] = useState(0);
  const [eventData, setEventData] = useState({
    name: "",
    goLiveDate: "",
    matches: [],
    teamSizeLimit: "",
    batsmanLimit: "",
    wicketkeeperLimit: "",
    bowlerLimit: "",
    allRounderLimit: "",
    teamCreationCost: "",
    userParticipationLimit: "",
    winnersLimit: "",
    prizes: [{ rank: 1, prize_amount: "" }],
    otherPrizes: "",
    teamLimitPerUser: "",
  });
  const [maxTeamSize, setMaxTeamSize] = useState(0);

  useEffect(() => {
    const calculateMaxTeamSize = () => {
      const numberOfTeams = eventData.matches.length * 22; // Assuming there are always 4 teams
      const playersPerTeam = 11; // Number of players per team
      setMaxTeamSize(numberOfTeams);
    };

    calculateMaxTeamSize();
  }, [eventData.matches]);
  const displaySnackbar = () => {
    setSnackbarMessage("Check for  Validations!");
    setSnackbarSeverity("error");
  };
  const validate = () => {
    const newErrors = {};

    if (!eventData.name) newErrors.name = "Event Name is required";
    // if (!eventData.goLiveDate)
    //   newErrors.goLiveDate = "Go Live Date is required";
    if (eventData.teamSizeLimit < 11) {
      newErrors.teamSizeLimit = "Team size limit cannot be less than 11";
    } else if (eventData.teamSizeLimit > maxTeamSize) {
      newErrors.teamSizeLimit = `Team size limit cannot be greater than ${maxTeamSize}`;
    }
    if (!eventData.batsmanLimit || eventData.batsmanLimit <= 0)
      newErrors.batsmanLimit = "Batsman Limit must be greater than 0";
    if (!eventData.bowlerLimit || eventData.bowlerLimit <= 0)
      newErrors.bowlerLimit = "Bowler Limit must be greater than 0";
    if (!eventData.wicketkeeperLimit || eventData.wicketkeeperLimit <= 0)
      newErrors.wicketkeeperLimit =
        "wicket keeper Limit must be greater than 0";

    if (!eventData.allRounderLimit || eventData.allRounderLimit <= 0)
      newErrors.allRounderLimit = "All-Rounder Limit must be greater than 0";

    const totalPlayerLimit =
      parseInt(eventData.batsmanLimit, 10) +
      parseInt(eventData.bowlerLimit, 10) +
      parseInt(eventData.allRounderLimit, 10) +
      parseInt(eventData.wicketkeeperLimit, 10); // Correctly include the wicketkeeper limit

    if (totalPlayerLimit < eventData.teamSizeLimit) {
      newErrors.playerLimits = `The sum of Batsman Limit, Bowler Limit, All-Rounder Limit, and Wicketkeeper Limit (${totalPlayerLimit}) should be greater than or equal to the Team Size Limit (${eventData.teamSizeLimit}).`;
    }
    if (eventData.teamLimitPerUser < 1)
      newErrors.teamLimitPerUser = "Team Limit Per User must be greater than 0";

    if (!eventData.teamCreationCost || eventData.teamCreationCost < 0)
      newErrors.teamCreationCost = "Team Creation Cost cannot be negative";
    if (!eventData.otherPrizes || eventData.otherPrizes <= 0)
      newErrors.otherPrizes = "other Prizes Value must be greater than 0";
    if (
      !eventData.userParticipationLimit ||
      eventData.userParticipationLimit < 0
    )
      newErrors.userParticipationLimit =
        "User Participation Limit cannot be negative";
    if (!eventData.winnersLimit || eventData.winnersLimit <= 0)
      newErrors.winnersLimit = "Winners Limit must be greater than 0";
    if (
      parseInt(eventData.winnersLimit) >
      parseInt(eventData.userParticipationLimit)
    ) {
      newErrors.winnersLimit =
        "Winners Limit must be less than user Participation Limit value";
    }

    if (eventData.matches.length === 0) {
      newErrors.matches = "Select at least one match";
    }
    eventData.prizes.forEach((prize, index) => {
      if (prize.prize_amount <= 0) {
        newErrors[`prize_amount_${index}`] =
          "Minimum prize amount should be greater than 0";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const totalPrizeAmountfunc = eventData.prizes.reduce(
    (sum, prize) => sum + (Number(prize.prize_amount) || 0),
    0
  );
  const calculateTotalPrizeAmount = () => {
    // Default values for otherPrizes and winnersLimit
    const otherPrizes = (
      eventData.otherPrizes &&
      eventData.winnersLimit &&
      (eventData.winnersLimit > 0) &&
      (eventData.prizes.length < eventData.winnersLimit)
  )
      ? eventData.otherPrizes * (eventData.winnersLimit - eventData.prizes.length)
      : 0;

    // Calculate total prize amount
    const totalAmount = totalPrizeAmountfunc + otherPrizes; // Add to the current totalPrizeAmount

    console.log("Check calculation of total prize amount:", totalPrizeAmountfunc," ",otherPrizes);
    return totalAmount;
};


// Effect to calculate total prize amount when component is rendered or updated
useEffect(() => {
    const totalAmount = calculateTotalPrizeAmount();
    setTotalPrizeAmount(totalAmount);
}, [eventData]);

  // Calculate total prize amount

  useEffect(() => {
    const callbackFunction = (result) => {
      if (result.statusCode == 1) {
        setLoading(false);
      }
    };
    const params = {
      date: date,
    };
    setLoading(true);
    setEventData((prevData) => ({ ...prevData, matches: [] }));
    dispatch(fetchmatches(params, callbackFunction));
  }, [date]);

  useEffect(() => {
    if (edit && event) {
      setEventData({
        ...event,
        prizes: event.prizes || [{ rank: 1, amount: "" }],
      });
    }
  }, [edit, event, isOpen]);
  const handleGoLiveDateChange = (e) => {
    const newDate = e.target.value;
    setEventData((prevData) => ({ ...prevData, goLiveDate: newDate }));
    setDate(newDate); // Update date state whenever goLiveDate changes
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only numbers for userParticipationLimit
    if (
      name === "userParticipationLimit" ||
      name === "teamSizeLimit" ||
      name === "teamLimitPerUser" ||
      name === "batsmanLimit" ||
      name === "bowlerLimit" ||
      name === "allRounderLimit" ||
      name === "teamCreationCost" ||
      name === "winnersLimit" ||
      name === "wicketkeeperLimit" ||
      name === "otherPrizes"
    ) {
      // Check if the value is a valid number (including empty string)
      if (value === "" || /^[0-9]*$/.test(value)) {
        setEventData((prevData) => ({ ...prevData, [name]: value }));
      } else {
        // Optional: Log an error or reset the field if needed
        console.error("Invalid input: Only numeric values are allowed.");
      }
    } else {
      setEventData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleMatchesChange = (selectedMatches) => {
    setEventData((prevData) => ({ ...prevData, matches: selectedMatches }));
  };


  const handlePrizeChange = (index, field, value) => {
    // Check if the value is a valid number (or allow empty values for clearing input)
    if (!isNaN(value) || value === "") {
      const updatedPrizes = [...eventData.prizes];
      updatedPrizes[index][field] = value;
      setEventData((prevData) => ({ ...prevData, prizes: updatedPrizes }));
    }
  };

  const addPrize = () => {
    setEventData((prevData) => ({
      ...prevData,
      prizes: [
        ...prevData.prizes,
        { rank: prevData.prizes.length + 1, prize_amount: "" },
      ],
    }));
  };

  const removePrize = (index) => {
    setEventData((prevData) => ({
      ...prevData,
      prizes: prevData.prizes.filter((_, i) => i !== index),
    }));
  };

  const callbackFunction = (result) => {
    if (result.statusCode == 1) {
      setLoading(false);
      setFormLoading(false);
      onClose();
      eventFormCreated();
    }
  };
  const handleSubmit = () => {
    console.log("matches list:", eventData.matches);
    if (!validate()) {
      displaySnackbar();
      return;
    }
    // e.preventDefault();
    setLoading(true);
    setFormLoading(true);
    console.log("handleSubmit:");
    onCreateEvent(eventData);
    const params = {
      name: eventData.name,
      go_live_date: date,
      team_size: eventData.teamSizeLimit,
      batsman_limit: eventData.batsmanLimit,
      bowler_limit: eventData.bowlerLimit,
      all_rounder_limit: eventData.allRounderLimit,
      team_creation_cost: eventData.teamCreationCost,
      user_participation_limit: eventData.userParticipationLimit,
      winners_limit: eventData.winnersLimit,
      wicketkeeper_limit: eventData.wicketkeeperLimit,
      prizes: eventData.prizes,
      other_prizes: eventData.otherPrizes,
      matches: eventData.matches,
      team_limit_per_user: eventData.teamLimitPerUser,
    };
    console.log("handleSubmit:", params);
    // return
    dispatch(createevent(params, callbackFunction));
  };

  const onCreateEvent = (eventData) => {
    console.log(eventData);
  };

  const onClose = () => {
    setIsOpen(false);
    setEventData({
      name: "",
      goLiveDate: "",
      matches: [],
      teamSizeLimit: "",
      wicketkeeperLimit: "",
      batsmanLimit: "",
      bowlerLimit: "",
      allRounderLimit: "",
      teamCreationCost: "",
      userParticipationLimit: "",
      winnersLimit: "",
      prizes: [{ rank: 1, prize_amount: "" }],
      teamLimitPerUser: "",
    });
  };

  return (
    <>
      {formLoading && <Spinner />}
      {snackbarMessage && (
        <Snackbar
          message={snackbarMessage}
          severity={snackbarSeverity}
          onClose={() => setSnackbarMessage(null)}
        />
      )}
      <CustomButton type="primary" onClick={() => setIsOpen(true)}>
        {edit ? "Edit Event" : "Create New Event"}
      </CustomButton>

      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>
              {edit ? "Edit Event" : "Create New Event"}
            </h2>
            <button
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                padding: "0.5rem",
                background: "transparent",
                border: "none",
              }}
              onClick={() => setIsOpen(false)}
            >
              <XMarkIcon className={styles.closeIcon} />
            </button>

            <div className={styles.form}>
              <div
                className={classNames(styles.formGroup, {
                  [styles.error]: errors.name,
                })}
              >
                <label htmlFor="name">Event Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={eventData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && (
                  <span className={styles.error}>{errors.name}</span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="goLiveDate">Go Live Date</label>
                <input
                  type="date"
                  id="goLiveDate"
                  name="goLiveDate"
                  value={date}
                  onChange={handleGoLiveDateChange}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="matches">Matches</label>
                <div className={styles.matchesContainer}>
                  {loading ? (
                    <>
                      <SkeletonListCard /> <SkeletonListCard />{" "}
                      <SkeletonListCard />
                    </>
                  ) : (
                    matchesList &&
                    matchesList.map((match) => (
                      <div
                        key={match.id}
                        className={`${styles.matchItem} ${
                          eventData.matches.some((m) => m.id === match.id)
                            ? styles.selected
                            : ""
                        }`}
                        onClick={() => {
                          const updatedMatches = eventData.matches.some(
                            (m) => m.id === match.id
                          )
                            ? eventData.matches.filter((m) => m.id !== match.id)
                            : [...eventData.matches, match];
                          handleMatchesChange(updatedMatches);
                        }}
                      >
                        {match.name}
                        {","}
                        {match.dateTime.split(" ")[1]}
                      </div>
                    ))
                  )}
                </div>
                {errors.matches && (
                  <div className={styles.error}>{errors.matches}</div>
                )}
              </div>

              <div
                className={classNames(styles.formGroup, {
                  [styles.error]: errors.teamSizeLimit,
                })}
              >
                <label htmlFor="teamSizeLimit">Team Size Limit</label>
                <input
                  id="teamSizeLimit"
                  name="teamSizeLimit"
                  value={eventData.teamSizeLimit}
                  onChange={handleChange}
                  required
                />
                {errors.teamSizeLimit && (
                  <span className={styles.error}>{errors.teamSizeLimit}</span>
                )}
              </div>
              <div className={styles.formRow}>
                <div
                  className={classNames(styles.formGroup, {
                    [styles.error]: errors.teamLimitPerUser,
                  })}
                >
                  <label htmlFor="teamLimitPerUser">Team Limit Per User</label>
                  <input
                    id="teamLimitPerUser"
                    name="teamLimitPerUser"
                    value={eventData.teamLimitPerUser}
                    onChange={handleChange}
                    required
                  />
                  {errors.teamLimitPerUser && (
                    <span className={styles.error}>
                      {errors.teamLimitPerUser}
                    </span>
                  )}
                </div>
                <div
                  className={classNames(styles.formGroup, {
                    [styles.error]: errors.batsmanLimit,
                  })}
                >
                  <label htmlFor="batsmanLimit">Batsman Limit</label>
                  <input
                    id="batsmanLimit"
                    name="batsmanLimit"
                    value={eventData.batsmanLimit}
                    onChange={handleChange}
                    required
                  />
                  {errors.batsmanLimit && (
                    <span className={styles.error}>{errors.batsmanLimit}</span>
                  )}
                </div>
              </div>
              <div className={styles.formRow}>
                <div
                  className={classNames(styles.formGroup, {
                    [styles.error]: errors.bowlerLimit,
                  })}
                >
                  <label htmlFor="bowlerLimit">Bowler Limit</label>
                  <input
                    id="bowlerLimit"
                    name="bowlerLimit"
                    value={eventData.bowlerLimit}
                    onChange={handleChange}
                    required
                  />
                  {errors.bowlerLimit && (
                    <span className={styles.error}>{errors.bowlerLimit}</span>
                  )}
                </div>

                <div
                  className={classNames(styles.formGroup, {
                    [styles.error]: errors.allRounderLimit,
                  })}
                >
                  <label htmlFor="allRounderLimit">All-Rounder Limit</label>
                  <input
                    id="allRounderLimit"
                    name="allRounderLimit"
                    value={eventData.allRounderLimit}
                    onChange={handleChange}
                    required
                  />
                  {errors.allRounderLimit && (
                    <span className={styles.error}>
                      {errors.allRounderLimit}
                    </span>
                  )}
                </div>
              </div>
              <div
                className={classNames(styles.formGroup, {
                  [styles.error]: errors.wicketkeeperLimit,
                })}
              >
                <label htmlFor="wicketkeeperLimit">Wicket Keeper Limit</label>
                <input
                  id="wicketkeeperLimit"
                  name="wicketkeeperLimit"
                  value={eventData.wicketkeeperLimit}
                  onChange={handleChange}
                  required
                />
                {errors.wicketkeeperLimit && (
                  <span className={styles.error}>
                    {errors.wicketkeeperLimit}
                  </span>
                )}
              </div>
              {errors.playerLimits && (
                <div className={styles.error}>{errors.playerLimits}</div>
              )}
              <div
                className={classNames(styles.formGroup, {
                  [styles.error]: errors.teamCreationCost,
                })}
              >
                <label htmlFor="teamCreationCost">Team Creation Cost</label>
                <input
                  id="teamCreationCost"
                  name="teamCreationCost"
                  value={eventData.teamCreationCost}
                  onChange={handleChange}
                  required
                />
                {errors.teamCreationCost && (
                  <span className={styles.error}>
                    {errors.teamCreationCost}
                  </span>
                )}
              </div>
              <div
                className={classNames(styles.formGroup, {
                  [styles.error]: errors.userParticipationLimit,
                })}
              >
                <label htmlFor="userParticipationLimit">
                  User Participation Limit
                </label>
                <input
                  id="userParticipationLimit"
                  name="userParticipationLimit"
                  value={eventData.userParticipationLimit}
                  onChange={handleChange}
                  required
                />
                {errors.userParticipationLimit && (
                  <span className={styles.error}>
                    {errors.userParticipationLimit}
                  </span>
                )}
              </div>
              <div
                className={classNames(styles.formGroup, {
                  [styles.error]: errors.winnersLimit,
                })}
              >
                <label htmlFor="winnersLimit">Winners Limit</label>
                <input
                  id="winnersLimit"
                  name="winnersLimit"
                  value={eventData.winnersLimit}
                  onChange={handleChange}
                  required
                />
                {errors.winnersLimit && (
                  <span className={styles.error}>{errors.winnersLimit}</span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label>Prizes</label>
                {eventData.prizes.map((prize, index) => (
                  <div key={index} className={styles.prizeRow}>
                    <input
                      value={prize.rank}
                      onChange={(e) =>
                        handlePrizeChange(index, "rank", e.target.value)
                      }
                      placeholder="Rank"
                      className={styles.prizeRank}
                    />
                    <input
                      value={prize.prize_amount}
                      onChange={(e) =>
                        handlePrizeChange(index, "prize_amount", e.target.value)
                      }
                      placeholder="Amount"
                      className={styles.prizeAmount}
                    />
                    {errors[`prize_amount_${index}`] && (
                      <div className={styles.error}>
                        {errors[`prize_amount_${index}`]}
                      </div>
                    )}
                  </div>
                ))}
                <div>
                  <CustomButton
                    type="button"
                    onClick={addPrize}
                    className={styles.addButton}
                  >
                    Add Prize
                  </CustomButton>
                  <CustomButton
                    type="button"
                    onClick={() => removePrize(eventData.prizes.length - 1)}
                    className={styles.removeButton}
                    disabled={eventData.prizes.length === 1}
                  >
                    Remove
                  </CustomButton>
                </div>

              </div>
              <div
                className={classNames(styles.formGroup, {
                  [styles.error]: errors.otherPrizes,
                })}
              >
                <label htmlFor="otherPrizes">Other Prizes</label>
                <input
                  id="otherPrizes"
                  name="otherPrizes"
                  value={eventData.otherPrizes}
                  onChange={handleChange}
                />
                {errors.otherPrizes && (
                  <span className={styles.error}>{errors.otherPrizes}</span>
                )}
              </div>
                {/* Display total prize amount */}
                <div className={styles.totalPrizeAmount}>
                  <label>Total Prize Amount: </label>
                  <span>{totalPrizeAmount}</span>
                </div>
              <div className={styles.buttonGroup}>
                <CustomButton type="secondary" onClick={onClose}>
                  Cancel
                </CustomButton>
                <CustomButton
                  type="primary"
                  isLoading={loading}
                  onClick={handleSubmit}
                >
                  {edit ? "Save Changes" : "Create Event"}
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateEventModal;
