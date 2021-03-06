import {
  createService,
  getAllService,
  updateService,
  getServiceById,
  addStaff,
  removeStaff,
  _delete
} from "./serviceServices";

import { message } from "antd";
import {
  GET_SERVICE,
  GET_ALL_SERVICE,
  SERVICE,
  SERVICE_ERROR,
  SERVICE_LOADING,
  STAFF_ADDED,
  STAFF_REMOVED,
  STAFF_ADDING_ERROR
} from "../types";

// Reducer

const initialState = {};
export default function(state = initialState, action) {
  switch (action.type) {
    case SERVICE_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case GET_SERVICE:
      return {
        ...state,
        service: action.payload
      };
    case SERVICE:
      return {
        ...state,
        individual_service: action.payload
      };
    case GET_ALL_SERVICE:
      return {
        ...state,
        services: action.payload
      };
    case SERVICE_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case STAFF_ADDED:
      return {
        ...state,
        staffAddedService: action.payload
      };
    case STAFF_REMOVED:
      return {
        ...state,
        staffRemovedFromService: action.payload
      };
    case STAFF_ADDING_ERROR:
      return {
        ...state,
        staffAddingError: action.payload
      };
    default:
      return state;
  }
}

// Action
export function createServiceRequest(data) {
  return dispatch => {
    dispatch({ type: SERVICE_LOADING, payload: true });
    createService(data)
      .then(service => {
        dispatch({
          type: GET_SERVICE,
          payload: true
        });
        console.log(service);
        dispatch(message.success("Service created successfully"));
        dispatch({ type: SERVICE_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: SERVICE_LOADING, payload: false });
        dispatch({ type: SERVICE_ERROR, payload: err });
      });
  };
}

export function getAllServiceRequest() {
  return dispatch => {
    dispatch({ type: SERVICE_LOADING, payload: true });
    getAllService()
      .then(services => {
        dispatch({
          type: GET_ALL_SERVICE,
          payload: services
        });
        dispatch({
          type: GET_SERVICE,
          payload: false
        });
        dispatch({
          type: STAFF_ADDED,
          payload: false
        });
        dispatch({
          type: STAFF_REMOVED,
          payload: false
        });
        dispatch({ type: SERVICE_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: SERVICE_LOADING, payload: false });
        dispatch({ type: SERVICE_ERROR, payload: err });
      });
  };
}

export function updateServiceRequest(data, id) {
  return dispatch => {
    dispatch({ type: SERVICE_LOADING, payload: true });
    updateService(data, id)
      .then(service => {
        dispatch({
          type: GET_SERVICE,
          payload: true
        });
        dispatch(message.success("Service updated successfully"));
        dispatch({ type: SERVICE_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: SERVICE_LOADING, payload: false });
        dispatch({ type: SERVICE_ERROR, payload: err });
      });
  };
}

export function addStaffRequest(data) {
  return dispatch => {
    dispatch({ type: SERVICE_LOADING, payload: true });
    addStaff(data)
      .then(staff => {
        dispatch({
          type: STAFF_ADDED,
          payload: true
        });
        console.log(staff);
        dispatch(message.success("Staff Added successfully"));
        dispatch({ type: SERVICE_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: SERVICE_LOADING, payload: false });
        dispatch({ type: STAFF_ADDING_ERROR, payload: err });
      });
  };
}

export function removeStaffRequest(data) {
  return dispatch => {
    dispatch({ type: SERVICE_LOADING, payload: true });
    removeStaff(data)
      .then(staff => {
        dispatch({
          type: STAFF_REMOVED,
          payload: true
        });
        dispatch(message.success("Staff Removed successfully"));
        dispatch({ type: SERVICE_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: SERVICE_LOADING, payload: false });
        dispatch({ type: STAFF_ADDING_ERROR, payload: err });
      });
  };
}

export function deleteServiceRequest(id) {
  return dispatch => {
    dispatch({ type: SERVICE_LOADING, payload: true });
    _delete(id)
      .then(service => {
        dispatch({
          type: GET_SERVICE,
          payload: true
        });
        dispatch(message.success("Service deleted successfully"));
        dispatch({ type: SERVICE_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: SERVICE_LOADING, payload: false });
        dispatch({ type: SERVICE_ERROR, payload: err });
      });
  };
}

export function getServiceByIdRequest(id) {
  return dispatch => {
    dispatch({ type: SERVICE_LOADING, payload: true });
    getServiceById(id)
      .then(service => {
        dispatch({
          type: SERVICE,
          payload: service
        });
        dispatch(message.success("Service loaded successfully"));
        dispatch({ type: SERVICE_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: SERVICE_LOADING, payload: false });
        dispatch({ type: SERVICE_ERROR, payload: err });
      });
  };
}
