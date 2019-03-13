import { SIGNUP_SUCCESS, SIGNUP_ERROR, SIGNUP_LOADING } from "../types";
import { Signup } from "../../services/userService";
import Router from "next/router";
import Cookies from "js-cookie";
import { success, error } from "../alert";
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
        console.log(user);
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
        dispatch(success("Signup Was Successful, input company"));
        dispatch({ type: SIGNUP_LOADING, payload: false });
        Cookies.set("token", user.auth_token, {
          expires: convertHourstoDays(ed)
        });
        Router.push("/register-company");
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]][0];
        dispatch(error(e));
        dispatch({ type: SIGNUP_LOADING, payload: false });
        dispatch({ type: SIGNUP_ERROR, payload: err });
      });
  };
}
