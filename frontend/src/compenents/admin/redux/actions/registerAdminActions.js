export const registerAdminSuccess = (userData) => {
  return {
    type: "REGISTER_ADMIN_SUCCESS",
    payload: userData,
  };
};

export const registerAdminFailure = (error) => {
  return {
    type: "REGISTER_ADMIN_FAILURE",
    payload: error,
  };
};
