import { getUser } from "./userServices";

import { message } from "antd";
import { GET_USER, USER_ERROR } from "../types";

// Reducer

const initialState = {};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload
      };
    case USER_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

// Action
export function getUserRequest() {
  return dispatch => {
    getUser()
      .then(user => {
        dispatch({
          type: GET_USER,
          payload: user
        });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: USER_ERROR, payload: err });
      });
  };
}
