import {
  createLocation,
  getAllLocations,
  update,
  _delete,
  addStaff,
  removeStaff,
  activateLocation,
  deactivateLocation
} from "./locationServices";

import { message } from "antd";
import {
  GET_LOCATION,
  GET_ALL_LOCATIONS,
  DELETE_LOCATION,
  LOCATION_ERROR,
  LOCATION_LOADING
} from "../types";

// Reducer

const initialState = {};
export default function(state = initialState, action) {
  switch (action.type) {
    case LOCATION_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case GET_LOCATION:
      return {
        ...state,
        location: action.payload
      };
    case GET_ALL_LOCATIONS:
      return {
        ...state,
        locations: action.payload
      };
    case LOCATION_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

// Action
export function createLocationRequest(data) {
  return dispatch => {
    dispatch({ type: LOCATION_LOADING, payload: true });
    createLocation(data)
      .then(location => {
        dispatch({
          type: GET_LOCATION,
          payload: true
        });
        console.log(location);
        dispatch(message.success("Location created successfully"));
        dispatch({ type: LOCATION_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: LOCATION_LOADING, payload: false });
        dispatch({ type: LOCATION_ERROR, payload: err });
      });
  };
}

export function getAllLocationsRequest() {
  return dispatch => {
    dispatch({ type: LOCATION_LOADING, payload: true });
    getAllLocations()
      .then(locations => {
        dispatch({
          type: GET_ALL_LOCATIONS,
          payload: locations
        });
        dispatch({
          type: GET_LOCATION,
          payload: false
        });
        dispatch({ type: LOCATION_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: LOCATION_LOADING, payload: false });
        dispatch({ type: LOCATION_ERROR, payload: err });
      });
  };
}

export function updateLocationRequest(data, id) {
  return dispatch => {
    dispatch({ type: LOCATION_LOADING, payload: true });
    update(data, id)
      .then(location => {
        dispatch({
          type: GET_LOCATION,
          payload: true
        });
        dispatch(message.success("Location updated successfully"));
        dispatch({ type: LOCATION_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: LOCATION_LOADING, payload: false });
        dispatch({ type: LOCATION_ERROR, payload: err });
      });
  };
}

export function deleteLocationRequest(id) {
  return dispatch => {
    dispatch({ type: LOCATION_LOADING, payload: true });
    _delete(id)
      .then(location => {
        dispatch({
          type: GET_LOCATION,
          payload: true
        });
        dispatch(message.success("Location deleted successfully"));
        dispatch({ type: LOCATION_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: LOCATION_LOADING, payload: false });
        dispatch({ type: LOCATION_ERROR, payload: err });
      });
  };
}

export function addStaffToLocationRequest(data, id) {
  return dispatch => {
    dispatch({ type: LOCATION_LOADING, payload: true });
    addStaff(data, id)
      .then(location => {
        dispatch({
          type: GET_LOCATION,
          payload: true
        });
        dispatch(message.success("Staff added to Location successfully"));
        dispatch({ type: LOCATION_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: LOCATION_LOADING, payload: false });
        dispatch({ type: LOCATION_ERROR, payload: err });
      });
  };
}

export function removeStaffFromLocationRequest(data, id) {
  return dispatch => {
    dispatch({ type: LOCATION_LOADING, payload: true });
    removeStaff(data, id)
      .then(location => {
        dispatch({
          type: GET_LOCATION,
          payload: true
        });
        dispatch(message.success("Staff removed from Location successfully"));
        dispatch({ type: LOCATION_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: LOCATION_LOADING, payload: false });
        dispatch({ type: LOCATION_ERROR, payload: err });
      });
  };
}

export function activateLocationRequest(data, id) {
  return dispatch => {
    dispatch({ type: LOCATION_LOADING, payload: true });
    activateLocation(data, id)
      .then(location => {
        dispatch({
          type: GET_LOCATION,
          payload: true
        });
        dispatch(message.success("Location activated successfully"));
        dispatch({ type: LOCATION_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: LOCATION_LOADING, payload: false });
        dispatch({ type: LOCATION_ERROR, payload: err });
      });
  };
}

export function deactivateLocationRequest(data, id) {
  return dispatch => {
    dispatch({ type: LOCATION_LOADING, payload: true });
    activateLocation(data, id)
      .then(location => {
        dispatch({
          type: GET_LOCATION,
          payload: true
        });
        dispatch(message.success("Location deactivated successfully"));
        dispatch({ type: LOCATION_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: LOCATION_LOADING, payload: false });
        dispatch({ type: LOCATION_ERROR, payload: err });
      });
  };
}
