import * as types from "./actionTypes";

const initialState = {
  usersList: [],
  totalVerifiedUser: "",
  totalUnVerifiedUser: "",
  totalUsers: "",
  userDetail: "",
  userTeamList: [],
};

const reducer = (state = initialState, action) => {
  console.log("check:", action.payload);
  switch (action.type) {
    case types.GET_USER_SUCCESS:
      return {
        ...state,
        usersList: action.payload.usersList,
        totalVerifiedUser: action.payload.verifiedCount,
        totalUnVerifiedUser: action.payload.unverifiedCount,
        totalUsers: action.payload.totalUsers,
      };
    case types.GET_USERDETAIL_SUCCESS:
      return {
        ...state,
        userDetail: action.payload,
      };

    case types.GET_USERLIST_SUCCESS:
      return {
        ...state,
        userTeamList: action.payload,
      };

    default:
      return state;
  }
};

export { reducer };
