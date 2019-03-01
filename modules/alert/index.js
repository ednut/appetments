import { ALERT_SUCCESS, ALERT_ERROR, ALERT_CLEAR } from "../types";

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
    case ALERT_CLEAR:
      return {};
    default:
      return state;
  }
}

// Actions

export function success(message) {
  return dispatch => {
    dispatch({
      type: ALERT_SUCCESS,
      payload: { errType: "success", message: message }
    });
    setTimeout(() => {
      dispatch({ type: ALERT_CLEAR });
    }, 3000);
  };
}

export function clear() {
  return dispatch => dispatch({ type: ALERT_CLEAR });
}

export function error(message) {
  return dispatch => {
    dispatch({
      type: ALERT_ERROR,
      payload: { errType: "error", message: message }
    });
  };
}
