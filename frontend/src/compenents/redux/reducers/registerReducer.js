const initialState = {
  userData: {},
  error: null,
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_SUCCESS":
      return {
        ...state,
        userData: action.payload,
        error: null,
      };
    case "REGISTER_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default registerReducer;
