import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  eventcount,
  dashboard as fetchDashboardData,
} from "../redux/dashboardReducer/action";

import {
  FaCalendarAlt,
  FaTrophy,
  FaUsers,
  FaMoneyBillWave,
  FaGamepad,
} from "react-icons/fa";
import Skeleton from "../components/common/Skeleton";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboardData, eventscount } = useSelector(
    (store) => store.dashboards
  );
  const [eventsPeriod, setEventsPeriod] = useState("day");
  const [amountPeriod, setAmountPeriod] = useState("day");
  const [loading, setLoading] = useState(false);
  const [eventsLoading, setEventsLoading] = useState(false);

  useEffect(() => {
    const callbackAfterLoginSuccess = (result) => {
      setLoading(false);
    };
    setLoading(true);
    dispatch(fetchDashboardData(callbackAfterLoginSuccess)); // Fetch dashboard data
  }, [dispatch]);

  useEffect(() => {
    const params = {
      type: eventsPeriod,
    };
    setEventsLoading(true);
    const callback = (result) => {
      if (result.statusCode === 1) {
        setEventsLoading(false);
      }
    };
    dispatch(eventcount(params, callback));
  }, [eventsPeriod, dispatch]);

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.dashboardTitle}>Dashboard</h1>
      <div className={styles.cardGrid}>
        {eventsLoading ? (
          <Skeleton />
        ) : (
          <Card
            icon={<FaCalendarAlt />}
            title="Events Created"
            value={eventscount?.total_events || "No data available"}
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
        )}
        {loading ? (
          <Skeleton />
        ) : (
          <Card
            icon={<FaTrophy />}
            title="Last Event Winner"
            value={
              dashboardData?.latest_winner?.user_name || "No data available"
            }
            subtitle={`Winner of ${
              dashboardData?.latest_winner?.event || "No event available"
            }`}
          />
        )}
        {loading ? (
          <Skeleton />
        ) : (
          <Card
            icon={<FaUsers />}
            title="Users Registered"
            value={dashboardData?.total_users || "No data available"}
            subtitle="Total Users"
          />
        )}
        {loading ? (
          <Skeleton />
        ) : (
          <Card
            icon={<FaMoneyBillWave />}
            title="Amount Obtained"
            value={`₹${dashboardData?.amount_obtained || "No data available"}`}
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
        )}
        {loading ? (
          <Skeleton />
        ) : (
          <Card
            icon={<FaGamepad />}
            title="Matches Today"
            value={dashboardData?.matches_today || "No data available"}
            subtitle="Scheduled Matches"
          />
        )}
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
