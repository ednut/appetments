import {
  createMessage,
  getAllMessages,
  getMessageById,
  activateMessage,
  deactivateMessage,
  _deleteMessage
} from "./messagesServices";

import { message } from "antd";
import {
  CREATE_MESSAGE,
  GET_ALL_MESSAGES,
  DELETE_MESSAGE,
  MESSAGE_ERROR,
  MESSAGE_LOADING
} from "../types";

// Reducer

const initialState = {};
export default function(state = initialState, action) {
  switch (action.type) {
    case MESSAGE_LOADING:
      return {
        ...state,
        loadingMessage: action.payload
      };
    case CREATE_MESSAGE:
      return {
        ...state,
        messageCreated: action.payload
      };
    case GET_ALL_MESSAGES:
      return {
        ...state,
        messages: action.payload
      };
    case MESSAGE_ERROR:
      return {
        ...state,
        messageError: action.payload
      };
    default:
      return state;
  }
}

// Action
export function createMessageRequest(data) {
  return dispatch => {
    dispatch({ type: MESSAGE_LOADING, payload: true });
    createMessage(data)
      .then(message => {
        dispatch({
          type: CREATE_MESSAGE,
          payload: true
        });
        dispatch(message.success("Message created successfully"));
        dispatch({ type: MESSAGE_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: MESSAGE_LOADING, payload: false });
        dispatch({ type: MESSAGE_ERROR, payload: err });
      });
  };
}

export function getAllMessagesRequest() {
  return dispatch => {
    dispatch({ type: MESSAGE_LOADING, payload: true });
    getAllMessages()
      .then(messages => {
        dispatch({
          type: GET_ALL_MESSAGES,
          payload: messages
        });
        dispatch({ type: CREATE_MESSAGE, payload: false });
        dispatch({ type: MESSAGE_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: MESSAGE_LOADING, payload: false });
        dispatch({ type: MESSAGE_ERROR, payload: err });
      });
  };
}

export function getMessagesByIdRequest(id) {
  return dispatch => {
    dispatch({ type: MESSAGE_LOADING, payload: true });
    getMessageById(id)
      .then(message => {
        dispatch({
          type: GET_MESSAGE,
          payload: message
        });
        dispatch({ type: CREATE_MESSAGE, payload: false });
        dispatch({ type: MESSAGE_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: MESSAGE_LOADING, payload: false });
        dispatch({ type: MESSAGE_ERROR, payload: err });
      });
  };
}

export function updateMessageRequest(data, id) {
  return dispatch => {
    dispatch({ type: MESSAGE_LOADING, payload: true });
    updateMessage(data, id)
      .then(message => {
        dispatch({
          type: CREATE_MESSAGE,
          payload: true
        });
        dispatch(message.success("Message updated successfully"));
        dispatch({ type: MESSAGE_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: MESSAGE_LOADING, payload: false });
        dispatch({ type: MESSAGE_ERROR, payload: err });
      });
  };
}

export function deleteMessageRequest(id) {
  return dispatch => {
    dispatch({ type: MESSAGE_LOADING, payload: true });
    _deleteMessage(id)
      .then(message => {
        dispatch({
          type: CREATE_MESSAGE,
          payload: true
        });
        dispatch(message.success("Message deleted successfully"));
        dispatch({ type: MESSAGE_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: MESSAGE_LOADING, payload: false });
        dispatch({ type: MESSAGE_ERROR, payload: err });
      });
  };
}

export function activateMessageRequest(id) {
  return dispatch => {
    dispatch({ type: MESSAGE_LOADING, payload: true });
    activateMessage(id)
      .then(message => {
        dispatch({
          type: CREATE_MESSAGE,
          payload: true
        });
        dispatch(message.success("Message activated successfully"));
        dispatch({ type: MESSAGE_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: MESSAGE_LOADING, payload: false });
        dispatch({ type: MESSAGE_ERROR, payload: err });
      });
  };
}

export function deactivateMessageRequest(id) {
  return dispatch => {
    dispatch({ type: MESSAGE_LOADING, payload: true });
    deactivateMessage(id)
      .then(message => {
        dispatch({
          type: CREATE_MESSAGE,
          payload: true
        });
        dispatch(message.success("Message deactivated successfully"));
        dispatch({ type: MESSAGE_LOADING, payload: false });
      })
      .catch(err => {
        let e = err[Object.keys(err)[0]];
        dispatch(message.error(e));
        dispatch({ type: MESSAGE_LOADING, payload: false });
        dispatch({ type: MESSAGE_ERROR, payload: err });
      });
  };
}
