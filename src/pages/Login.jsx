import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./Login.module.css";
import CustomButton from "../components/common/CustomButton";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authReducer/action";
import Snackbar from "../components/common/Snackbar";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("1234567");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [snackbarSeverity, setSnackbarSeverity] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const callbackAfterLoginSuccess = (result) => {
    if (result.statusCode === 2) {
      setSnackbarMessage("Invalid Credentials!");
      setSnackbarSeverity("error");
      setIsLoading(false);
    } else {
      setSnackbarMessage("Login Successful!");
      setSnackbarSeverity("success");
      setLoading(false);
      setIsLoading(false);
      navigate("/");
    }
  };

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      const formData = { email, password };
      dispatch(login(formData, callbackAfterLoginSuccess));
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className={styles.loginContainer}>
      {snackbarMessage && (
        <Snackbar
          message={snackbarMessage}
          severity={snackbarSeverity}
          onClose={() => setSnackbarMessage(null)}
        />
      )}
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
            {errors.email && <p className={styles.errorText}>{errors.email}</p>}
          </div>
          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className={styles.errorText}>{errors.password}</p>
            )}
          </div>
          <CustomButton isLoading={isLoading} type="primary" width="200px">
            Login
          </CustomButton>
        </form>
      </div>
    </div>
  );
};

export default Login;
