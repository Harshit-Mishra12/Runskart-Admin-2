import React, { useState, useEffect, useCallback } from "react";
import CustomButton from "../components/common/CustomButton";
import styles from "./Users.module.css";
import { useNavigate } from "react-router-dom";
import { fetchusers } from "../redux/userReducer/action";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import TableSkeleton from "../components/common/TableSkeleton";

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const userPerPage = 5; // Adjust as needed
  const { usersList, totalVerifiedUser, totalUnVerifiedUser, totalUsers } =
    useSelector((store) => store.users);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const totalPages = Math.ceil(totalUsers / userPerPage);
  // Debounce the fetchUsers function, but only when searchTerm changes
  const debouncedFetchUsers = useCallback(
    _.debounce((term) => {
      const callbackAfter = () => {
        setLoading(false);
      };
      let params = "";
      if (term === "") {
        params = {
          per_page: userPerPage,
          page: currentPage,
          search_name: term,
        };
      } else if (term != "") {
        params = {
          per_page: userPerPage,
          page: 1,
          search_name: term,
        };
      }

    dispatch(fetchusers(params, callbackAfter));
    }, 1000), // 2 seconds debounce
    [currentPage] // Dependencies include currentPage so it uses the latest value
  );

  // Fetch users when pagination changes
  useEffect(() => {
    const callbackAfter = () => setLoading(false);
    const params = {
      per_page: userPerPage,
      page: currentPage,
      search_name: searchTerm,
    };
    setLoading(true);
    dispatch(fetchusers(params, callbackAfter));
  }, [currentPage, dispatch]);

  // Call the debounced function only when searchTerm changes
  useEffect(() => {
    debouncedFetchUsers(searchTerm);
    return debouncedFetchUsers.cancel; // Cleanup on unmount or when searchTerm changes
  }, [searchTerm, debouncedFetchUsers]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

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
          <span className={styles.statValue}>{totalUsers}</span>
          <span className={styles.statLabel}>Total Users</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{totalVerifiedUser}</span>
          <span className={styles.statLabel}>Verified Users</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{totalUnVerifiedUser}</span>
          <span className={styles.statLabel}>Unverified Users</span>
        </div>
      </div>
      <div className={styles.tableWrapper}>
        {loading ? (
          <TableSkeleton />
        ) : (
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
              {usersList.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.created_at.split("T")[0]}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile_number}</td>
                  <td>{user.dob}</td>
                  <td>
                    <img
                      src={user.profile_picture}
                      alt={user.name}
                      className={styles.userAvatar}
                    />
                  </td>
                  <td>
                    <span
                      style={{
                        backgroundColor:
                          user.status === "ACTIVE" ? "#d4edda" : "#f8d7da",
                        padding: "0.5rem 1rem",
                        borderRadius: "0.5rem",
                        color: user.status === "ACTIVE" ? "#155724" : "#721c24",
                        fontWeight: "bold",
                      }}
                    >
                      {user.status === "ACTIVE"
                        ? "Verified"
                        : user.status === "INACTIVE"
                        ? "Blocked"
                        : user.status === "VERIFICATIONPENDING"
                        ? "Unverified"
                        : "Unknown Status"}
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
        )}
      </div>
      <div className={styles.pagination}>
        <CustomButton
          type="primary"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </CustomButton>
        <div className={styles.space}></div>
        {/* <span>{`Page ${currentPage} of ${totalPages}`}</span> */}
        <CustomButton
          type="primary"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </CustomButton>
      </div>
    </div>
  );
};

export default Users;
