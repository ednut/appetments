import { createStaff, getAllStaffs } from "./staffServices";

import { success, error } from "../alert";
import {
  GET_STAFF,
  GET_ALL_STAFFS,
  DELETE_STAFF,
  STAFF_ERROR,
  STAFF_LOADING
} from "../types";

// Reducer

const initialState = {};
export default function(state = initialState, action) {
  switch (action.type) {
    case STAFF_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case GET_STAFF:
      return {
        ...state,
        staff: action.payload
      };
    case GET_ALL_STAFFS:
      return {
        ...state,
        staffs: action.payload
      };
    case STAFF_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

// Action
export function createStaffRequest(data) {
  return dispatch => {
    dispatch({ type: STAFF_LOADING, payload: true });
    createStaff(data)
      .then(staff => {
        dispatch(success("Staff created successfully"));
        dispatch({ type: STAFF_LOADING, payload: false });
        dispatch({
          type: GET_STAFF,
          payload: staff
        });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
        dispatch({ type: STAFF_LOADING, payload: false });
        dispatch({ type: STAFF_ERROR, payload: err });
      });
  };
}

export function getAllStaffsRequest() {
  return dispatch => {
    dispatch({ type: STAFF_LOADING, payload: true });
    getAllStaffs()
      .then(staffs => {
        dispatch({
          type: GET_ALL_STAFFS,
          payload: staffs
        });
        dispatch({ type: STAFF_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
        dispatch({ type: STAFF_LOADING, payload: false });
        dispatch({ type: STAFF_ERROR, payload: err });
      });
  };
}
