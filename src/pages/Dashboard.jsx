import React, { useState } from "react";
import styles from "./Dashboard.module.css";
import {
  FaCalendarAlt,
  FaTrophy,
  FaUsers,
  FaMoneyBillWave,
  FaGamepad,
} from "react-icons/fa";

const tempData = {
  eventsCreated: {
    day: 5,
    week: 28,
    month: 120,
  },
  lastEventWinner: {
    name: "Jane Smith",
    event: "Super League 2023",
  },
  usersRegistered: 15000,
  amountObtained: {
    day: 5000,
    week: 35000,
    month: 150000,
  },
  matchesToday: 8,
};

const Dashboard = () => {
  const [eventsPeriod, setEventsPeriod] = useState("day");
  const [amountPeriod, setAmountPeriod] = useState("day");

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.dashboardTitle}>Dashboard</h1>
      <div className={styles.cardGrid}>
        <Card
          icon={<FaCalendarAlt />}
          title="Events Created"
          value={tempData.eventsCreated[eventsPeriod]}
          dropdown={
            <select
              value={eventsPeriod}
              onChange={(e) => setEventsPeriod(e.target.value)}
              className={styles.dropdown}
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
          }
        />
        <Card
          icon={<FaTrophy />}
          title="Last Event Winner"
          value={tempData.lastEventWinner.name}
          subtitle={`Winner of ${tempData.lastEventWinner.event}`}
        />
        <Card
          icon={<FaUsers />}
          title="Users Registered"
          value={tempData.usersRegistered.toLocaleString()}
          subtitle="Total Users"
        />
        <Card
          icon={<FaMoneyBillWave />}
          title="Amount Obtained"
          value={`₹${tempData.amountObtained[amountPeriod].toLocaleString()}`}
          dropdown={
            <select
              value={amountPeriod}
              onChange={(e) => setAmountPeriod(e.target.value)}
              className={styles.dropdown}
            >
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
          }
        />
        <Card
          icon={<FaGamepad />}
          title="Matches Today"
          value={tempData.matchesToday}
          subtitle="Scheduled Matches"
        />
      </div>
    </div>
  );
};

const Card = ({ icon, title, value, subtitle, dropdown }) => (
  <div className={styles.card}>
    <div className={styles.cardIcon}>{icon}</div>
    <div className={styles.cardContent}>
      <h2 className={styles.cardTitle}>{title}</h2>
      <p className={styles.cardValue}>{value}</p>
      {subtitle && <p className={styles.cardSubtitle}>{subtitle}</p>}
    </div>
    {dropdown && <div className={styles.cardDropdown}>{dropdown}</div>}
  </div>
);

export default Dashboard;
