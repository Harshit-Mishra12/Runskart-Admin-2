/* eslint-disable import/no-extraneous-dependencies */

import { thunk } from "redux-thunk";
import {
  compose,
  applyMiddleware,
  combineReducers,
  legacy_createStore,
} from "redux";

import { reducer as authReducer } from "./authReducer/reducer";
import { reducer as dashboardReducer } from "./dashboardReducer/reducer";
import { reducer as eventReducer } from "./eventReducer/reducer";
import { reducer as userReducer } from "./userReducer/reducer";
import { reducer as faqReducer } from "./faqReducer/reducer";
import { reducer as transactionReducer } from "./transactionReducer/reducer";
// Correct the typo in Redux DevTools extension compose function
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  dashboards: dashboardReducer,
  events: eventReducer,
  users: userReducer,
  faqs:faqReducer,
  transactions:transactionReducer
});

export const store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
