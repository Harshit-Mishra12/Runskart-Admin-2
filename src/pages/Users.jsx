import React, { useState } from "react";
import CustomButton from "../components/common/CustomButton";
import styles from "./Users.module.css";
import { useNavigate } from "react-router-dom";

const tempUsers = [
  {
    id: 1,
    name: "John Doe",
    dateRegistered: "2023-01-15",
    email: "john.doe@example.com",
    phone: "+1 123-456-7890",
    dob: "1990-05-20",
    displayPicture: "https://picsum.photos/200/300/?random=1",
    verified: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    dateRegistered: "2023-02-10",
    email: "jane.smith@example.com",
    phone: "+1 234-567-8901",
    dob: "1988-11-30",
    displayPicture: "https://picsum.photos/200/300/?random=2",
    verified: false,
  },
  // Add more user objects as needed
];

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(tempUsers);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.usersContainer}>
      <div className={styles.header}>
        <h1>Users</h1>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchInput}
          />
        </div>
      </div>
      <div className={styles.statsBar}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{users.length}</span>
          <span className={styles.statLabel}>Total Users</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>
            {users.filter((user) => user.verified).length}
          </span>
          <span className={styles.statLabel}>Verified Users</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>
            {users.filter((user) => !user.verified).length}
          </span>
          <span className={styles.statLabel}>Unverified Users</span>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.usersTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date Registered</th>
              <th>Email ID</th>
              <th>Phone Number</th>
              <th>Date of Birth</th>
              <th>Display Picture</th>
              <th>Verification Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.dateRegistered}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.dob}</td>
                <td>
                  <img
                    src={user.displayPicture}
                    alt={user.name}
                    className={styles.userAvatar}
                  />
                </td>
                <td>
                  <span
                    style={{
                      backgroundColor: user.verified ? "#d4edda" : "#f8d7da",
                      padding: "0.5rem 1rem",
                      borderRadius: "0.5rem",
                      color: user.verified ? "#155724" : "#721c24",
                      fontWeight: "bold",
                    }}
                  >
                    {user.verified ? "Verified" : "Unverified"}
                  </span>
                </td>
                <td>
                  <CustomButton
                    type="secondary"
                    onClick={() => {
                      navigate(`/users/${user.id}`);
                    }}
                  >
                    View
                  </CustomButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
