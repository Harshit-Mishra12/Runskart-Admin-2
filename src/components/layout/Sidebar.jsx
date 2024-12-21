import React from "react";
import { Link, useLocation } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChartPieIcon,
  CalendarIcon,
  UsersIcon,
  CurrencyDollarIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";
import styles from "./Sidebar.module.css";

const navigation = [
  { name: "Dashboard", href: "/", icon: ChartPieIcon },
  { name: "Events", href: "/events", icon: CalendarIcon },
  { name: "Users", href: "/users", icon: UsersIcon },
  { name: "Transactions", href: "/transactions", icon: CurrencyDollarIcon },
  { name: "FAQ", href: "/faq", icon: QuestionMarkCircleIcon },
  { name: "Terms & Conditions", href: "/termsAndCondition", icon: UsersIcon },

];

const Sidebar = ({ open, setOpen }) => {
  const location = useLocation();

  return (
    <>
      <div
        className={`${styles.overlay} ${open ? styles.active : ""}`}
        onClick={() => setOpen(false)}
      ></div>

      <aside className={`${styles.sidebar} ${open ? styles.open : ""}`}>
        <div className={styles.sidebarHeader}>
          <h1>Runskart Admin</h1>
        </div>

        <nav className={styles.sidebarNav}>
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`${styles.navLink} ${
                location.pathname === item.href ? styles.activeLink : ""
              }`}
              onClick={() => setOpen(false)}
            >
              <item.icon className={styles.navIcon} />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <button className={styles.closeButton} onClick={() => setOpen(false)}>
          <XMarkIcon className={styles.closeIcon} />
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
