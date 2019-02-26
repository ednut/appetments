import { createStaff, getAllStaffs, update, _delete } from "./staffServices";

import { success, error } from "../alert";
import {
  CREATE_STAFF,
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
    case CREATE_STAFF:
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
        dispatch({
          type: CREATE_STAFF,
          payload: true
        });
        console.log(staff);
        dispatch(success("Staff created successfully"));
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

export function getAllStaffsRequest() {
  return dispatch => {
    dispatch({ type: STAFF_LOADING, payload: true });
    getAllStaffs()
      .then(staffs => {
        dispatch({
          type: GET_ALL_STAFFS,
          payload: staffs
        });
        dispatch({ type: CREATE_STAFF, payload: false });
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

export function updateStaffRequest(data, staffID) {
  return dispatch => {
    dispatch({ type: STAFF_LOADING, payload: true });
    update(data, staffID)
      .then(staff => {
        dispatch({
          type: CREATE_STAFF,
          payload: true
        });
        dispatch(success("Staff updated successfully"));
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

export function deleteStaffRequest(id) {
  return dispatch => {
    dispatch({ type: STAFF_LOADING, payload: true });
    _delete(id)
      .then(staff => {
        dispatch({
          type: CREATE_STAFF,
          payload: true
        });
        dispatch(success("Staff deleted successfully"));
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
