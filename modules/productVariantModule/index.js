import {
  createProductVariant,
  getAllProductVariants,
  update,
  activateVariant,
  deactivateVariant,
  adjustInventory,
  _delete
} from "./productVariantServices";

import { success, error } from "../alert";
import {
  GET_ALL_PRODUCT_VARIANTS,
  PRODUCT_VARIANT_ERROR,
  PRODUCT_VARIANT_LOADING,
  RERENDER,
  GET_ALL_PRODUCT
} from "../types";

// Reducer

const initialState = {};
export default function(state = initialState, action) {
  switch (action.type) {
    case PRODUCT_VARIANT_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case RERENDER:
      return {
        ...state,
        rerender: action.payload
      };
    case GET_ALL_PRODUCT_VARIANTS:
      return {
        ...state,
        variants: action.payload
      };
    case PRODUCT_VARIANT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

// Action
export function createVariantRequest(data, id) {
  return dispatch => {
    dispatch({ type: PRODUCT_VARIANT_LOADING, payload: true });
    createProductVariant(data, id)
      .then(variant => {
        dispatch({
          type: RERENDER,
          payload: true
        });
        console.log(variant);
        dispatch(success("variant created successfully"));
        dispatch({ type: PRODUCT_VARIANT_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
        dispatch({ type: PRODUCT_VARIANT_LOADING, payload: false });
        dispatch({ type: PRODUCT_VARIANT_ERROR, payload: err });
      });
  };
}

export function getAllVariantsRequest(id) {
  return dispatch => {
    dispatch({ type: PRODUCT_VARIANT_LOADING, payload: true });
    getAllProductVariants(id)
      .then(variants => {
        dispatch({
          type: GET_ALL_PRODUCT_VARIANTS,
          payload: variants
        });
        dispatch({ type: RERENDER, payload: false });
        dispatch({ type: PRODUCT_VARIANT_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
        dispatch({ type: PRODUCT_VARIANT_LOADING, payload: false });
        dispatch({ type: PRODUCT_VARIANT_ERROR, payload: err });
      });
  };
}

export function updateVariantRequest(data, id) {
  return dispatch => {
    dispatch({ type: PRODUCT_VARIANT_LOADING, payload: true });
    update(data, id)
      .then(variant => {
        dispatch({
          type: RERENDER,
          payload: true
        });
        dispatch(success("variant updated successfully"));
        dispatch({ type: PRODUCT_VARIANT_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
        dispatch({ type: PRODUCT_VARIANT_LOADING, payload: false });
        dispatch({ type: PRODUCT_VARIANT_ERROR, payload: err });
      });
  };
}

export function activateVariantRequest(data, id) {
  return dispatch => {
    dispatch({ type: PRODUCT_VARIANT_LOADING, payload: true });
    activateVariant(data, id)
      .then(variant => {
        dispatch({
          type: RERENDER,
          payload: true
        });
        dispatch(success("variant activated successfully"));
        dispatch({ type: PRODUCT_VARIANT_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
        dispatch({ type: PRODUCT_VARIANT_LOADING, payload: false });
        dispatch({ type: PRODUCT_VARIANT_ERROR, payload: err });
      });
  };
}

export function deactivateVariantRequest(data, id) {
  return dispatch => {
    dispatch({ type: PRODUCT_VARIANT_LOADING, payload: true });
    deactivateVariant(data, id)
      .then(variant => {
        dispatch({
          type: RERENDER,
          payload: true
        });
        dispatch(success("variant activated successfully"));
        dispatch({ type: PRODUCT_VARIANT_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
        dispatch({ type: PRODUCT_VARIANT_LOADING, payload: false });
        dispatch({ type: PRODUCT_VARIANT_ERROR, payload: err });
      });
  };
}

export function adjustInventoryRequest(data, id) {
  return dispatch => {
    dispatch({ type: PRODUCT_VARIANT_LOADING, payload: true });
    adjustInventory(data, id)
      .then(variant => {
        dispatch({
          type: RERENDER,
          payload: true
        });
        dispatch(success("variant activated successfully"));
        dispatch({ type: PRODUCT_VARIANT_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
        dispatch({ type: PRODUCT_VARIANT_LOADING, payload: false });
        dispatch({ type: PRODUCT_VARIANT_ERROR, payload: err });
      });
  };
}

export function deleteVariantRequest(id) {
  return dispatch => {
    dispatch({ type: PRODUCT_VARIANT_LOADING, payload: true });
    _delete(id)
      .then(variant => {
        dispatch({
          type: RERENDER,
          payload: true
        });
        dispatch(success("variant deleted successfully"));
        dispatch({ type: PRODUCT_VARIANT_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
        dispatch({ type: PRODUCT_VARIANT_LOADING, payload: false });
        dispatch({ type: PRODUCT_VARIANT_ERROR, payload: err });
      });
  };
}
