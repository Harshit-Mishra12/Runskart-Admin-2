import React, { useState } from "react";
import styles from "./Login.module.css";
import CustomButton from "../components/common/CustomButton";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("Qwerty@gamil.com");
  const [password, setPassword] = useState("Qwerty123");
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <img
          src="https://picsum.photos/500"
          alt="App Logo"
          className={styles.appLogo}
        />
        <h1 className={styles.loginTitle}>Welcome Back</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <CustomButton type="primary" width="200px">
            Login
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default Login;
