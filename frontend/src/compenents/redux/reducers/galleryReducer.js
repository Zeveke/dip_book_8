import {
  FETCH_ROOMS_REQUEST,
  FETCH_ROOMS_SUCCESS,
  FETCH_ROOMS_FAILURE,
} from "../actions/galleryActions";

const initialState = {
  rooms: [],
  loading: false,
  error: null,
};

const galleryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ROOMS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_ROOMS_SUCCESS:
      return { ...state, loading: false, rooms: action.payload };
    case FETCH_ROOMS_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default galleryReducer;
