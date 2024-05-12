import {
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
} from "../actions/profileActions";

const initialState = {
  loading: false,
  error: null,
  successMessage: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        successMessage: action.payload,
      };
    case UPDATE_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
