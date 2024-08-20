import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import styles from "./Header.module.css";

const Header = ({ sidebarOpen, setSidebarOpen,handleLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <button
          className={styles.menuButton}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Bars3Icon className={styles.menuIcon} />
        </button>
      </div>

      <div className={styles.headerRight}>
        <div className={styles.avatarContainer}>
          <button className={styles.avatarButton} onClick={toggleDropdown}>
            <img
              className={styles.avatarImage}
              src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
              alt="Your avatar"
            />
          </button>

          {dropdownOpen && (
            <div className={styles.dropdownMenu}>
              <ul>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
