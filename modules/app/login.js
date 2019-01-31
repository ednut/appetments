import { LOGIN_SUCCESS, LOGIN_ERROR } from "../types";
import { Login } from "../../services/userService";
import Router from "next/router";
import { success, error } from "./alert";

const initialState = {
  user: {},
  error: ""
};

// Reducer

export default function(state = initialState, action) {
  switch (action.type) {
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
    Login(postData).then(
      user => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: user
        });
        console.log(user);
        Router.push("/dashboard");
        localStorage.setItem("user", JSON.stringify(postData));
        dispatch(success("Login Was Successful"));
      },
      err => {
        console.log(err);
        dispatch({ type: LOGIN_ERROR, payload: err });
        if (err.message) {
          dispatch(error(err.message));
        }
        dispatch(error("Your login wasn't successful"));
      }
    );
  };
}

// async function Login(postData) {
//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(postData)
//   };
//   const res = await fetch(LoginAPI, requestOptions);
//   const user = await res.json();

//   return user;
// }
