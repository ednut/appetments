import {
  createProductCategory,
  createProduct,
  getAllProduct,
  getAllProductCategories,
  updateProduct,
  updateProductCategory,
  _deleteProduct,
  _deleteProductCategory
} from "./productServices";

import { success, error } from "../alert";
import {
  PRODUCT_CREATED,
  PRODUCT_CATEGORY_CREATED,
  GET_PRODUCT,
  GET_PRODUCT_CATEGORY,
  GET_ALL_PRODUCT,
  GET_ALL_PRODUCT_CATEGORY,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_CATEGORY,
  LOADING_PRODUCT,
  LOADING_PRODUCT_CATEGORY,
  PRODUCT_ERROR,
  PRODUCT_CATEGORY_ERROR
} from "../types";

// Reducer

const initialState = {};
export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_PRODUCT:
      return {
        ...state,
        loadingProduct: action.payload
      };
    case PRODUCT_CATEGORY_CREATED:
      return {
        ...state,
        productCategoryCreated: action.payload
      };
    case LOADING_PRODUCT_CATEGORY:
      return {
        ...state,
        loadingProductCategory: action.payload
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload
      };
    case PRODUCT_CREATED:
      return {
        ...state,
        productCreated: action.payload
      };
    case GET_PRODUCT_CATEGORY:
      return {
        ...state,
        productCategory: action.payload
      };
    case GET_ALL_PRODUCT:
      return {
        ...state,
        products: action.payload
      };
    case GET_ALL_PRODUCT_CATEGORY:
      return {
        ...state,
        productCategories: action.payload
      };
    case PRODUCT_ERROR:
      return {
        ...state,
        productError: action.payload
      };
    case PRODUCT_CATEGORY_ERROR:
      return {
        ...state,
        productCategoryError: action.payload
      };
    default:
      return state;
  }
}

// Action
export function createProductRequest(data) {
  return dispatch => {
    dispatch({ type: LOADING_PRODUCT, payload: true });
    createProduct(data)
      .then(product => {
        dispatch({
          type: PRODUCT_CREATED,
          payload: true
        });
        console.log(product);
        dispatch(success("Product created successfully"));
        dispatch({ type: LOADING_PRODUCT, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
        dispatch({ type: LOADING_PRODUCT, payload: false });
        dispatch({ type: PRODUCT_ERROR, payload: err });
      });
  };
}

export function createProductCategoryRequest(data) {
  return dispatch => {
    dispatch({ type: LOADING_PRODUCT_CATEGORY, payload: true });
    createProductCategory(data)
      .then(productCategory => {
        dispatch({
          type: PRODUCT_CATEGORY_CREATED,
          payload: true
        });
        console.log(productCategory);
        dispatch(success("Product category created successfully"));
        dispatch({ type: LOADING_PRODUCT_CATEGORY, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
        dispatch({ type: LOADING_PRODUCT_CATEGORY, payload: false });
        dispatch({ type: PRODUCT_CATEGORY_ERROR, payload: err });
      });
  };
}

export function getAllProductsRequest() {
  return dispatch => {
    dispatch({ type: LOADING_PRODUCT, payload: true });
    getAllProduct()
      .then(products => {
        dispatch({
          type: GET_ALL_PRODUCT,
          payload: products
        });
        dispatch({ type: PRODUCT_CREATED, payload: false });
        dispatch({ type: LOADING_PRODUCT, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
        dispatch({ type: LOADING_PRODUCT, payload: false });
        dispatch({ type: PRODUCT_ERROR, payload: err });
      });
  };
}

export function getAllProductCategoriesRequest() {
  return dispatch => {
    dispatch({ type: LOADING_PRODUCT_CATEGORY, payload: true });
    getAllProductCategories()
      .then(productCategories => {
        dispatch({
          type: GET_ALL_PRODUCT_CATEGORY,
          payload: productCategories
        });
        dispatch({ type: LOADING_PRODUCT_CATEGORY, payload: false });
        dispatch({
          type: PRODUCT_CATEGORY_CREATED,
          payload: false
        });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
        dispatch({ type: LOADING_PRODUCT_CATEGORY, payload: false });
        dispatch({ type: PRODUCT_CATEGORY_ERROR, payload: err });
      });
  };
}

export function updateProductRequest(data, id) {
  return dispatch => {
    dispatch({ type: LOADING_PRODUCT, payload: true });
    updateProduct(data, id)
      .then(product => {
        dispatch({
          type: PRODUCT_CREATED,
          payload: true
        });
        dispatch(success("Product updated successfully"));
        dispatch({ type: LOADING_PRODUCT, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
        dispatch({ type: LOADING_PRODUCT, payload: false });
        dispatch({ type: PRODUCT_ERROR, payload: err });
      });
  };
}

export function updateProductCategoryRequest(data, id) {
  return dispatch => {
    dispatch({ type: LOADING_PRODUCT_CATEGORY, payload: true });
    updateProductCategory(data, id)
      .then(productCategory => {
        dispatch({
          type: PRODUCT_CATEGORY_CREATED,
          payload: true
        });
        dispatch(success("Product Category updated successfully"));
        dispatch({ type: LOADING_PRODUCT_CATEGORY, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
        dispatch({ type: LOADING_PRODUCT_CATEGORY, payload: false });
        dispatch({ type: PRODUCT_CATEGORY_ERROR, payload: err });
      });
  };
}

export function deleteProductCategoryRequest(id) {
  return dispatch => {
    dispatch({ type: LOADING_PRODUCT_CATEGORY, payload: true });
    _deleteProductCategory(id)
      .then(productCategory => {
        dispatch({
          type: PRODUCT_CATEGORY_CREATED,
          payload: true
        });
        dispatch(success("Product Category deleted successfully"));
        dispatch({ type: LOADING_PRODUCT_CATEGORY, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
        dispatch({ type: LOADING_PRODUCT_CATEGORY, payload: false });
        dispatch({ type: PRODUCT_CATEGORY_ERROR, payload: err });
      });
  };
}

export function deleteProductRequest(id) {
  return dispatch => {
    dispatch({ type: LOADING_PRODUCT, payload: true });
    _deleteProduct(id)
      .then(productCategory => {
        dispatch({
          type: PRODUCT_CREATED,
          payload: true
        });
        dispatch(success("Product Category deleted successfully"));
        dispatch({ type: LOADING_PRODUCT, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(error(e));
        dispatch({ type: LOADING_PRODUCT, payload: false });
        dispatch({ type: PRODUCT_ERROR, payload: err });
      });
  };
}
