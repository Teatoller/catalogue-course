import * as types from "../constants/courseActionTypes";

export default function authorReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;

    default:
      return state;
  }
}
