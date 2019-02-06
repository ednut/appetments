import { LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_LOADING } from "./types";
import { Login } from "../services/userService";
import Cookies from "js-cookie";
import Router from "next/router";
import { success, error } from "./alert";

const initialState = {
  user: {},
  error: ""
};

// Reducer

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case LOGIN_SUCCESS:
      console.log("called login reducer");
      return {
        ...state,
        user: action.payload
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

// Action

export function loginRequest(postData) {
  return dispatch => {
    dispatch({ type: LOGIN_LOADING, payload: true });
    Login(postData).then(
      user => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: user
        });
        console.log(user);
        dispatch({ type: LOGIN_LOADING, payload: false });
        Router.push("/dashboard");
        Cookies.set("token", JSON.stringify(user.auth_token));
        dispatch(success("Login Was Successful"));
      },
      err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
        dispatch({ type: LOGIN_LOADING, payload: false });
        dispatch({ type: LOGIN_ERROR, payload: err });
        if (err.message) {
          dispatch(error(err.message));
        }
      }
    );
  };
}
