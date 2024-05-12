export const UPDATE_RESERVATION_REQUEST = "UPDATE_RESERVATION_REQUEST";
export const UPDATE_RESERVATION_SUCCESS = "UPDATE_RESERVATION_SUCCESS";
export const UPDATE_RESERVATION_FAILURE = "UPDATE_RESERVATION_FAILURE";

export const SET_ROOMS = "SET_ROOMS";
export const SET_TYPE = "SET_TYPE";
export const SET_QUERY = "SET_QUERY";

export const updateReservationRequest = () => ({
  type: UPDATE_RESERVATION_REQUEST,
});

export const updateReservationSuccess = (message) => ({
  type: UPDATE_RESERVATION_SUCCESS,
  payload: message,
});

export const updateReservationFailure = (error) => ({
  type: UPDATE_RESERVATION_FAILURE,
  payload: error,
});

export const setReservationRooms = (payload) => ({
  type: SET_ROOMS,
  payload,
});

export const setReservationType = (payload) => ({
  type: SET_TYPE,
  payload,
});

export const setReservationQuery = (payload) => ({
  type: SET_QUERY,
  payload,
});
