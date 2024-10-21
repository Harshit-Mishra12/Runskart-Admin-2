export const GET_TRANSACTIONLIST_SUCCESS = "GET_TRANSACTIONLIST_SUCCESS";
import * as types from "./actionTypes";

const initialState = {
  transactionList: [],
};

const reducer = (state = initialState, action) => {
  console.log("check:", action.payload);
  switch (action.type) {
    case types.GET_TRANSACTIONLIST_SUCCESS:
      return {
        ...state,
        transactionList: action.payload,
      };

    default:
      return state;
  }
};

export { reducer };
