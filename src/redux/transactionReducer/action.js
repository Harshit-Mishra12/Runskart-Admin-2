/* eslint-disable import/no-extraneous-dependencies */
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

// import { toast } from "react-toastify";

import API_URL from "../../config";
import * as types from "./actionTypes";

export const fetchtransactionlist = (params, callback) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.post(
      `${API_URL}/admin/transactions/fetch`,
      params,
      config
    );

    if (response.data.status_code === 1) {
      dispatch({ type: types.GET_TRANSACTIONLIST_SUCCESS, payload: response.data.data });

      callback({ statusCode: 1, message: "success" });
    } else {
      callback({ statusCode: 2, message: "fail" });
    }
    return { statusCode: 1, message: "success" };
  } catch (error) {
    console.error("Login error:", error);
    return { statusCode: 2, message: error.message };
  }
};

export const updatetransactionstatus = (params, callback) => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.post(
        `${API_URL}/admin/transactions/status/update`,
        params,
        config
      );

      if (response.data.status_code === 1) {
        // dispatch({ type: types.GET_TRANSACTIONLIST_SUCCESS, payload: response.data.data });

        callback({ statusCode: 1, message: "success" });
      } else {
        callback({ statusCode: 2, message: "fail" });
      }
      return { statusCode: 1, message: "success" };
    } catch (error) {
      console.error("Login error:", error);
      return { statusCode: 2, message: error.message };
    }
  };


