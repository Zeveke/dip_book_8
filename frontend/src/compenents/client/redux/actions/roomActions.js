export const FETCH_DATE_ROOM_REQUEST = "FETCH_DATE_ROOM_REQUEST";
export const FETCH_DATE_ROOM_FAILURE = "FETCH_DATE_ROOM_FAILURE";

export const fetchDateRoomRequest = () => ({
  type: FETCH_DATE_ROOM_REQUEST,
});

export const fetchDateRoomFailure = (error) => ({
  type: FETCH_DATE_ROOM_FAILURE,
  payload: error,
});
