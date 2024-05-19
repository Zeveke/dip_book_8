export const registerSuccess = (userData) => {
  return {
    type: "REGISTER_SUCCESS",
    payload: userData,
  };
};

export const registerFailure = (error) => {
  return {
    type: "REGISTER_FAILURE",
    payload: error,
  };
};
