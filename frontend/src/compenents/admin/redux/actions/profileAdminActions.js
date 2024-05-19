export const updateAdminProfileSuccess = (userData) => {
  return {
    type: "UPDATE_ADMIN_PROFILE_SUCCESS",
    payload: userData,
  };
};

export const updateAdminProfileFailure = (error) => {
  return {
    type: "UPDATE_ADMIN_PROFILE_FAILURE",
    payload: error,
  };
};
