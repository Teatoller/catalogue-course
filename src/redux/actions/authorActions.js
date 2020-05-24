import * as types from "../constants/courseActionTypes";
import * as authorApi from "../../api/authorApi";
import { beginApiCall } from "./apiStatusActions";

// thunk
export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors: authors };
}

export function loadAuthors() {
  return (dispatch) => {
    dispatch(beginApiCall());
    return authorApi
      .getAuthors()
      .then((authors) => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch((error) => {
        throw error;
      });
  };
}
