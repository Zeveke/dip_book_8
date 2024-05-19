const initialState = {
  userData: {},
  error: null,
};

const profileAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_ADMIN_PROFILE_SUCCESS":
      return {
        ...state,
        userData: action.payload,
        error: null,
      };
    case "UPDATE_ADMIN_PROFILE_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default profileAdminReducer;
