import {
  UPDATE_RESERVATION_REQUEST,
  UPDATE_RESERVATION_SUCCESS,
  UPDATE_RESERVATION_FAILURE,
  SET_ROOMS,
  SET_TYPE,
  SET_QUERY,
} from "../actions/ReservationAction";

const initialState = {
  loading: false,
  error: null,
  successMessage: null,

  rooms: [],
  duplicateRooms: [],
  selectedRoom: null,
  query: "",
  type: "",
  show: false,
  fromdate: null,
  todate: null,
  datesSelected: false,
};

const reservationReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_RESERVATION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      };
    case UPDATE_RESERVATION_SUCCESS:
      return {
        ...state,
        loading: false,
        successMessage: action.payload,
      };
    case UPDATE_RESERVATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SET_ROOMS:
      return { ...state, rooms: action.payload };

    case SET_TYPE:
      return { ...state, type: action.payload };

    case SET_QUERY:
      return { ...state, query: action.payload };

    default:
      return state;
  }
};

export default reservationReducer;
