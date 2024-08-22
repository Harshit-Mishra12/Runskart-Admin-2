/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";

// import { toast } from "react-toastify";

import API_URL from '../../config';
import * as types from "./actionTypes";



export const login = (params, callback) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, params);

    if (response.data.status_code === 1 ) {

      dispatch({ type: types.GET_LOGIN_SUCCESS ,payload:response.data.data});

      callback( { statusCode: 1, message: "success" });
    }
    else{
      callback( { statusCode: 2, message: "fail" });
    }
    return { statusCode: 1, message: "success"};

  } catch (error) {
    console.error("Login error:", error);
    return { statusCode: 2, message: error.message };
  }
};

export const logout = () => async (dispatch) => {
  localStorage.clear();
  dispatch({ type: types.GET_LOGOUT_SUCCESS });

};
