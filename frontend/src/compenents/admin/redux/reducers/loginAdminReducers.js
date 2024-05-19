import {
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILURE,
} from "../actions/loginAdminActions";

const initialState = {
  userData: null,
  error: null,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        error: null,
      };
    case ADMIN_LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default adminReducer;
