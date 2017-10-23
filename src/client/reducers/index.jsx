import { combineReducers } from "redux";

const visibilityFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
};

const cars = (store = {}) => {
  return store;
};

const transactions = (store = {}) => {
  return store;
};

export default combineReducers({
  cars,
  transactions,
  visibilityFilter
});
