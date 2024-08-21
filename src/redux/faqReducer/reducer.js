import * as types from "./actionTypes";

const initialState = {
  faqList: [],

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_FAQ_SUCCESS:
      return {
        ...state,
        faqList: action.payload.faqs,


      };

    default:
      return state;
  }
};

export { reducer };
