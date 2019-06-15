import {
  createPetCategory,
  getAllPetsCategory,
  getPetCategoryById,
  activatePetCategory,
  deactivatePetCategory,
  updatePetCategory,
  _deletePetCategory
} from "./petCategoryServices";

import { message } from "antd";
import {
  CREATE_PET_CATEGORY,
  UPDATE_PET_CATEGORY,
  GET_ALL_PETS_CATEGORY,
  DELETE_PET_CATEGORY,
  PET_CATEGORY_ERROR,
  PET_CATEGORY_LOADING,
  RELOAD_PET
} from "../types";

// Reducer

const initialState = {};
export default function(state = initialState, action) {
  switch (action.type) {
    case PET_CATEGORY_LOADING:
      return {
        ...state,
        loadingPetCategory: action.payload
      };
    case CREATE_PET_CATEGORY:
      return {
        ...state,
        petCategoryCreated: action.payload
      };
    case RELOAD_PET:
      return {
        ...state,
        reloadPet: action.payload
      };
    case GET_ALL_PETS_CATEGORY:
      return {
        ...state,
        petsCategory: action.payload
      };
    case PET_CATEGORY_ERROR:
      return {
        ...state,
        petCategoryError: action.payload
      };
    default:
      return state;
  }
}

// Action
export function createPetCategoryRequest(data) {
  return dispatch => {
    dispatch({ type: PET_CATEGORY_LOADING, payload: true });
    createPetCategory(data)
      .then(petCategory => {
        dispatch({
          type: CREATE_PET_CATEGORY,
          payload: true
        });
        message.success("Pet created successfully", 5);
        dispatch({ type: PET_CATEGORY_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        message.error(e, 5);
        dispatch({ type: PET_CATEGORY_LOADING, payload: false });
        dispatch({ type: PET_CATEGORY_ERROR, payload: err });
      });
  };
}

export function getAllPetsCategoryRequest() {
  return dispatch => {
    dispatch({ type: PET_CATEGORY_LOADING, payload: true });
    getAllPetsCategory()
      .then(petsCategory => {
        dispatch({
          type: GET_ALL_PETS_CATEGORY,
          payload: petsCategory
        });
        dispatch({ type: RELOAD_PET, payload: true });
        dispatch({ type: CREATE_PET_CATEGORY, payload: false });
        dispatch({ type: PET_CATEGORY_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        message.error(e, 5);
        dispatch({ type: PET_CATEGORY_LOADING, payload: false });
        dispatch({ type: PET_CATEGORY_ERROR, payload: err });
      });
  };
}

export function getPetsCategoryByIdRequest(id) {
  return dispatch => {
    dispatch({ type: PET_CATEGORY_LOADING, payload: true });
    getPetCategoryById(id)
      .then(petCategory => {
        dispatch({
          type: GET_PET_CATEGORY,
          payload: petCategory
        });
        dispatch({ type: CREATE_PET_CATEGORY, payload: false });
        dispatch({ type: PET_CATEGORY_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        message.error(e, 5);
        dispatch({ type: PET_CATEGORY_LOADING, payload: false });
        dispatch({ type: PET_CATEGORY_ERROR, payload: err });
      });
  };
}

export function updatePetCategoryRequest(data, id) {
  return dispatch => {
    dispatch({ type: PET_CATEGORY_LOADING, payload: true });
    updatePetCategory(data, id)
      .then(petCategory => {
        dispatch({
          type: UPDATE_PET_CATEGORY,
          payload: true
        });
        message.success("Pet updated successfully", 5);
        dispatch({ type: PET_CATEGORY_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        message.error(e, 5);
        dispatch({ type: PET_CATEGORY_LOADING, payload: false });
        dispatch({ type: PET_CATEGORY_ERROR, payload: err });
      });
  };
}

export function deletePetCategoryRequest(id) {
  return dispatch => {
    dispatch({ type: PET_CATEGORY_LOADING, payload: true });
    _deletePetCategory(id)
      .then(petCategory => {
        dispatch({
          type: CREATE_PET_CATEGORY,
          payload: true
        });
        message.success("Pet deleted successfully");
        dispatch({ type: PET_CATEGORY_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        message.error(e, 5);
        dispatch({ type: PET_CATEGORY_LOADING, payload: false });
        dispatch({ type: PET_CATEGORY_ERROR, payload: err });
      });
  };
}

export function activatePetCategoryRequest(id) {
  return dispatch => {
    dispatch({ type: PET_CATEGORY_LOADING, payload: true });
    activatePetCategory(id)
      .then(petCategory => {
        dispatch({
          type: CREATE_PET_CATEGORY,
          payload: true
        });
        message.success("Pet activated successfully", 5);
        dispatch({ type: PET_CATEGORY_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        message.error(e, 5);
        dispatch({ type: PET_CATEGORY_LOADING, payload: false });
        dispatch({ type: PET_CATEGORY_ERROR, payload: err });
      });
  };
}

export function deactivatePetCategoryRequest(id) {
  return dispatch => {
    dispatch({ type: PET_CATEGORY_LOADING, payload: true });
    deactivatePetCategory(id)
      .then(petCategory => {
        dispatch({
          type: CREATE_PET_CATEGORY,
          payload: true
        });
        message.success("Pet deactivated successfully");
        dispatch({ type: PET_CATEGORY_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        message.error(e, 5);
        dispatch({ type: PET_CATEGORY_LOADING, payload: false });
        dispatch({ type: PET_CATEGORY_ERROR, payload: err });
      });
  };
}
