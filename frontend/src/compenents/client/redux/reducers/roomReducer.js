import {
  FETCH_DATE_ROOM_REQUEST,
  FETCH_DATE_ROOM_FAILURE,
} from "../actions/roomActions";

const initialState = {
  rooms: [],
  loading: false,
  error: null,
  successMessage: null,
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATE_ROOM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_DATE_ROOM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default roomReducer;
