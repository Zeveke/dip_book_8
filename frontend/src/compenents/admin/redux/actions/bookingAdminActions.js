import {
  getBooking,
  cancelBooking,
  deleteBookingByID,
} from "../../../../sevices/booking.services";

export const fetchBookingsRequest = (query) => async (dispatch) => {
  dispatch({ type: "FETCH_BOOKINGS_REQUEST" });
  try {
    const response = await getBooking(query);
    dispatch({ type: "FETCH_BOOKINGS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_BOOKINGS_FAILURE", error: error.message });
  }
};

export const cancelBookingRequest = (bookingId) => async (dispatch) => {
  try {
    await cancelBooking(bookingId);
    dispatch({ type: "CANCEL_BOOKING_SUCCESS", payload: bookingId });
  } catch (error) {
    dispatch({ type: "CANCEL_BOOKING_FAILURE", error: error.message });
  }
};

export const deleteBookingRequest = (id) => async (dispatch) => {
  try {
    await deleteBookingByID(id);
    dispatch({ type: "DELETE_BOOKING_SUCCESS", payload: id });
  } catch (error) {
    dispatch({ type: "DELETE_BOOKING_FAILURE", error: error.message });
  }
};
