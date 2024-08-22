/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";

// import { toast } from "react-toastify";

import API_URL from '../../config';
import * as types from "./actionTypes";


export const fetchevents = (params,callback) => async (dispatch) => {

    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  try {
    const response = await axios.post(`${API_URL}/admin/events/fetch`,params,config);

    if (response.data.status_code === 1 ) {

      dispatch({ type: types.GET_EVENT_SUCCESS ,payload:response.data.data});

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

export const fetchmatches = (params,callback) => async (dispatch) => {

    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  try {
    const response = await axios.post(`${API_URL}/admin/events/fetch-matches/external`,params,config);

    if (response.data.status_code === 1 ) {

      dispatch({ type: types.GET_MATCHES_SUCCESS ,payload:response.data.data});

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


export const createevent = (params,callback) => async (dispatch) => {

    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  try {
    const response = await axios.post(`${API_URL}/admin/events/add`,params,config);

    if (response.data.status_code === 1 ) {

      dispatch({ type: types.CREATE_EVENT_SUCCESS ,payload:response.data.data});

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

export const fetcheventdetail = (id,callback) => async (dispatch) => {

    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  try {
    const response = await axios.get(`${API_URL}/admin/events/fetch/${id}`, config);

    if (response.data.status_code === 1 ) {

      dispatch({ type: types.GET_EVENTDETAIL_SUCCESS ,payload:response.data.data});

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

export const eventdelete = (id,callback) => async (dispatch) => {

    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  try {
    const response = await axios.get(`${API_URL}/admin/events/delete/${id}`, config);

    if (response.data.status_code === 1 ) {

      dispatch({ type: types.GET_EVENTDETAIL_SUCCESS ,payload:response.data.data});

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
