/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";

// import { toast } from "react-toastify";

import API_URL from '../../config';
import * as types from "./actionTypes";




export const fetchusers = (params, callback) => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  try {
    const response = await axios.post(`${API_URL}/admin/users/fetch`, params,config);

    if (response.data.status_code === 1 ) {

      dispatch({ type: types.GET_USER_SUCCESS ,payload:response.data.data});

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



export const fetchuserdetail = (id,callback) => async (dispatch) => {

    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  try {
    const response = await axios.get(`${API_URL}/admin/users/fetch/${id}`, config);

    if (response.data.status_code === 1 ) {

      dispatch({ type: types.GET_USERDETAIL_SUCCESS ,payload:response.data.data});

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

export const verifyuser = (id,callback) => async (dispatch) => {

    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  try {
    const response = await axios.get(`${API_URL}/admin/users/verify/${id}`, config);

    if (response.data.status_code === 1 ) {

      dispatch({ type: types.GET_VERIFY_SUCCESS ,payload:response.data.data});
      dispatch(fetchuserdetail(id, callback));
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


export const changestatus = (id,callback) => async (dispatch) => {

  const token = JSON.parse(localStorage.getItem('token'));
  const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
try {
  const response = await axios.get(`${API_URL}/admin/users/changestatus/${id}`, config);

  if (response.data.status_code === 1 ) {
    dispatch(fetchuserdetail(id, callback));
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

export const fetchuserteamlist = (id,callback) => async (dispatch) => {
  console.log("fetcheventdetail:");
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  try {
    const response = await axios.get(`${API_URL}/user/events/all/user-team/${id}`, config);
    console.log("check result fetcheventteamplayerlist:",response.data.teams);
    if (response.data.status_code === 1 ) {

      dispatch({ type: types.GET_USERLIST_SUCCESS ,payload:response.data.teams});

      callback( { statusCode: 1, message: "success" });
    }
    else{
      callback( { statusCode: 2, message: "fail" });
      dispatch({ type: types.GET_USERLIST_SUCCESS ,payload:[]});
    }
    return { statusCode: 1, message: "success"};

  } catch (error) {
    console.error("dashboard error:", error);
    return { statusCode: 2, message: error.message };
  }
};



