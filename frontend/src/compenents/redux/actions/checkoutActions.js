import { getRoomByID, updateRoom2 } from "../../../sevices/room.services";
import { addBooking } from "../../../sevices/booking.services";
import Swal from "sweetalert2";

export const FETCH_ROOM_DETAILS_REQUEST = "FETCH_ROOM_DETAILS_REQUEST";
export const FETCH_ROOM_DETAILS_SUCCESS = "FETCH_ROOM_DETAILS_SUCCESS";
export const FETCH_ROOM_DETAILS_FAILURE = "FETCH_ROOM_DETAILS_FAILURE";

export const BOOKING_REQUEST = "BOOKING_REQUEST";
export const BOOKING_SUCCESS = "BOOKING_SUCCESS";
export const BOOKING_FAILURE = "BOOKING_FAILURE";

export const fetchRoomDetails = (id) => async (dispatch) => {
  dispatch({ type: FETCH_ROOM_DETAILS_REQUEST });
  try {
    const response = await getRoomByID(id);
    dispatch({ type: FETCH_ROOM_DETAILS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_ROOM_DETAILS_FAILURE, error: error.message });
  }
};

export const onToken =
  (token, room, fromdate, todate, totaldays, navigate) => async (dispatch) => {
    dispatch({ type: BOOKING_REQUEST });
    try {
      const userId = localStorage.getItem("userId");
      if (!room) throw new Error("Room information is unavailable");

      const bookingDetails = {
        room: room._id,
        user: userId,
        fromdate,
        todate,
        totalamount: totaldays * room.rentperday,
        totaldays,
        transactionId: token.id,
        token,
      };

      const response = await addBooking(bookingDetails);
      const bookingId = response.data._id;
      const status = response.data.status;

      const roomResponse = await getRoomByID(room._id);
      const roomData = roomResponse.data;
      roomData.currentbookings.push({
        bookingId,
        fromdate,
        todate,
        userId,
        status,
      });

      await updateRoom2(room._id, roomData);

      dispatch({ type: BOOKING_SUCCESS, payload: response.data });

      Swal.fire(
        "Поздравляем!",
        "Ваш номер успешно забронирован!",
        "success"
      ).then(() => navigate("/contact"));
    } catch (error) {
      dispatch({ type: BOOKING_FAILURE, error: error.message });
      Swal.fire("Sorry", "Что-то пошло не так", "error");
    }
  };
