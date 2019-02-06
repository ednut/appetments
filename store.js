import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { rootReducer } from "./rootReducer";

const loggerMiddleware = createLogger({ collapsed: true });

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk, loggerMiddleware)
);

export default store;
