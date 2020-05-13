import * as types from "../constants/courseActionTypes";
import initialState from "./initialState";

export default function authorReducer(
  state = initialState.authorReducer,
  action
) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;

    default:
      return state;
  }
}
