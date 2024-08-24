import React from "react";
import { colors } from "../../utils/styles";

const EventStatus = ({ status }) => {
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
      case "UPCOMING":
        return colors.info;
      case "CANCELLED":
        return colors.danger; // E.g., red for CANCELLED
      case "ACTIVE":
        return colors.success; // E.g., red for CANCELLED
      case "INACTIVE":
        return colors.danger; // E.g., red for CANCELLED
      default:
        return colors.default; // E.g., gray for unknown status
    }
  };

  return (
    <span
      style={{
        color: "white",
        backgroundColor: getStatusColor(status),
        padding: "5px 10px",
        borderRadius: "5px",
        fontWeight: "500",
      }}
    >
      {status}
    </span>
  );
};

export default EventStatus;
