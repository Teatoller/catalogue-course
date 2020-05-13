import { combineReducers } from "redux";
import courseReducer from "./courseReducer";
import authorReducer from "./authorReducer";

const rootReducers = combineReducers({
  courseReducer: courseReducer,
  authorReducer: authorReducer,
});
export default rootReducers;
