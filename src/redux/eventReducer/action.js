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
export const updateevent = (params,callback) => async (dispatch) => {

  const token = JSON.parse(localStorage.getItem('token'));
  const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
try {
  const response = await axios.post(`${API_URL}/admin/events/update`,params,config);

  if (response.data.status_code === 1 ) {

    dispatch({ type: types.CREATE_EVENT_SUCCESS ,payload:response.data.data});
    await dispatch(fetcheventdetail(params.event_id, callback));

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
  console.log("fetcheventdetail:");
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

export const changestatus = (id,callback) => async (dispatch) => {

  const token = JSON.parse(localStorage.getItem('token'));
  const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
try {
  const response = await axios.get(`${API_URL}/admin/events/activate/${id}`, config);


  if (response.data.status_code === 1 ) {
    console.log("changestatus:");
    await dispatch(fetcheventdetail(id, callback));

    callback( { statusCode: 1, message: "success" });
  }
  else{
    callback( { statusCode: 2, message:response.data.message });
  }
  return { statusCode: 1, message: "success"};

} catch (error) {
  console.error("dashboard error:", error);
  return { statusCode: 2, message: error.message };
}
};


export const fetchmatchplayerslist = (id,callback) => async (dispatch) => {
  console.log("fetcheventdetail:");
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  try {
    const response = await axios.get(`${API_URL}/admin/events/matches/players/fetch/${id}`, config);

    if (response.data.status_code === 1 ) {

      dispatch({ type: types.GET_EVENTPLAYERSLIST_SUCCESS ,payload:response.data.data});

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

export const updateplayingstatus = (params,callback) => async (dispatch) => {

  const token = JSON.parse(localStorage.getItem('token'));
  const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
try {
  const response = await axios.post(`${API_URL}/admin/events/players/playingStatus`,params,config);

  if (response.data.status_code === 1 ) {



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


export const fetcheventteamlist = (id,callback) => async (dispatch) => {
  console.log("fetcheventdetail:");
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  try {
    const response = await axios.get(`${API_URL}/user/events/all/team/${id}`, config);
    console.log("check result fetcheventteamplayerlist:",response.data.teams);
    if (response.data.status_code === 1 ) {

      dispatch({ type: types.GET_EVENTTEAMLIST_SUCCESS ,payload:response.data.teams});

      callback( { statusCode: 1, message: "success" });
    }
    else{
      callback( { statusCode: 2, message: "fail" });
      dispatch({ type: types.GET_EVENTTEAMLIST_SUCCESS ,payload:[]});
    }
    return { statusCode: 1, message: "success"};

  } catch (error) {
    console.error("dashboard error:", error);
    return { statusCode: 2, message: error.message };
  }
};

export const fetchDownloadCsv = (id, callback) => async (dispatch) => {
  console.log("Fetching event detail:");
  const token = JSON.parse(localStorage.getItem('token'));
  const config = {
      headers: {
          Authorization: `Bearer ${token}`,
      },
      responseType: 'blob', // Important for handling binary data (CSV)
  };

  try {
      const response = await axios.get(`${API_URL}/admin/teams/export/${id}`, config);

      // Create a URL for the file and trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'teams_export.csv'); // Set the desired file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Call the callback with success
      callback({ statusCode: 1, message: "Download initiated successfully" });

  } catch (error) {
      console.error("Download error:", error);
      callback({ statusCode: 2, message: error.message });
  }
};


export const fetcheventteamprizelist = (id,callback) => async (dispatch) => {
  console.log("fetcheventdetail:");
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  try {
    const response = await axios.get(`${API_URL}/admin/events/teams/prize-amount/${id}`, config);
    console.log("check result fetcheventteamplayerlist:",response.data.teams);
    if (response.data.status_code === 1 ) {

      dispatch({ type: types.GET_EVENTTEAMPRIZELIST_SUCCESS ,payload:response.data.teams});
      callback( { statusCode: 1, message: "success" });
    }
    else{
      callback( { statusCode: 2, message: "fail" });
      dispatch({ type: types.GET_EVENTTEAMPRIZELIST_SUCCESS ,payload:[]});
    }
    return { statusCode: 1, message: "success"};

  } catch (error) {
    console.error("dashboard error:", error);
    return { statusCode: 2, message: error.message };
  }
};
