const initialState = {
  userData: {},
  error: null,
};

const registerAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_ADMIN_SUCCESS":
      return {
        ...state,
        userData: action.payload,
        error: null,
      };
    case "REGISTER_ADMIN_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default registerAdminReducer;
