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
        let ed = moment(user.expiry_date).format("h:mm:ss");
        let convertHourstoDays = x => {
          let timeArray = x.split(":");
          let hr = timeArray[0];
          let min = timeArray[1] / 60;
          let sec = timeArray[2] / 3600;
          let totalHr = parseFloat(hr) + (parseFloat(min) + parseFloat(sec));
          let HrToDay = totalHr / 24;
          return HrToDay;
        };
        dispatch({ type: LOGIN_LOADING, payload: false });
        if (user.company === null) {
          Router.push("/register-company");
        } else {
          dispatch(success("Login Was Successful"));
          Router.push("/dashboard");
        }
        Cookies.set("token", user.auth_token, {
          expires: convertHourstoDays(ed)
        });
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
