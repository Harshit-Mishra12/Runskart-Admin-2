import * as types from './actionTypes';


const initialState = {
  eventsList: [],
  matchesList:[],
  totalEvents: "",
  eventDetail:"",
  playersList:[],
  eventTeamsList:[]

};

const reducer = (state = initialState, action) => {
    console.log("check reducer:",action.payload);
  switch (action.type) {
    case types.GET_EVENT_SUCCESS:

      return {
        ...state,
        eventsList: action.payload.eventsList,
        totalEvents:action.payload.totalEvents
      };

      case types.GET_MATCHES_SUCCESS:
      return {
        ...state,
        matchesList: action.payload,
      };

      case types.GET_EVENTDETAIL_SUCCESS:
      return {
        ...state,
        eventDetail: action.payload,
      };

      case types.GET_EVENTPLAYERSLIST_SUCCESS:
        return {
          ...state,
          playersList: action.payload,
        };

      case types.GET_EVENTTEAMLIST_SUCCESS:
        return {
          ...state,
          eventTeamsList: action.payload,
        };

    default:
      return state;
  }
};

export { reducer };
