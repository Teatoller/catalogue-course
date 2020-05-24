import * as types from "../constants/courseActionTypes";
import initialState from "./initialState";

// Helper function
function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

// export default function apiCallStatusReducer(
//   state = initialState.apiCallsInProgress,
//   action
// ) {
//   switch (action.type) {
//     case types.BEGIN_API_CALL:
//       return state + 1;
//       case actionTypeEndsInSuccess(action.type):
//         return state - 1;

//     default:
//       return state;
//   }
// }

export default function apiCallStatusReducer(
  state = initialState.apiCallsInProgress,
  action
) {
  if (action.type === types.BEGIN_API_CALL) {
    return state + 1;
  } else if (
    action.type === types.API_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)
  ) {
    return state - 1;
  }
  return state;
}
