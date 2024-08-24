import React, { useState, useEffect } from "react";
import styles from "./CreateEventModal.module.css";
import CustomButton from "../common/CustomButton";
import { tempMatches } from "../../utils/tempData";
import { XMarkIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { updateevent } from "../../redux/eventReducer/action";
import { useDispatch } from "react-redux";
import Snackbar from "../common/Snackbar";

const EditEventModal = ({ edit = false, event,eventId, prizes ,otherPrizes,matchesCount}) => {
    const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});
  console.log("EditEventModal:",matchesCount);
  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState({
    name: "",
    teamSizeLimit: "",
    batsmanLimit: "",
    bowlerLimit: "",
    allRounderLimit: "",
    teamCreationCost: "",
    userParticipationLimit: "",
    winnersLimit: "",
    prizes: [{ rank: 1, amount: "" }],
    otherPrizes: "",
  });
  const [maxTeamSize, setMaxTeamSize] = useState(0);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [snackbarSeverity, setSnackbarSeverity] = useState(null);
  useEffect(() => {
    const calculateMaxTeamSize = () => {
      const numberOfTeams = matchesCount*22; // Assuming there are always 4 teams
      const playersPerTeam = 11; // Number of players per team
      setMaxTeamSize(numberOfTeams);
    };

    calculateMaxTeamSize();
  }, [matchesCount]);
  useEffect(() => {
    if (event) {
      setEventData({
        ...event,
        teamSizeLimit: event.team_size,
        batsmanLimit: event.batsman_limit,
        bowlerLimit: event.bowler_limit,
        allRounderLimit: event.all_rounder_limit,
        teamCreationCost: event.team_creation_cost,
        userParticipationLimit: event.user_participation_limit,
        winnersLimit: event.winners_limit,
        otherPrizes:otherPrizes,
        prizes: prizes || [{ rank: 1, amount: "" }],
      });
    }
  }, [edit, event, isOpen,otherPrizes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleMatchesChange = (selectedMatches) => {
    setEventData((prevData) => ({ ...prevData, matches: selectedMatches }));
  };

  const handlePrizeChange = (index, field, value) => {
    const updatedPrizes = [...eventData.prizes];
    updatedPrizes[index][field] = value;
    setEventData((prevData) => ({ ...prevData, prizes: updatedPrizes }));
  };

  const addPrize = () => {
    setEventData((prevData) => ({
      ...prevData,
      prizes: [
        ...prevData.prizes,
        { rank: prevData.prizes.length + 1,rank_from:prevData.prizes.length + 1,rank_to:prevData.prizes.length + 1, prize_amount: "" },
      ],
    }));
  };

  const removePrize = (index) => {
    setEventData((prevData) => ({
      ...prevData,
      prizes: prevData.prizes.filter((_, i) => i !== index),
    }));
  };
  const validate = () => {
    const newErrors = {};

    if (!eventData.name) newErrors.name = "Event Name is required";

    if (eventData.teamSizeLimit < 11) {
      newErrors.teamSizeLimit = "Team size limit cannot be less than 11";
    } else if (eventData.teamSizeLimit > maxTeamSize) {
      newErrors.teamSizeLimit = `Team size limit cannot be greater than ${maxTeamSize}`;
    }

    if (!eventData.batsmanLimit || eventData.batsmanLimit <= 0)
      newErrors.batsmanLimit = "Batsman Limit must be greater than 0";
    if (!eventData.bowlerLimit || eventData.bowlerLimit <= 0)
      newErrors.bowlerLimit = "Bowler Limit must be greater than 0";
    if (!eventData.allRounderLimit || eventData.allRounderLimit <= 0)
      newErrors.allRounderLimit = "All-Rounder Limit must be greater than 0";
    const totalPlayerLimit =
      parseInt(eventData.batsmanLimit, 10) +
      parseInt(eventData.bowlerLimit, 10) +
      parseInt(eventData.allRounderLimit, 10);
    if (totalPlayerLimit > eventData.teamSizeLimit) {
      newErrors.playerLimits =
        "The sum of Batsman Limit, Bowler Limit, and All-Rounder Limit cannot be greater than Team Size Limit";
    }
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


    eventData.prizes.forEach((prize, index) => {
      if (prize.prize_amount <= 0) {
        newErrors[`prize_amount_${index}`] =
          "Minimum prize amount should be greater than 0";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
    const displaySnackbar = () => {
    setSnackbarMessage("Check for  Validations!");
    setSnackbarSeverity("error");
  };
  const handleSubmit = () => {
    if (!validate())

        {
          displaySnackbar();
        console.log("check errors:",errors);
          return;
        }
    onCreateEvent(eventData);
    // onClose();
    setLoading(true);
    const params = {
        event_id:eventId,
        name: eventData.name,
        team_size: eventData.teamSizeLimit,
        batsman_limit: eventData.batsmanLimit,
        bowler_limit: eventData.bowlerLimit,
        all_rounder_limit: eventData.allRounderLimit,
        team_creation_cost: eventData.teamCreationCost,
        user_participation_limit: eventData.userParticipationLimit,
        winners_limit: eventData.winnersLimit,
        prizes: eventData.prizes,
        other_prizes: eventData.otherPrizes,
      };
      console.log("check:",params);
      const callbackFunction=()=>{
        setLoading(false);
        onClose();
      }
      dispatch(updateevent(params, callbackFunction));
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
      batsmanLimit: "",
      bowlerLimit: "",
      allRounderLimit: "",
      teamCreationCost: "",
      userParticipationLimit: "",
      winnersLimit: "",
      prizes: [{ rank: 1, amount: "" }],
    });
  };

  return (
    <>
     {snackbarMessage && (
        <Snackbar
          message={snackbarMessage}
          severity={snackbarSeverity}
          onClose={() => setSnackbarMessage(null)}
        />
      )}
      <CustomButton type="primary" onClick={() => setIsOpen(true)}>
        {edit ? "Edit Event" : "Edit Event"}
      </CustomButton>

      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>
              {edit ? "Edit Event" : "Edit Event"}
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

            <div  className={styles.form}>
            <div className={classNames(styles.formGroup, { [styles.error]: errors.name })}>
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

              <div className={styles.formRow}>
              <div className={classNames(styles.formGroup, { [styles.error]: errors.teamSizeLimit })}>
                  <label htmlFor="teamSizeLimit">Team Size Limit</label>
                  <input
                    type="number"
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
                <div className={classNames(styles.formGroup, { [styles.error]: errors.batsmanLimit })}>
                  <label htmlFor="batsmanLimit">Batsman Limit</label>
                  <input
                    type="number"
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
              <div className={classNames(styles.formGroup, { [styles.error]: errors.bowlerLimit })}>
                  <label htmlFor="bowlerLimit">Bowler Limit</label>
                  <input
                    type="number"
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
                <div className={classNames(styles.formGroup, { [styles.error]: errors.allRounderLimit })}>
                  <label htmlFor="allRounderLimit">All-Rounder Limit</label>
                  <input
                    type="number"
                    id="allRounderLimit"
                    name="allRounderLimit"
                    value={eventData.allRounderLimit}
                    onChange={handleChange}
                    required
                  />
                      {errors.allRounderLimit && (
                  <span className={styles.error}>{errors.allRounderLimit}</span>
                )}
                </div>
              </div>
              {errors.playerLimits && (
                <div className={styles.error}>{errors.playerLimits}</div>
              )}
              <div className={classNames(styles.formGroup, { [styles.error]: errors.teamCreationCost })}>
                <label htmlFor="teamCreationCost">Team Creation Cost</label>
                <input
                  type="number"
                  id="teamCreationCost"
                  name="teamCreationCost"
                  value={eventData.teamCreationCost}
                  onChange={handleChange}
                  required
                />
                       {errors.teamCreationCost && (
                  <span className={styles.error}>{errors.teamCreationCost}</span>
                )}
              </div>
              <div className={classNames(styles.formGroup, { [styles.error]: errors.userParticipationLimit })}>
                <label htmlFor="userParticipationLimit">
                  User Participation Limit
                </label>
                <input
                  type="number"
                  id="userParticipationLimit"
                  name="userParticipationLimit"
                  value={eventData.userParticipationLimit}
                  onChange={handleChange}
                  required
                />
                    {errors.userParticipationLimit && (
                  <span className={styles.error}>{errors.userParticipationLimit}</span>
                )}
              </div>
              <div className={classNames(styles.formGroup, { [styles.error]: errors.winnersLimit })}>
                <label htmlFor="winnersLimit">Winners Limit</label>
                <input
                  type="number"
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
                {eventData.prizes.map(
                  (prize, index) =>
                   (
                      <div key={index} className={styles.prizeRow}>
                        <input
                          type="number"
                          value={prize.rank_from}
                          onChange={(e) =>
                            handlePrizeChange(
                              index,
                              "rank",
                              e.target.value
                            )
                          }
                          placeholder="Rank From"
                          className={styles.prizeRank}
                        />
                        <input
                          type="number"
                          value={prize.prize_amount}
                          onChange={(e) =>
                            handlePrizeChange(
                              index,
                              "prize_amount",
                              e.target.value
                            )
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
                    )
                )}

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
              <div className={styles.formGroup}>
                <label htmlFor="otherPrizes">Other Prizes</label>
                <input
                  type="number"
                  id="otherPrizes"
                  name="otherPrizes"
                  value={
                    otherPrizes && eventData.otherPrizes
                  }
                  onChange={handleChange}
                />
              </div>
              <div className={styles.buttonGroup}>
                <CustomButton type="secondary" onClick={onClose}>
                  Cancel
                </CustomButton>
                <CustomButton type="primary" isLoading={loading} onClick={handleSubmit}>
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

export default EditEventModal;
