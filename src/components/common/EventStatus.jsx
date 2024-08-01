import React from "react";
import { colors } from "../../utils/styles";

const EventStatus = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Created":
        return colors.primary;
      case "Released":
        return colors.secondary;
      case "Live":
        return colors.success;
      case "Cancelled":
        return colors.danger;
      default:
        return colors.info;
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
