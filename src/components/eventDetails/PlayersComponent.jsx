import React, { useState, useEffect } from "react";
import styles from "./PlayersStyles.module.css";

const PlayersComponent = ({ playersListData, onPlayersStatusChange, setUpdatedPlayers, updatedPlayers }) => {
  // Initialize players and updatedPlayers arrays
  const [players, setPlayers] = useState(playersListData);

  // Handle the toggle of playing status
  const handleToggleStatus = (index) => {
    const updatedList = players.map((player, idx) => {
      if (index === idx) {
        const newStatus = player.playing_status === "PLAYING" ? "NOTPLAYING" : "PLAYING";
        const updatedPlayer = {
          ...player,
          playing_status: newStatus,
        };

        // Add or update the player in the updatedPlayers array
        let updatedArray = [...updatedPlayers];
        const playerIndex = updatedArray.findIndex((p) => p.match_player_id === player.id);

        if (playerIndex >= 0) {
          updatedArray[playerIndex].playing_status = newStatus;
        } else {
          updatedArray.push({
            match_player_id: player.id, // Use player.id as match_player_id
            playing_status: newStatus,
          });
        }

        setUpdatedPlayers(updatedArray);

        // Return the updated player
        return updatedPlayer;
      }
      return player;
    });

    setPlayers(updatedList);
  };

  // Pass updatedPlayers array to the parent component
  useEffect(() => {
    onPlayersStatusChange(updatedPlayers);
  }, [updatedPlayers, onPlayersStatusChange]);

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Name</th>
            <th>Team</th>
            <th>Playing Status</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr
              key={player.id} // Use player.id as the key
              onClick={(e) => {
                if (e.target.tagName !== "INPUT") {
                  handleToggleStatus(index); // Ensure only row clicks trigger toggle
                }
              }}
              className={styles.row}
            >
              <td>{index + 1}</td> {/* Sr. No. */}
              <td>{player.player_name}</td>
              <td>{player.team}</td>
              <td>
                <input
                  type="checkbox"
                  checked={player.playing_status === "PLAYING"}
                  onChange={() => handleToggleStatus(index)} // Manually toggle status
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayersComponent;
