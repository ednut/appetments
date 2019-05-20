import {
  createClient,
  getAllClients,
  getClientById,
  activateClient,
  deactivateClient,
  addPetToClient,
  getPetById,
  updateClient,
  updatePetToClient,
  customerLogin,
  customerSignup,
  _deleteClient,
  _deletePet
} from "./clientServices";
import Router from "next/router";
import { message } from "antd";
import Cookies from "js-cookie";
import {
  CLIENT_CREATED,
  GET_CLIENT,
  GET_ALL_CLIENT,
  LOADING_CLIENT,
  CLIENT_LOGIN,
  CLIENT_SIGNUP,
  CLIENT_ERROR,
  PET_CREATED,
  GET_PET,
  SEVICE_DATA,
  CALENDER_DATA
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
    case CLIENT_LOGIN:
      return {
        ...state,
        clientData: action.payload
      };
    case PET_CREATED:
      return {
        ...state,
        petCreated: action.payload
      };
    case CLIENT_SIGNUP:
      return {
        ...state,
        clientData: action.payload
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
    case SEVICE_DATA:
      return {
        ...state,
        serviceData: action.payload
      };
    case CALENDER_DATA:
      return {
        ...state,
        calenderData: action.payload
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
        message.success("Client created successfully");
        dispatch({ type: LOADING_CLIENT, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        message.error(e);
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
        dispatch({
          type: PET_CREATED,
          payload: false
        });
        dispatch({ type: LOADING_CLIENT, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        message.error(e);
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
        message.error(e);
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
        message.success("Client updated successfully");
        dispatch({ type: LOADING_CLIENT, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        message.error(e);
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
        message.success("Client deleted successfully");
        dispatch({ type: LOADING_CLIENT, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        message.error(e);
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
        message.success("Client activated successfully");
        dispatch({ type: LOADING_CLIENT, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        message.error(e);
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
        message.success("Client deactivated successfully");
        dispatch({ type: LOADING_CLIENT, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        message.error(e);
        dispatch({ type: LOADING_CLIENT, payload: false });
        dispatch({ type: CLIENT_ERROR, payload: err });
      });
  };
}

export function updatePetsRequest(data, id) {
  return dispatch => {
    dispatch({ type: LOADING_CLIENT, payload: true });
    updatePetToClient(data, id)
      .then(client => {
        dispatch({
          type: CLIENT_CREATED,
          payload: true
        });
        message.success("Pet updated successfully");
        dispatch({ type: LOADING_CLIENT, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        message.error(e);
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
        dispatch({
          type: PET_CREATED,
          payload: true
        });
        message.success("Pet added successfully");
        dispatch({ type: LOADING_CLIENT, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        message.error(e);
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
        message.error(e);
        dispatch({ type: LOADING_CLIENT, payload: false });
        dispatch({ type: CLIENT_ERROR, payload: err });
      });
  };
}

export function deletePetRequest(id) {
  return dispatch => {
    dispatch({ type: LOADING_CLIENT, payload: true });
    _deletePet(id)
      .then(client => {
        dispatch({
          type: CLIENT_CREATED,
          payload: true
        });
        message.success("Pet deleted successfully");
        dispatch({ type: LOADING_CLIENT, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        message.error(e);
        dispatch({ type: LOADING_CLIENT, payload: false });
        dispatch({ type: CLIENT_ERROR, payload: err });
      });
  };
}

export function customerLoginRequest(data) {
  return dispatch => {
    dispatch({ type: LOADING_CLIENT, payload: true });
    customerLogin(data)
      .then(client => {
        dispatch({
          type: CLIENT_LOGIN,
          payload: client
        });
        // message.success("Login successful");
        Router.push("/select-service");
        dispatch({ type: LOADING_CLIENT, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        message.error(e);
        dispatch({ type: LOADING_CLIENT, payload: false });
        dispatch({ type: CLIENT_ERROR, payload: err });
      });
  };
}

export function customerSignupRequest(data) {
  return dispatch => {
    dispatch({ type: LOADING_CLIENT, payload: true });
    customerSignup(data)
      .then(client => {
        dispatch({
          type: CLIENT_SIGNUP,
          payload: client
        });
        console.log("got it", client.customer_code);
        message.success("Signup successful");
        Router.push("/select-service");

        Cookies.set("CustomerID", client.customer_code);
        dispatch({ type: LOADING_CLIENT, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        message.error(e);
        dispatch({ type: LOADING_CLIENT, payload: false });
        dispatch({ type: CLIENT_ERROR, payload: err });
      });
  };
}

export function serviceDataRequest(data) {
  return dispatch => {
    dispatch({ type: LOADING_CLIENT, payload: true });
    dispatch({
      type: SEVICE_DATA,
      payload: data
    });
    dispatch({ type: LOADING_CLIENT, payload: false });
  };
}

export function calenderDataRequest(data) {
  return dispatch => {
    dispatch({ type: LOADING_CLIENT, payload: true });
    dispatch({
      type: CALENDER_DATA,
      payload: data
    });
    dispatch({ type: LOADING_CLIENT, payload: false });
  };
}
