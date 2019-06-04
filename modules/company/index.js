import {
  COMPANY_ERROR,
  COMPANY_LOADING,
  GET_COMPANY,
  GET_COMPANY_BY_CODE,
  COMPANY_SUCCESS,
  COMPANY_UPDATED_SUCCESSFULLY
} from "../types";
import {
  createCompany,
  getAllCompany,
  getCompanyByCode,
  update,
  getCompanyById,
  addCloseDateToCompany,
  removeCloseDateFromCompany
} from "../../services/userService";
import Cookies from "js-cookie";
import Router from "next/router";
import { message } from "antd";

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
        company: action.payload
      };
    case GET_COMPANY:
      return {
        ...state,
        companies: action.payload
      };
    case GET_COMPANY_BY_CODE:
      return {
        ...state,
        selectedCompany: action.payload
      };
    case COMPANY_UPDATED_SUCCESSFULLY:
      return {
        ...state,
        update: action.payload
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

export function createCompanyRequest(postData) {
  return dispatch => {
    dispatch({ type: COMPANY_LOADING, payload: true });
    createCompany(postData)
      .then(company => {
        dispatch({
          type: COMPANY_SUCCESS,
          payload: company
        });
        Cookies.set("companyID", JSON.stringify(company.id), {
          expires: 1
        });
        dispatch(message.success("Company created successfully"));
        dispatch({ type: COMPANY_LOADING, payload: false });
        Router.push("/dashboard");
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: COMPANY_LOADING, payload: false });
        dispatch({ type: COMPANY_ERROR, payload: err });
      });
  };
}

export function getCompanyByCodeRequest(data) {
  return dispatch => {
    dispatch({ type: COMPANY_LOADING, payload: true });
    getCompanyByCode(data)
      .then(company => {
        dispatch({
          type: GET_COMPANY_BY_CODE,
          payload: company
        });
        dispatch({ type: COMPANY_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: COMPANY_LOADING, payload: false });
        dispatch({ type: COMPANY_ERROR, payload: err });
      });
  };
}

export function updateCompanyModule(data, id) {
  return dispatch => {
    dispatch({ type: COMPANY_LOADING, payload: true });
    update(data, id)
      .then(company => {
        dispatch({
          type: COMPANY_UPDATED_SUCCESSFULLY,
          payload: true
        });
        dispatch(message.success("Updated Successfully"));
        dispatch({ type: COMPANY_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: COMPANY_LOADING, payload: false });
        dispatch({ type: COMPANY_ERROR, payload: err });
      });
  };
}

export function getAllCompanyModule() {
  return dispatch => {
    dispatch({ type: COMPANY_LOADING, payload: true });
    getAllCompany()
      .then(companies => {
        dispatch({
          type: GET_COMPANY,
          payload: companies
        });
        dispatch({
          type: COMPANY_UPDATED_SUCCESSFULLY,
          payload: false
        });
        dispatch({ type: COMPANY_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: COMPANY_LOADING, payload: false });
        dispatch({ type: COMPANY_ERROR, payload: err });
      });
  };
}
