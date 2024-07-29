import { combineReducers } from "redux";
import { managePopup } from "./managePopup";
import { manageIsLoggedIn } from "./manageIsLoggedIn";
import { manageSessions } from "./manageSessions";

const rootreducer= combineReducers({managePopup, manageIsLoggedIn, manageSessions});

export default rootreducer;