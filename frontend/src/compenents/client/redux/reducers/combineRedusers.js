import { combineReducers } from "redux";
import roomReducer from "./roomReducer";
import profileReducer from "./profileReducer";
import reservationReducer from "./reservationReducer";

const rootReducer = combineReducers({
  room: roomReducer,
  profile: profileReducer,
  reservation: reservationReducer,
});

export default rootReducer;
