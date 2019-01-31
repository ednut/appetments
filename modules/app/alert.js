import { ALERT_SUCCESS, ALERT_ERROR } from "../types";

// Reducer

export default function(state = "", action) {
  switch (action.type) {
    case ALERT_SUCCESS:
      return {
        type: "ALERT_SUCCESS",
        message: action.payload
      };
    case ALERT_ERROR:
      return {
        type: "ALERT_ERROR",
        message: action.payload
      };
    default:
      return state;
  }
}

// Actions

export function success(message) {
  return dispatch => dispatch({ type: ALERT_SUCCESS, payload: message });
}

export function error(message) {
  return dispatch => dispatch({ type: ALERT_ERROR, payload: message });
}
