import { combineReducers } from "redux";
import courseReducer from "./courseReducer";

const rootReducers = combineReducers({
  courseReducer: courseReducer,
});
export default rootReducers;
