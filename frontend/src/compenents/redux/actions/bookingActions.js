import { getBookings, cancelBooking } from "../../../sevices/booking.services";
import Swal from "sweetalert2";

export const fetchUserBookingsRequest = (userId) => (dispatch) => {
  dispatch({ type: "FETCH_USER_BOOKINGS_REQUEST" });

  getBookings(userId)
    .then((response) => {
      dispatch({ type: "FETCH_USER_BOOKINGS_SUCCESS", payload: response.data });
    })
    .catch((error) => {
      console.error("Ошибка при выборке пользовательских бронирований:", error);
      dispatch({ type: "FETCH_USER_BOOKINGS_FAILURE", payload: error.message });
    });
};

export const cancelBookingRequest = (bookingId, userId) => (dispatch) => {
  cancelBooking(bookingId)
    .then(() => {
      dispatch(fetchUserBookingsRequest(userId));
      return Swal.fire(
        "Congrats",
        "Ваше бронирование было успешно отменено",
        "success"
      );
    })
    .then(() => {
      window.location.href = "/contact";
    })
    .catch((error) => {
      console.error("Ошибка при отмене бронирования:", error);
      Swal.fire("Oops", "Что-то пошло не так", "error");
    });
};
