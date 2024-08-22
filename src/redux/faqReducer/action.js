/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import API_URL from '../../config';
import * as types from "./actionTypes";




export const fetchfaq = (callback) => async (dispatch) => {

    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  try {
    const response = await axios.get(`${API_URL}/admin/faq/fetch`, config);
    if (response.data.status_code === 1 ) {

      dispatch({ type: types.GET_FAQ_SUCCESS ,payload:response.data.data});

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

export const createfaq = (params,callback) => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  try {
    const response = await axios.post(`${API_URL}/admin/faq/add`, params,config);
    if (response.data.status_code === 1 ) {
        dispatch(fetchfaq(callback));
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

export const deletefaq = (id,callback) => async (dispatch) => {

    const token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  try {
    const response = await axios.get(`${API_URL}/admin/faq/delete/${id}`, config);
    if (response.data.status_code === 1 ) {

    //   dispatch({ type: types.GET_FAQ_SUCCESS ,payload:response.data.data});
    dispatch(fetchfaq(callback));
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



