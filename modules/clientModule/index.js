import {
  createClient,
  getAllClients,
  getClientById,
  activateClient,
  deactivateClient,
  addPetToClient,
  getPetById,
  updateClient,
  _deleteClient
} from "./clientServices";

import { success, error } from "../alert";
import {
  CLIENT_CREATED,
  GET_CLIENT,
  GET_ALL_CLIENT,
  LOADING_CLIENT,
  CLIENT_ERROR,
  GET_PET
} from "../types";

// Reducer

const initialState = {};
export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_CLIENT:
      return {
        ...state,
        loadingClient: action.payload
      };
    case GET_CLIENT:
      return {
        ...state,
        client: action.payload
      };
    case CLIENT_CREATED:
      return {
        ...state,
        clientCreated: action.payload
      };
    case GET_ALL_CLIENT:
      return {
        ...state,
        clients: action.payload
      };
    case GET_PET:
      return {
        ...state,
        pet: action.payload
      };
    case CLIENT_ERROR:
      return {
        ...state,
        clientError: action.payload
      };
    default:
      return state;
  }
}

// Action
export function createClientRequest(data) {
  return dispatch => {
    dispatch({ type: LOADING_CLIENT, payload: true });
    createClient(data)
      .then(client => {
        dispatch({
          type: CLIENT_CREATED,
          payload: true
        });
        dispatch(success("Client created successfully"));
        dispatch({ type: LOADING_CLIENT, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
        dispatch({ type: LOADING_CLIENT, payload: false });
        dispatch({ type: CLIENT_ERROR, payload: err });
      });
  };
}

export function getAllClientsRequest() {
  return dispatch => {
    dispatch({ type: LOADING_CLIENT, payload: true });
    getAllClients()
      .then(clients => {
        dispatch({
          type: GET_ALL_CLIENT,
          payload: clients
        });
        dispatch({ type: CLIENT_CREATED, payload: false });
        dispatch({ type: LOADING_CLIENT, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
        dispatch({ type: LOADING_CLIENT, payload: false });
        dispatch({ type: CLIENT_ERROR, payload: err });
      });
  };
}

export function getClientsByIdRequest(id) {
  return dispatch => {
    dispatch({ type: LOADING_CLIENT, payload: true });
    getClientById(id)
      .then(client => {
        dispatch({
          type: GET_CLIENT,
          payload: client
        });
        dispatch({ type: CLIENT_CREATED, payload: false });
        dispatch({ type: LOADING_CLIENT, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
        dispatch({ type: LOADING_CLIENT, payload: false });
        dispatch({ type: CLIENT_ERROR, payload: err });
      });
  };
}

export function updateClientRequest(data, id) {
  return dispatch => {
    dispatch({ type: LOADING_CLIENT, payload: true });
    updateClient(data, id)
      .then(client => {
        dispatch({
          type: CLIENT_CREATED,
          payload: true
        });
        dispatch(success("Client updated successfully"));
        dispatch({ type: LOADING_CLIENT, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
        dispatch({ type: LOADING_CLIENT, payload: false });
        dispatch({ type: CLIENT_ERROR, payload: err });
      });
  };
}

export function deleteClientRequest(id) {
  return dispatch => {
    dispatch({ type: LOADING_CLIENT, payload: true });
    _deleteClient(id)
      .then(client => {
        dispatch({
          type: CLIENT_CREATED,
          payload: true
        });
        dispatch(success("Client deleted successfully"));
        dispatch({ type: LOADING_CLIENT, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
        dispatch({ type: LOADING_CLIENT, payload: false });
        dispatch({ type: CLIENT_ERROR, payload: err });
      });
  };
}

export function activateClientRequest(id) {
  return dispatch => {
    dispatch({ type: LOADING_CLIENT, payload: true });
    activateClient(id)
      .then(client => {
        dispatch({
          type: CLIENT_CREATED,
          payload: true
        });
        dispatch(success("Client activated successfully"));
        dispatch({ type: LOADING_CLIENT, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
        dispatch({ type: LOADING_CLIENT, payload: false });
        dispatch({ type: CLIENT_ERROR, payload: err });
      });
  };
}

export function deactivateClientRequest(id) {
  return dispatch => {
    dispatch({ type: LOADING_CLIENT, payload: true });
    deactivateClient(id)
      .then(client => {
        dispatch({
          type: CLIENT_CREATED,
          payload: true
        });
        dispatch(success("Client deactivated successfully"));
        dispatch({ type: LOADING_CLIENT, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
        dispatch({ type: LOADING_CLIENT, payload: false });
        dispatch({ type: CLIENT_ERROR, payload: err });
      });
  };
}

export function addPetToClientRequest(data, id) {
  return dispatch => {
    dispatch({ type: LOADING_CLIENT, payload: true });
    addPetToClient(data, id)
      .then(client => {
        dispatch({
          type: CLIENT_CREATED,
          payload: true
        });
        dispatch(success("Pet added successfully"));
        dispatch({ type: LOADING_CLIENT, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
        dispatch({ type: LOADING_CLIENT, payload: false });
        dispatch({ type: CLIENT_ERROR, payload: err });
      });
  };
}

export function getPetByIdRequest(id) {
  return dispatch => {
    dispatch({ type: LOADING_CLIENT, payload: true });
    getPetById(id)
      .then(pet => {
        dispatch({
          type: GET_PET,
          payload: pet
        });
        // dispatch(success("Pet added successfully"));
        dispatch({ type: LOADING_CLIENT, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
        dispatch({ type: LOADING_CLIENT, payload: false });
        dispatch({ type: CLIENT_ERROR, payload: err });
      });
  };
}
