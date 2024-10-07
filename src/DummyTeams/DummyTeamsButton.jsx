import React, { useState } from "react";
import {
  useCreateTeam,
  useGetEventById,
  useGetSquadsByEvent,
  useGetDummyUsers,
} from "./services.js";
import CustomButton from "../components/common/CustomButton";
import "./DummyTeamsButton.css";

// Helper functions
const getRandomUniqueNPlayers = (players, type, n) => {
  let availablePlayers = players[type] || [];
  const totalPlayersToSelect = Math.min(n, availablePlayers.length);
  const selectedPlayers = new Set();
  const randomPlayers = [];

  for (let i = 0; i < totalPlayersToSelect; i++) {
    availablePlayers = availablePlayers.filter(
      (player) => !selectedPlayers.has(player)
    );
    if (availablePlayers.length === 0) break;

    const randomIndex = Math.floor(Math.random() * availablePlayers.length);
    const randomPlayer = availablePlayers[randomIndex];
    randomPlayers.push(randomPlayer);
    selectedPlayers.add(randomPlayer);
  }

  return randomPlayers;
};

const DummyTeamsButton = ({
  eventId,
  status,
  setEnabledId,
  enabled,
  seatLeft,
  fetchEvents,
}) => {
  // State
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [numberOfTeams, setNumberOfTeams] = useState(0);
  const [error, setError] = useState(null);

  // Custom hooks
  const { mutate: createTeam, isPending: isCreatingTeams } = useCreateTeam();
  const { data: playersRes, isPending: isPlayersPending } = useGetSquadsByEvent(
    eventId,
    enabled
  );
  const { data: limitsRes, isPending: isLimitsPending } = useGetEventById(
    eventId,
    enabled
  );
  const { data: dummyUsersRes, isPending: isDummyUsersPending } =
    useGetDummyUsers(eventId, enabled);

  const loadingData =
    isPlayersPending || isLimitsPending || isDummyUsersPending;

  // Event handlers
  const openPopup = () => {
    setIsPopupOpen(true);
    setEnabledId(eventId);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setEnabledId(null);
  };
  const allTeams = () => {
    const teamsToCreate = Math.min(
      parseInt(numberOfTeams, 10),
      dummyUsersRes.length
    );
    const players = playersRes;
    const limits = {
      batsman: limitsRes.batsman_limit,
      bowler: limitsRes.bowler_limit,
      allrounder: limitsRes.all_rounder_limit,
      wicketkeeper: limitsRes.wicketkeeper_limit,
    };
    const teamSize = limitsRes.team_size;
    const alreadySelectedUsers = new Set();
    const teams = [];

    for (let i = 0; i < teamsToCreate; i++) {
      const unSelectedUsers = dummyUsersRes.filter(
        (user) => !alreadySelectedUsers.has(user.user_id)
      );
      if (unSelectedUsers.length === 0) {
        break;
      }

      const randomUser =
        unSelectedUsers[Math.floor(Math.random() * unSelectedUsers.length)];
      alreadySelectedUsers.add(randomUser.user_id);

      const playersPool = ["batsman", "bowler", "allrounder", "wicketkeeper"]
        .flatMap((category) =>
          getRandomUniqueNPlayers(players, category, limits[category] || 0)
        )
        .sort(() => 0.5 - Math.random());

      if (playersPool.length < teamSize) continue;

      const selectedPlayers = playersPool.slice(0, teamSize);
      const randomCaptainPool = selectedPlayers.filter(
        (player) =>
          !randomUser.captain_match_player_ids.includes(player.matchPlayerId)
      );

      if (randomCaptainPool.length === 0) {
        continue;
      }

      const randomCaptain =
        randomCaptainPool[Math.floor(Math.random() * randomCaptainPool.length)];

      const team = {
        user_id: randomUser.user_id,
        captainId: randomCaptain.matchPlayerId,
        playerIds: selectedPlayers.map((player) => player.matchPlayerId),
        event_id: eventId,
      };

      teams.push(team);
    }

    return teams;
  };

  const handleSubmit = async () => {
    setError(null);
    try {
      const teams = allTeams();
      const submitData = {
        userData: teams,
      };
      createTeam(
        { data: submitData },
        {
          onSuccess: () => {
            // window.location.reload();
            fetchEvents();
            closePopup();
          },
          onError: (err) => {
            setError(err.message || "An error occurred while creating teams.");
          },
        }
      );
    } catch (err) {
      setError(err.message || "An error occurred while creating teams.");
    }
  };

  return (
    <div className="dummy-teams-button">
      <div
        style={{
          marginTop: "2px",
        }}
      >
        <CustomButton
          onClick={openPopup}
          type="primary"
          size="small"
          width="120px"
          disabled={status !== "UPCOMING"}
        >
          Fill Teams
        </CustomButton>
      </div>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">
              <h2 className="popup-title">Add Dummy Teams</h2>

              <button className="close-button" onClick={closePopup}>
                &times;
              </button>
            </div>
            <div className="popup-header">
              <p>{seatLeft} seats left</p>
              <p>{dummyUsersRes?.length} Users available</p>
            </div>
            <div className="form-group">
              <label className="form-label">
                Number of Teams:
                <input
                  className="form-input"
                  type="number"
                  min="1"
                  placeholder={`Max:${Math.min(
                    dummyUsersRes?.length,
                    seatLeft
                  )} at a time`}
                  value={numberOfTeams}
                  onChange={(e) =>
                    setNumberOfTeams(parseInt(e.target.value, 10))
                  }
                  required
                  max={Math.min(dummyUsersRes?.length, seatLeft)}
                />
              </label>
            </div>
            <CustomButton
              type="primary"
              size="small"
              disabled={
                isCreatingTeams ||
                loadingData ||
                !numberOfTeams ||
                Math.min(dummyUsersRes?.length, seatLeft) <= 0
              }
              onClick={handleSubmit}
            >
              {isCreatingTeams
                ? `Creating teams...`
                : loadingData
                ? "Please wait..."
                : "Create Teams"}
            </CustomButton>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default DummyTeamsButton;
