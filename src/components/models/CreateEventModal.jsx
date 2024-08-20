import React, { useState, useEffect } from "react";
import styles from "./CreateEventModal.module.css";
import CustomButton from "../common/CustomButton";
import { tempMatches } from "../../utils/tempData";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { createevent, fetchmatches } from "../../redux/eventReducer/action";
import { useDispatch, useSelector } from "react-redux";

const CreateEventModal = ({ edit = false, event,eventFormCreated }) => {
  const dispatch = useDispatch();
  const { matchesList } = useSelector((store) => store.events);
  const [isOpen, setIsOpen] = useState(false);
  const [matchesData, setMatchesData] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [eventData, setEventData] = useState({
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
    prizes: [{ rank: 1, prize_amount: "" }],
    otherPrizes: "",
  });
  console.log("matches list:", matchesList);
  useEffect(() => {
    const params = {
      date: date,
    };
    dispatch(fetchmatches(params));
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

  const callbackFunction=(result)=>{
    if(result.statusCode == 1)
    {
      onClose();
      eventFormCreated();
    }

  }
  const handleSubmit = (e) => {
    e.preventDefault();
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
      winners_limit:eventData.winnersLimit,
      prizes:eventData.prizes,
      other_prizes:eventData.otherPrizes,
      matches:eventData.matches
    };
    console.log("handleSubmit:",params);
    // return;
    dispatch(createevent(params,callbackFunction));

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
      prizes: [{ rank: 1, prize_amount: "" }],
    });
  };

  return (
    <>
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

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Event Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={eventData.name}
                  onChange={handleChange}
                  required
                />

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
                  {matchesList &&
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
                      </div>
                    ))}
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="teamSizeLimit">Team Size Limit</label>
                  <input
                    type="number"
                    id="teamSizeLimit"
                    name="teamSizeLimit"
                    value={eventData.teamSizeLimit}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="batsmanLimit">Batsman Limit</label>
                  <input
                    type="number"
                    id="batsmanLimit"
                    name="batsmanLimit"
                    value={eventData.batsmanLimit}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="bowlerLimit">Bowler Limit</label>
                  <input
                    type="number"
                    id="bowlerLimit"
                    name="bowlerLimit"
                    value={eventData.bowlerLimit}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="allRounderLimit">All-Rounder Limit</label>
                  <input
                    type="number"
                    id="allRounderLimit"
                    name="allRounderLimit"
                    value={eventData.allRounderLimit}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="teamCreationCost">Team Creation Cost</label>
                <input
                  type="number"
                  id="teamCreationCost"
                  name="teamCreationCost"
                  value={eventData.teamCreationCost}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
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
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="winnersLimit">Winners Limit</label>
                <input
                  type="number"
                  id="winnersLimit"
                  name="winnersLimit"
                  value={eventData.winnersLimit}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Prizes</label>
                {eventData.prizes.map((prize, index) => (
                  <div key={index} className={styles.prizeRow}>
                    <input
                      type="number"
                      value={prize.rank}
                      onChange={(e) =>
                        handlePrizeChange(index, "rank", e.target.value)
                      }
                      placeholder="Rank"
                      className={styles.prizeRank}
                    />
                    <input
                      type="number"
                      value={prize.prize_amount}
                      onChange={(e) =>
                        handlePrizeChange(index, "prize_amount", e.target.value)
                      }
                      placeholder="Amount"
                      className={styles.prizeAmount}
                    />
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
              <div className={styles.formGroup}>
                <label htmlFor="otherPrizes">Other Prizes</label>
                <input
                  type="number"
                  id="otherPrizes"
                  name="otherPrizes"
                  value={eventData.otherPrizes}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.buttonGroup}>
                <CustomButton type="secondary" onClick={onClose}>
                  Cancel
                </CustomButton>
                <CustomButton type="primary" submit>
                  {edit ? "Save Changes" : "Create Event"}
                </CustomButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateEventModal;
