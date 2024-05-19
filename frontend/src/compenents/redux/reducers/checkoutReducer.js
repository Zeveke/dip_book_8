import {
  FETCH_ROOM_DETAILS_REQUEST,
  FETCH_ROOM_DETAILS_SUCCESS,
  FETCH_ROOM_DETAILS_FAILURE,
  BOOKING_REQUEST,
  BOOKING_SUCCESS,
  BOOKING_FAILURE,
} from "../actions/checkoutActions";

const initialState = {
  room: null,
  loading: false,
  error: null,
  bookingLoading: false,
  bookingError: null,
};

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ROOM_DETAILS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ROOM_DETAILS_SUCCESS:
      return { ...state, loading: false, room: action.payload };
    case FETCH_ROOM_DETAILS_FAILURE:
      return { ...state, loading: false, error: action.error };
    case BOOKING_REQUEST:
      return { ...state, bookingLoading: true, bookingError: null };
    case BOOKING_SUCCESS:
      return { ...state, bookingLoading: false };
    case BOOKING_FAILURE:
      return { ...state, bookingLoading: false, bookingError: action.error };
    default:
      return state;
  }
};

export default checkoutReducer;
