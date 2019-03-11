import { LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_LOADING } from "../types";
import { Login } from "../../services/userService";
import Cookies from "js-cookie";
import Router from "next/router";
import moment from "moment";

import { success, error } from "../alert";

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
        let ed = moment(user.expiry_date).format("h:mm:ss");
        // console.log(ed);
        let convertHourstoDays = x => {
          let timeArray = x.split(":");
          let hr = timeArray[0];
          let min = timeArray[1] / 60;
          let sec = timeArray[2] / 3600;
          let totalHr = parseFloat(hr) + (parseFloat(min) + parseFloat(sec));
          let HrToDay = totalHr / 24;
          return HrToDay;
        };
        // console.log(moment(convertHourstoDays(ed)).format("h:mm:ss"));
        localStorage.setItem("userId", JSON.stringify(user.id));
        dispatch({ type: LOGIN_LOADING, payload: false });
        Router.push("/dashboard");
        Cookies.set("token", user.auth_token, {
          expires: convertHourstoDays(ed)
        });
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
