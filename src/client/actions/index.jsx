export const visibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_NEGOTIATIONS: "NEGOTIATIONS",
  SHOW_ACCEPTED: "ACCEPTED"
};

export const setVisibilityFilter = filter => {
  return { type: "SET_VISIBILITY_FILTER", filter };
};
