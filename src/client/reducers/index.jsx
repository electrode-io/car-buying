import { combineReducers } from "redux";
import { setVisibilityFilter, visibilityFilters } from "../actions";

const initialState = {
  visibilityFilter: visibilityFilters.SHOW_ALL,
  transactions: []
};

const visibilityFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
};

let cars = (store = {}, action) => {
  return store;
};

let transactions = (store = {}, action) => {
  return store;
};

export default combineReducers({
  cars,
  transactions,
  visibilityFilter
});
