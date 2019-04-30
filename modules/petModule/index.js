import {
  createPet,
  getAllPets,
  getPetById,
  activatePet,
  deactivatePet,
  _deletePet
} from "./petServices";

import { message } from "antd";
import {
  CREATE_PET,
  GET_ALL_PETS,
  DELETE_PET,
  PET_ERROR,
  PET_LOADING
} from "../types";

// Reducer

const initialState = {};
export default function(state = initialState, action) {
  switch (action.type) {
    case PET_LOADING:
      return {
        ...state,
        loadingPet: action.payload
      };
    case CREATE_PET:
      return {
        ...state,
        petCreated: action.payload
      };
    case GET_ALL_PETS:
      return {
        ...state,
        pets: action.payload
      };
    case PET_ERROR:
      return {
        ...state,
        petError: action.payload
      };
    default:
      return state;
  }
}

// Action
export function createPetRequest(data) {
  return dispatch => {
    dispatch({ type: PET_LOADING, payload: true });
    createPet(data)
      .then(pet => {
        dispatch({
          type: CREATE_PET,
          payload: true
        });
        dispatch(message.success("Pet created successfully"));
        dispatch({ type: PET_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: PET_LOADING, payload: false });
        dispatch({ type: PET_ERROR, payload: err });
      });
  };
}

export function getAllPetsRequest() {
  return dispatch => {
    dispatch({ type: PET_LOADING, payload: true });
    getAllPets()
      .then(pets => {
        dispatch({
          type: GET_ALL_PETS,
          payload: pets
        });
        dispatch({ type: CREATE_PET, payload: false });
        dispatch({ type: PET_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: PET_LOADING, payload: false });
        dispatch({ type: PET_ERROR, payload: err });
      });
  };
}

export function getPetsByIdRequest(id) {
  return dispatch => {
    dispatch({ type: PET_LOADING, payload: true });
    getPetById(id)
      .then(pet => {
        dispatch({
          type: GET_PET,
          payload: pet
        });
        dispatch({ type: CREATE_PET, payload: false });
        dispatch({ type: PET_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: PET_LOADING, payload: false });
        dispatch({ type: PET_ERROR, payload: err });
      });
  };
}

export function updatePetRequest(data, id) {
  return dispatch => {
    dispatch({ type: PET_LOADING, payload: true });
    updatePet(data, id)
      .then(pet => {
        dispatch({
          type: CREATE_PET,
          payload: true
        });
        dispatch(message.success("Pet updated successfully"));
        dispatch({ type: PET_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: PET_LOADING, payload: false });
        dispatch({ type: PET_ERROR, payload: err });
      });
  };
}

export function deletePetRequest(id) {
  return dispatch => {
    dispatch({ type: PET_LOADING, payload: true });
    _deletePet(id)
      .then(pet => {
        dispatch({
          type: CREATE_PET,
          payload: true
        });
        dispatch(message.success("Pet deleted successfully"));
        dispatch({ type: PET_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: PET_LOADING, payload: false });
        dispatch({ type: PET_ERROR, payload: err });
      });
  };
}

export function activatePetRequest(id) {
  return dispatch => {
    dispatch({ type: PET_LOADING, payload: true });
    activatePet(id)
      .then(pet => {
        dispatch({
          type: CREATE_PET,
          payload: true
        });
        dispatch(message.success("Pet activated successfully"));
        dispatch({ type: PET_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: PET_LOADING, payload: false });
        dispatch({ type: PET_ERROR, payload: err });
      });
  };
}

export function deactivatePetRequest(id) {
  return dispatch => {
    dispatch({ type: PET_LOADING, payload: true });
    deactivatePet(id)
      .then(pet => {
        dispatch({
          type: CREATE_PET,
          payload: true
        });
        dispatch(message.success("Pet deactivated successfully"));
        dispatch({ type: PET_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: PET_LOADING, payload: false });
        dispatch({ type: PET_ERROR, payload: err });
      });
  };
}
