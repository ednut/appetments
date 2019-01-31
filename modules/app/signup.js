import { SIGNUP_SUCCESS, SIGNUP_ERROR } from "../types";
import { Signup } from "../../services/userService";
import Router from "next/router";

const initialState = {
  user: {},
  error: {}
};

// Reducer

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

// Action

export function signupRequest(postData) {
  return dispatch => {
    Signup(postData)
      .then(user => {
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: user
        });
        console.log(user);
        Router.push("/register-company");

        // const loginDetails = {
        //   "user-name": postData.email,
        //   "password": postData.password
        // }
        // const requestOptions = {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(loginDetails)
        // };
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: SIGNUP_ERROR, payload: err });
      });
  };
}
