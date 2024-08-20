import * as types from './actionTypes';


const initialState = {
  dashboardData: {},
  eventscount:0
};

const reducer = (state = initialState, action) => {
    console.log("check reducer:",action.payload);
  switch (action.type) {
    case types.GET_DASHBAORD_SUCCESS:

      return {
        ...state,
        dashboardData: {...action.payload},


      };
      case types.GET_EVENTCOUNT_SUCCESS:

      return {
        ...state,
        eventscount: {...action.payload},


      };


    default:
      return state;
  }
};

export { reducer };
