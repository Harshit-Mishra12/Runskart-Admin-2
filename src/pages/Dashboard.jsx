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
  FaRupeeSign
} from "react-icons/fa";
import { MdSportsCricket } from "react-icons/md";
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
    dispatch(fetchDashboardData(callbackAfterLoginSuccess));
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
            value={eventscount?.total_events || "N/A"}
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
        {/* {loading ? (
          <Skeleton />
        ) : (
          <Card
            icon={<FaTrophy />}
            title="Last Event Winner"
            value={
              dashboardData?.latest_winner?.user_name || "N/A"
            }
            subtitle={`Winner of ${
              dashboardData?.latest_winner?.event || "No event available"
            }`}
          />
        )} */}
        {loading ? (
          <Skeleton />
        ) : (
          <Card
            icon={<FaUsers />}
            title="Users Registered"
            value={dashboardData?.total_users || "N/A"}
            subtitle="Total Users"
          />
        )}
        {/* {loading ? (
          <Skeleton />
        ) : (
          <Card
            icon={<FaRupeeSign />}
            title="Amount Obtained"
            value={`₹${dashboardData?.amount_obtained || "N/A"}`}
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
        )} */}
        {loading ? (
          <Skeleton />
        ) : (
          <Card
            icon={<MdSportsCricket />}
            title="Matches Today"
            value={dashboardData?.matches_today || "N/A"}
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
