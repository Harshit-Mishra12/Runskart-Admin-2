import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import styles from "./Login.module.css";
import CustomButton from "../components/common/CustomButton";
import { useNavigate } from "react-router-dom";
import { login } from '../redux/authReducer/action';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("Qwerty@gamil.com");
  const [password, setPassword] = useState("Qwerty123");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // To store validation errors

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

    if(result.statusCode === 2)
      {
        // setSnackbarMessage('Invalid Credentials!');
        // setSnackbarSeverity('error');
        // setOpenSnackbar(true);
        // setLoading(false);
      }
      else{
        setLoading(false);
        navigate('/');
      }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      // No validation errors, proceed with dispatch
      const formData = { email, password };
      dispatch(login(formData, callbackAfterLoginSuccess));
    } else {
      setErrors(newErrors); // Set validation errors
    }
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
            {errors.password && <p className={styles.errorText}>{errors.password}</p>}
          </div>
          <CustomButton type="primary" width="200px">
            Login
          </CustomButton >
        </form>
      </div>
    </div>
  );
};

export default Login;
