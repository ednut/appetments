import { LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_LOADING } from "../types";
import { Login, googleLogin } from "../../services/userService";
import Cookies from "js-cookie";
import Router from "next/router";
import moment from "moment";

import { message } from "antd";

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
        localStorage.setItem("userID", JSON.stringify(user.id));
        localStorage.setItem("companyID", JSON.stringify(user.company));
        Router.push("/dashboard");
        Cookies.set("companyID", JSON.stringify(user.company), {
          expires: convertHourstoDays(ed)
        });
        Cookies.set("userID", JSON.stringify(user.id), {
          expires: convertHourstoDays(ed)
        });
        Cookies.set("token", user.auth_token, {
          expires: convertHourstoDays(ed)
        });
      },
      err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: LOGIN_LOADING, payload: false });
        dispatch({ type: LOGIN_ERROR, payload: err });
        if (err.message) {
          dispatch(error(err.message));
        }
      }
    );
  };
}

export function googleLoginRequest(postData) {
  return dispatch => {
    dispatch({ type: LOGIN_LOADING, payload: true });
    googleLogin(postData).then(
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
        localStorage.setItem("userID", JSON.stringify(user.id));
        localStorage.setItem("companyID", JSON.stringify(user.company));
        Router.push("/dashboard");
        Cookies.set("companyID", JSON.stringify(user.company), {
          expires: convertHourstoDays(ed)
        });
        Cookies.set("userID", JSON.stringify(user.id), {
          expires: convertHourstoDays(ed)
        });
        Cookies.set("token", user.auth_token, {
          expires: convertHourstoDays(ed)
        });
      },
      err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: LOGIN_LOADING, payload: false });
        dispatch({ type: LOGIN_ERROR, payload: err });
        if (err.message) {
          dispatch(error(err.message));
        }
      }
    );
  };
}
