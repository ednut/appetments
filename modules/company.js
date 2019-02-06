import { COMPANY_SUCCESS, COMPANY_ERROR, COMPANY_LOADING } from "./types";
import { Company } from "../services/userService";
import Router from "next/router";
import { success, error } from "./alert";

const initialState = {};

// Reducer

export default function(state = initialState, action) {
  switch (action.type) {
    case COMPANY_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case COMPANY_SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    case COMPANY_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

// Action

export function createCompany(postData) {
  return dispatch => {
    dispatch({ type: COMPANY_LOADING, payload: true });
    Company(postData)
      .then(user => {
        dispatch({
          type: COMPANY_SUCCESS,
          payload: user
        });
        console.log(user);
        dispatch(success("Company created successfully"));
        dispatch({ type: COMPANY_LOADING, payload: false });
        Router.push("/dashboard");
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
        dispatch({ type: COMPANY_LOADING, payload: false });
        dispatch({ type: COMPANY_ERROR, payload: err });
      });
  };
}
