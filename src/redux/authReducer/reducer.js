import * as types from './actionTypes';

const parseJSON = (item) => {
  try {
    return JSON.parse(localStorage.getItem(item));
  } catch (e) {
    console.error(`Error parsing ${item} from localStorage`, e);
    return null;
  }
};
const initialState = {
  isAuth: parseJSON('isAuth') || false,
  token: parseJSON('token'),
  user:parseJSON('user'),
  isLoading: false,
  userData: JSON.parse(localStorage.getItem('userData')) || [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LOGIN_SUCCESS:
      console.log("response login api token",action.payload.user);
      localStorage.setItem('isAuth', JSON.stringify(true));
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', JSON.stringify(action.payload.token));

      return {
        ...state,
        isAuth: true,
        isErrorMessage: false, // Reset isErrorMessage on login request
      };
    case types.GET_LOGOUT_SUCCESS:
      console.log('in reducer');
      localStorage.setItem('isAuth', false);
      return {
        ...state,
        isAuth: false,
        isErrorMessage: false, // Reset isErrorMessage on login request
      };

    default:
      return state;
  }
};

export { reducer };
