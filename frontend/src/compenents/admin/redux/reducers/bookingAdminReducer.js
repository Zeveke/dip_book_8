const initialState = {
  bookings: [],
  loading: false,
  error: null,
};

const bookingAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_BOOKINGS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_BOOKINGS_SUCCESS":
      return { ...state, loading: false, bookings: action.payload };
    case "FETCH_BOOKINGS_FAILURE":
      return { ...state, loading: false, error: action.error };
    case "CANCEL_BOOKING_SUCCESS":
      return {
        ...state,
        bookings: state.bookings.map((booking) =>
          booking._id === action.payload
            ? { ...booking, status: "canceled" }
            : booking
        ),
      };
    case "DELETE_BOOKING_SUCCESS":
      return {
        ...state,
        bookings: state.bookings.filter(
          (booking) => booking._id !== action.payload
        ),
      };
    case "CANCEL_BOOKING_FAILURE":
    case "DELETE_BOOKING_FAILURE":
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default bookingAdminReducer;
