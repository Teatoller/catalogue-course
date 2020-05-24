import * as types from "../constants/courseActionTypes";

export function beginApiCall() {
  return { type: types.BEGIN_API_CALL };
}
