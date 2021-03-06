import {
  createOrder,
  getAllOrders,
  createOrderByCustomer,
  getAllOnlineOrders,
  getAllPendingOnlineOrders,
  confirmOnlineBooking,
  update,
  _delete
} from "./orderServices";

import { message } from "antd";
import Router from "next/router";

import {
  CREATE_ORDER,
  GET_ALL_ORDERS,
  CREATE_ONLINE_ORDER,
  GET_ONLINE_ORDERS,
  GET_PENDING_ONLINE_ORDERS,
  CONFIRM_ONLINE_BOOKING,
  ORDER_ERROR,
  ORDER_LOADING
} from "../types";

// Reducer

const initialState = {};
export default function(state = initialState, action) {
  switch (action.type) {
    case ORDER_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case CREATE_ORDER:
      return {
        ...state,
        order: action.payload
      };
    case GET_ONLINE_ORDERS:
      return {
        ...state,
        onlineOrder: action.payload
      };
    case GET_PENDING_ONLINE_ORDERS:
      return {
        ...state,
        pendingOnlineOrder: action.payload
      };
    case CONFIRM_ONLINE_BOOKING:
      return {
        ...state,
        onlineBooking: action.payload
      };
    case GET_ALL_ORDERS:
      return {
        ...state,
        orders: action.payload
      };
    case ORDER_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

// Action
export function createOrderRequest(data) {
  return dispatch => {
    dispatch({ type: ORDER_LOADING, payload: true });
    createOrder(data)
      .then(order => {
        dispatch({
          type: CREATE_ORDER,
          payload: true
        });
        console.log(order);
        dispatch(message.success("Order created successfully"));
        dispatch({ type: ORDER_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: ORDER_LOADING, payload: false });
        dispatch({ type: ORDER_ERROR, payload: err });
      });
  };
}

export function createOnlineOrderRequest(data) {
  return dispatch => {
    dispatch({ type: ORDER_LOADING, payload: true });
    createOrderByCustomer(data)
      .then(order => {
        dispatch({
          type: CREATE_ONLINE_ORDER,
          payload: true
        });
        message.success("Order created successfully");
        dispatch({ type: ORDER_LOADING, payload: false });
        Router.push("/online-booking-success");
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: ORDER_LOADING, payload: false });
        dispatch({ type: ORDER_ERROR, payload: err });
      });
  };
}

export function confirmOnlineBookingRequest(data) {
  return dispatch => {
    dispatch({ type: ORDER_LOADING, payload: true });
    confirmOnlineBooking(data)
      .then(order => {
        dispatch({
          type: CONFIRM_ONLINE_BOOKING,
          payload: true
        });
        message.success("Booking confirmed");
        dispatch({ type: ORDER_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: ORDER_LOADING, payload: false });
        dispatch({ type: ORDER_ERROR, payload: err });
      });
  };
}

export function getAllOrdersRequest() {
  return dispatch => {
    dispatch({ type: ORDER_LOADING, payload: true });
    getAllOrders()
      .then(orders => {
        dispatch({
          type: GET_ALL_ORDERS,
          payload: orders
        });
        dispatch({ type: CREATE_ORDER, payload: false });
        dispatch({ type: ORDER_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: ORDER_LOADING, payload: false });
        dispatch({ type: ORDER_ERROR, payload: err });
      });
  };
}

export function getAllOnlineOrdersRequest() {
  return dispatch => {
    dispatch({ type: ORDER_LOADING, payload: true });
    getAllOnlineOrders()
      .then(orders => {
        dispatch({
          type: GET_ONLINE_ORDERS,
          payload: orders
        });
        dispatch({
          type: CONFIRM_ONLINE_BOOKING,
          payload: false
        });
        dispatch({ type: CREATE_ORDER, payload: false });
        dispatch({ type: ORDER_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: ORDER_LOADING, payload: false });
        dispatch({ type: ORDER_ERROR, payload: err });
      });
  };
}

export function getPendingOnlineOrdersRequest() {
  return dispatch => {
    dispatch({ type: ORDER_LOADING, payload: true });
    getAllPendingOnlineOrders()
      .then(orders => {
        dispatch({
          type: GET_PENDING_ONLINE_ORDERS,
          payload: orders
        });
        dispatch({ type: CREATE_ORDER, payload: false });
        dispatch({ type: ORDER_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: ORDER_LOADING, payload: false });
        dispatch({ type: ORDER_ERROR, payload: err });
      });
  };
}

export function updateOrderRequest(data, orderID) {
  return dispatch => {
    dispatch({ type: ORDER_LOADING, payload: true });
    update(data, orderID)
      .then(order => {
        dispatch({
          type: CREATE_ORDER,
          payload: true
        });
        dispatch(message.success("Order updated successfully"));
        dispatch({ type: ORDER_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: ORDER_LOADING, payload: false });
        dispatch({ type: ORDER_ERROR, payload: err });
      });
  };
}

export function deleteOrderRequest(id) {
  return dispatch => {
    dispatch({ type: ORDER_LOADING, payload: true });
    _delete(id)
      .then(order => {
        dispatch({
          type: CREATE_ORDER,
          payload: true
        });
        dispatch(message.success("Order deleted successfully"));
        dispatch({ type: ORDER_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: ORDER_LOADING, payload: false });
        dispatch({ type: ORDER_ERROR, payload: err });
      });
  };
}
