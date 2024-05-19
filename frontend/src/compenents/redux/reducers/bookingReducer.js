const initialState = {
  bookings: [],
  loading: false,
  error: null,
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USER_BOOKINGS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_USER_BOOKINGS_SUCCESS":
      return { ...state, loading: false, bookings: action.payload };
    case "FETCH_USER_BOOKINGS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default bookingReducer;
