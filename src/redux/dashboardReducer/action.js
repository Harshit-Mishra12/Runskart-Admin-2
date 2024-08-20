/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";

// import { toast } from "react-toastify";

import API_URL from '../../config';
import * as types from "./actionTypes";



export const dashboard = (callback) => async (dispatch) => {
    console.log("check response dashboard api ");
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  try {
    const response = await axios.get(`${API_URL}/admin/dashboard`, config);
    console.log("response dashboard api ", response.data);
    if (response.data.status_code === 1 ) {

      dispatch({ type: types.GET_DASHBAORD_SUCCESS ,payload:response.data.data});

      callback( { statusCode: 1, message: "success" });
    }
    else{
      callback( { statusCode: 2, message: "fail" });
    }
    return { statusCode: 1, message: "success"};

  } catch (error) {
    console.error("dashboard error:", error);
    return { statusCode: 2, message: error.message };
  }
};


export const eventcount = (params,callback) => async (dispatch) => {
    console.log("check response eventcount api ");
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  try {
    const response = await axios.post(`${API_URL}/admin/events/count`,params,config);
    console.log("response dashboard api ", response.data);
    if (response.data.status_code === 1 ) {

      dispatch({ type: types.GET_EVENTCOUNT_SUCCESS ,payload:response.data.data});

      callback( { statusCode: 1, message: "success" });
    }
    else{
    //   callback( { statusCode: 2, message: "fail" });
    }
    return { statusCode: 1, message: "success"};

  } catch (error) {
    console.error("dashboard error:", error);
    return { statusCode: 2, message: error.message };
  }
};
