import { SIGNUP_SUCCESS, SIGNUP_ERROR, SIGNUP_LOADING } from "../types";
import { Signup, GoogleSignup } from "../../services/userService";
import Router from "next/router";
import Cookies from "js-cookie";
import { message, notification } from "antd";
import moment from "moment";

const initialState = {};

// Reducer

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_LOADING:
      return {
        ...state,
        loading: action.payload
      };
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
    dispatch({ type: SIGNUP_LOADING, payload: true });
    Signup(postData)
      .then(user => {
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: user
        });
        localStorage.clear();
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
        localStorage.setItem("companyID", JSON.stringify(user.company));
        localStorage.setItem("userID", JSON.stringify(user.id));
        dispatch(message.success("Signup Was Successful", 5));
        dispatch({ type: SIGNUP_LOADING, payload: false });
        Cookies.set("token", user.auth_token, {
          expires: convertHourstoDays(ed)
        });
        Cookies.set("companyID", JSON.stringify(user.company), {
          expires: convertHourstoDays(ed)
        });
        Cookies.set("userID", JSON.stringify(user.id), {
          expires: convertHourstoDays(ed)
        });
        Router.push("/dashboard");
      })
      .catch(err => {
        let e = Array.isArray(err)
          ? err[Object.keys(err)[0]][0]
          : "Somthing went wrong";
        dispatch(message.error(e, 5));
        dispatch({ type: SIGNUP_LOADING, payload: false });
        dispatch({ type: SIGNUP_ERROR, payload: err });
      });
  };
}

export function googleSignupRequest(postData) {
  return dispatch => {
    dispatch({ type: SIGNUP_LOADING, payload: true });
    GoogleSignup(postData)
      .then(user => {
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: user
        });
        localStorage.clear();
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
        dispatch(message.success("Signup Was Successful", 5));
        notification.open({
          message: "Change Password",
          description:
            "To change your password, go to settings and click on the change password link",
          duration: 0,
          onClick: () => {
            console.log("Notification Clicked!");
          }
        });
        dispatch({ type: SIGNUP_LOADING, payload: false });
        Cookies.set("token", user.auth_token, {
          expires: convertHourstoDays(ed)
        });
        Router.push("/register-company");
      })
      .catch(err => {
        let e = Array.isArray(err)
          ? err[Object.keys(err)[0]][0]
          : "Somthing went wrong";
        dispatch(message.error(e, 5));
        dispatch({ type: SIGNUP_LOADING, payload: false });
        dispatch({ type: SIGNUP_ERROR, payload: err });
      });
  };
}
