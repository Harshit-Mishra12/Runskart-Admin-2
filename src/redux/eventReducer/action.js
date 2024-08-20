/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";

// import { toast } from "react-toastify";

import API_URL from '../../config';
import * as types from "./actionTypes";


export const fetchevents = (params,callback) => async (dispatch) => {
    console.log("check response eventcount api :",params);
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  try {
    const response = await axios.post(`${API_URL}/admin/events/fetch`,params,config);
    console.log("response dashboard api ", response.data);
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
    console.log("check response fetchmatches api :",params);
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  try {
    const response = await axios.post(`${API_URL}/admin/events/fetch-matches/external`,params,config);
    console.log("response fetchmatches api ", response.data);
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
    console.log("check response createevent api :",params);
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  try {
    const response = await axios.post(`${API_URL}/admin/events/add`,params,config);
    console.log("response createevent api ", response.data);
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
    console.log("check response createevent api :",id);
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  try {
    const response = await axios.get(`${API_URL}/admin/events/fetch/${id}`, config);
    console.log("response createevent api ", response.data.data);
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
    console.log("check response createevent api :",id);
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  try {
    const response = await axios.get(`${API_URL}/admin/events/delete/${id}`, config);
    console.log("response createevent api ", response.data.data);
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
