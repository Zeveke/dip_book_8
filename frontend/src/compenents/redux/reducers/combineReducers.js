import { combineReducers } from "redux";
import loginReducers from "./loginReducers";
import profileReducer from "./profileReducer";
import registerReducer from "./registerReducer";
import loginAdminReducer from "../../admin/redux/reducers/loginAdminReducers";
import profileAdminReducer from "../../admin/redux/reducers/profileAdminReducer";
import registerAdminReducer from "../../admin/redux/reducers/registerAdminReducer";
import bookingReducer from "./bookingReducer";
import bookingAdminReducer from "../../admin/redux/reducers/bookingAdminReducer";
import checkoutReducer from "./checkoutReducer";
import galleryReducer from "./galleryReducer";

const rootReducer = combineReducers({
  login: loginReducers,
  profile: profileReducer,
  register: registerReducer,
  loginAdmin: loginAdminReducer,
  profileAdmin: profileAdminReducer,
  registerAdmin: registerAdminReducer,
  booking: bookingReducer,
  bookingAdmin: bookingAdminReducer,
  checkout: checkoutReducer,
  gallery: galleryReducer,
});

export default rootReducer;
