import {
  createServiceGroup,
  getAllServiceGroups,
  updateServiceGroup,
  _delete
} from "./serviceGroupServices";

import { success, error } from "../alert";
import {
  GET_SERVICE_GROUP,
  GET_ALL_SERVICE_GROUPS,
  DELETE_SERVICE_GROUP,
  SERVICE_GROUP_ERROR,
  SERVICE_GROUP_LOADING
} from "../types";

// Reducer

const initialState = {};
export default function(state = initialState, action) {
  switch (action.type) {
    case SERVICE_GROUP_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case GET_SERVICE_GROUP:
      return {
        ...state,
        serviceGroup: action.payload
      };
    case GET_ALL_SERVICE_GROUPS:
      return {
        ...state,
        serviceGroups: action.payload
      };
    case SERVICE_GROUP_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

// Action
export function createServiceGroupRequest(data) {
  return dispatch => {
    dispatch({ type: SERVICE_GROUP_LOADING, payload: true });
    createServiceGroup(data)
      .then(serviceGroup => {
        dispatch({
          type: GET_SERVICE_GROUP,
          payload: true
        });
        console.log(serviceGroup);
        dispatch(success("ServiceGroup created successfully"));
        dispatch({ type: SERVICE_GROUP_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
        dispatch({ type: SERVICE_GROUP_LOADING, payload: false });
        dispatch({ type: SERVICE_GROUP_ERROR, payload: err });
      });
  };
}

export function getAllServiceGroupsRequest() {
  return dispatch => {
    dispatch({ type: SERVICE_GROUP_LOADING, payload: true });
    getAllServiceGroups()
      .then(serviceGroups => {
        dispatch({
          type: GET_ALL_SERVICE_GROUPS,
          payload: serviceGroups
        });
        dispatch({
          type: GET_SERVICE_GROUP,
          payload: false
        });
        dispatch({ type: SERVICE_GROUP_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
        dispatch({ type: SERVICE_GROUP_LOADING, payload: false });
        dispatch({ type: SERVICE_GROUP_ERROR, payload: err });
      });
  };
}

export function updateServiceGroupRequest(data, id) {
  return dispatch => {
    dispatch({ type: SERVICE_GROUP_LOADING, payload: true });
    updateServiceGroup(data, id)
      .then(serviceGroup => {
        dispatch({
          type: GET_SERVICE_GROUP,
          payload: true
        });
        dispatch(success("ServiceGroup updated successfully"));
        dispatch({ type: SERVICE_GROUP_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
        dispatch({ type: SERVICE_GROUP_LOADING, payload: false });
        dispatch({ type: SERVICE_GROUP_ERROR, payload: err });
      });
  };
}

export function deleteServiceGroupRequest(id) {
  return dispatch => {
    dispatch({ type: SERVICE_GROUP_LOADING, payload: true });
    _delete(id)
      .then(serviceGroup => {
        dispatch({
          type: GET_SERVICE_GROUP,
          payload: true
        });
        dispatch(success("ServiceGroup deleted successfully"));
        dispatch({ type: SERVICE_GROUP_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
        dispatch({ type: SERVICE_GROUP_LOADING, payload: false });
        dispatch({ type: SERVICE_GROUP_ERROR, payload: err });
      });
  };
}
