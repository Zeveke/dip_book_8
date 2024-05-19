export const updateProfileSuccess = (userData) => {
  return {
    type: "UPDATE_PROFILE_SUCCESS",
    payload: userData,
  };
};

export const updateProfileFailure = (error) => {
  return {
    type: "UPDATE_PROFILE_FAILURE",
    payload: error,
  };
};
