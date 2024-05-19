import { getRooms } from "../../../sevices/room.services";

export const FETCH_ROOMS_REQUEST = "FETCH_ROOMS_REQUEST";
export const FETCH_ROOMS_SUCCESS = "FETCH_ROOMS_SUCCESS";
export const FETCH_ROOMS_FAILURE = "FETCH_ROOMS_FAILURE";

export const fetchRooms = (query) => async (dispatch) => {
  dispatch({ type: FETCH_ROOMS_REQUEST });
  try {
    const res = await getRooms(query);
    dispatch({ type: FETCH_ROOMS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: FETCH_ROOMS_FAILURE, error: error.message });
  }
};
