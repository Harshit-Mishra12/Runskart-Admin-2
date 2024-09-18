import React, { useState, useEffect } from "react";
import CustomButton from "../components/common/CustomButton";
import styles from "./FAQ.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createfaq,
  deletefaq,
  fetchfaq,
  updatefaq,
} from "../redux/faqReducer/action";
import TableSkeleton from "../components/common/TableSkeleton";
import PlayersComponent from "../components/eventDetails/PlayersComponent";
import { fetchmatchplayerslist, updateplayingstatus } from "../redux/eventReducer/action";
import Snackbar from "../components/common/Snackbar";

const MatchPlayers = () => {
  const { playersList } = useSelector((store) => store.events); // Get playersList from Redux store
  const dispatch = useDispatch();
  const { id } = useParams(); // Get the event ID from route params
  const [playersListData, setPlayersListData] = useState([]); // Local state for players list
  const [loading, setLoading] = useState(false); // Loading state
  const [updatedPlayers, setUpdatedPlayers] = useState([]); // State for tracking updated players
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [snackbarSeverity, setSnackbarSeverity] = useState(null);
  // Fetch players list when component mounts or id changes
  useEffect(() => {
    const callbackAfterSuccess = (result) => {
      setLoading(false); // Stop loading when data is fetched
    };

    setLoading(true); // Start loading
    dispatch(fetchmatchplayerslist(id, callbackAfterSuccess)); // Fetch players data for the given event ID
  }, []);

  // Update playersListData and updatedPlayers when playersList from Redux store changes
  useEffect(() => {
    if (playersList.length > 0) {
      setPlayersListData(playersList); // Set players list data
      setUpdatedPlayers(
        playersList.map((player) => ({
          match_player_id: player.id, // Initialize with player.id as match_player_id
          playing_status: player.playing_status === 'UNANNOUNCED' ?  'NOTPLAYING':player.playing_status, // Use current playing status or default to 'NOTPLAYING'
        }))
      );
    }
  }, [playersList]);

  // Handle changes in players' playing status from child component
  const handlePlayersStatusChange = (updatedPlayers) => {
    setUpdatedPlayers(updatedPlayers); // Update the state with the changes
  };
  console.log("updated check:",updatedPlayers);
  // Handle submit to update playing status in the database
  const handleSubmit = () => {
    const callbackAfterUpdate = () => {
      console.log('Status updated successfully');
    //   setLoading(false);
    displaySnackbar();
    };
    // setLoading(true);
    dispatch(updateplayingstatus(updatedPlayers, callbackAfterUpdate)); // Dispatch action to update the playing status
  };
  const displaySnackbar = () => {
    setSnackbarMessage(" Submited!");
    setSnackbarSeverity("success");
  };
  return (
    <div className={styles.faqContainer}>
         {snackbarMessage && (
        <Snackbar
          message={snackbarMessage}
          severity={snackbarSeverity}
          onClose={() => setSnackbarMessage(null)}
        />
      )}
      <div className={styles.header}>
        <h1>Match Players</h1>
        <CustomButton  type="primary" onClick={handleSubmit}>
          Submit
        </CustomButton>
      </div>
      <div className={styles.statsBar}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{playersListData.length}</span>
          <span className={styles.statLabel}>Total Players</span>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        {loading ? (
          <TableSkeleton />
        ) : (
          <PlayersComponent
            playersListData={playersListData} // Pass current players list
            updatedPlayers={updatedPlayers} // Pass the updated players
            setUpdatedPlayers={setUpdatedPlayers} // Allow PlayersComponent to update the state
            onPlayersStatusChange={handlePlayersStatusChange} // Handle status change
          />
        )}
      </div>
    </div>
  );
};

export default MatchPlayers;
