import { createLocation, getAllLocations, update } from "./locationServices";

import { success, error } from "../alert";
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
        dispatch(success("Location created successfully"));
        dispatch({ type: LOCATION_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
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
        dispatch(error(e));
        dispatch({ type: LOCATION_LOADING, payload: false });
        dispatch({ type: LOCATION_ERROR, payload: err });
      });
  };
}

export function updateLocationRequest(data) {
  return dispatch => {
    dispatch({ type: LOCATION_LOADING, payload: true });
    update(data)
      .then(location => {
        console.log(location);
        dispatch(success("Location updated successfully"));
        dispatch({ type: LOCATION_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
        dispatch({ type: LOCATION_LOADING, payload: false });
        dispatch({ type: LOCATION_ERROR, payload: err });
      });
  };
}
