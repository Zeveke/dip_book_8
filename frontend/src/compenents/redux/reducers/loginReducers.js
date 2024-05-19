import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
} from "../actions/loginActions";

const initialState = {
  userData: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        error: null,
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
