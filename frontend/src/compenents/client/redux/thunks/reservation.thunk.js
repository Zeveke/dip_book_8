import { getRoom } from "../../../../sevices/room.services";
import { setReservationRooms } from "../actions/ReservationAction";

export const fetchReservationThunk = (query, type) => {
  return async (dispatch) => {
    const res = await getRoom(query, type);

    console.log("resData", res.data);

    dispatch(setReservationRooms(res.data));
  };
};
