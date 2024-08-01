import React, { useState, useEffect } from "react";
import styles from "./CreateEventModal.module.css";
import CustomButton from "../common/CustomButton";
import { tempMatches } from "../../utils/tempData";
import { XMarkIcon } from "@heroicons/react/24/outline";

const CreateEventModal = ({ edit = false, event }) => {
  const [isOpen, setIsOpen] = useState(false);
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
    prizes: [{ rank: 1, amount: "" }],
    otherPrizes: "",
  });

  useEffect(() => {
    if (edit && event) {
      setEventData({
        ...event,
        prizes: event.prizes || [{ rank: 1, amount: "" }],
      });
    }
  }, [edit, event, isOpen]);

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
        { rank: prevData.prizes.length + 1, amount: "" },
      ],
    }));
  };

  const removePrize = (index) => {
    setEventData((prevData) => ({
      ...prevData,
      prizes: prevData.prizes.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateEvent(eventData);
    onClose();
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
                  value={eventData.goLiveDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="matches">Matches</label>
                <div className={styles.matchesContainer}>
                  {tempMatches.map((match) => (
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
                      {match.team1} vs {match.team2}
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
                      value={prize.amount}
                      onChange={(e) =>
                        handlePrizeChange(index, "amount", e.target.value)
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
