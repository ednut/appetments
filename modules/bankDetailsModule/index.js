import {
  createBankDetails,
  getAllBankDetails,
  getBankDetailsById,
  activateBankDetails,
  deactivateBankDetails,
  _deleteBankDetails
} from "./bankDetailsServices";

import { message } from "antd";
import {
  CREATE_BANK_DETAILS,
  GET_ALL_BANK_DETAILS,
  DELETE_BANK_DETAILS,
  BANK_DETAILS_ERROR,
  BANK_DETAILS_LOADING
} from "../types";

// Reducer

const initialState = {};
export default function(state = initialState, action) {
  switch (action.type) {
    case BANK_DETAILS_LOADING:
      return {
        ...state,
        loadingBankDetails: action.payload
      };
    case CREATE_BANK_DETAILS:
      return {
        ...state,
        bankDetailsCreated: action.payload
      };
    case GET_ALL_BANK_DETAILS:
      return {
        ...state,
        bankDetails: action.payload
      };
    case BANK_DETAILS_ERROR:
      return {
        ...state,
        bankDetailsError: action.payload
      };
    default:
      return state;
  }
}

// Action
export function createBankDetailsRequest(data) {
  return dispatch => {
    dispatch({ type: BANK_DETAILS_LOADING, payload: true });
    createBankDetails(data)
      .then(bankDetails => {
        dispatch({
          type: CREATE_BANK_DETAILS,
          payload: true
        });
        dispatch(message.success("Bank details created successfully"));
        dispatch({ type: BANK_DETAILS_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: BANK_DETAILS_LOADING, payload: false });
        dispatch({ type: BANK_DETAILS_ERROR, payload: err });
      });
  };
}

export function getAllBankDetailsRequest() {
  return dispatch => {
    dispatch({ type: BANK_DETAILS_LOADING, payload: true });
    getAllBankDetails()
      .then(bankDetails => {
        dispatch({
          type: GET_ALL_BANK_DETAILS,
          payload: bankDetails
        });
        dispatch({ type: CREATE_BANK_DETAILS, payload: false });
        dispatch({ type: BANK_DETAILS_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: BANK_DETAILS_LOADING, payload: false });
        dispatch({ type: BANK_DETAILS_ERROR, payload: err });
      });
  };
}

export function getBankDetailsByIdRequest(id) {
  return dispatch => {
    dispatch({ type: BANK_DETAILS_LOADING, payload: true });
    getBankDetailsById(id)
      .then(bankDetails => {
        dispatch({
          type: GET_BANK_DETAILS,
          payload: bankDetails
        });
        dispatch({ type: CREATE_BANK_DETAILS, payload: false });
        dispatch({ type: BANK_DETAILS_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: BANK_DETAILS_LOADING, payload: false });
        dispatch({ type: BANK_DETAILS_ERROR, payload: err });
      });
  };
}

export function updateBankDetailsRequest(data, id) {
  return dispatch => {
    dispatch({ type: BANK_DETAILS_LOADING, payload: true });
    updateBankDetails(data, id)
      .then(bankDetails => {
        dispatch({
          type: CREATE_BANK_DETAILS,
          payload: true
        });
        dispatch(message.success("Bank details updated successfully"));
        dispatch({ type: BANK_DETAILS_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: BANK_DETAILS_LOADING, payload: false });
        dispatch({ type: BANK_DETAILS_ERROR, payload: err });
      });
  };
}

export function deleteBankDetailsRequest(id) {
  return dispatch => {
    dispatch({ type: BANK_DETAILS_LOADING, payload: true });
    _deleteBankDetails(id)
      .then(bankDetails => {
        dispatch({
          type: CREATE_BANK_DETAILS,
          payload: true
        });
        dispatch(message.success("Bank details deleted successfully"));
        dispatch({ type: BANK_DETAILS_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: BANK_DETAILS_LOADING, payload: false });
        dispatch({ type: BANK_DETAILS_ERROR, payload: err });
      });
  };
}

export function activateBankDetailsRequest(id) {
  return dispatch => {
    dispatch({ type: BANK_DETAILS_LOADING, payload: true });
    activateBankDetails(id)
      .then(bankDetails => {
        dispatch({
          type: CREATE_BANK_DETAILS,
          payload: true
        });
        dispatch(message.success("Bank details activated successfully"));
        dispatch({ type: BANK_DETAILS_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: BANK_DETAILS_LOADING, payload: false });
        dispatch({ type: BANK_DETAILS_ERROR, payload: err });
      });
  };
}

export function deactivateBankDetailsRequest(id) {
  return dispatch => {
    dispatch({ type: BANK_DETAILS_LOADING, payload: true });
    deactivateBankDetails(id)
      .then(bankDetails => {
        dispatch({
          type: CREATE_BANK_DETAILS,
          payload: true
        });
        dispatch(message.success("Bank details deactivated successfully"));
        dispatch({ type: BANK_DETAILS_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: BANK_DETAILS_LOADING, payload: false });
        dispatch({ type: BANK_DETAILS_ERROR, payload: err });
      });
  };
}
