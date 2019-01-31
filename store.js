import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { combineReducers } from "redux";
import loginReducer from "./modules/app/login";
import signupReducer from "./modules/app/signup";
import alertReducer from "./modules/app/alert";

export const rootReducer = combineReducers({
  login: loginReducer,
  signup: signupReducer,
  alert: alertReducer
});

const initialState = {};
const loggerMiddleware = createLogger({ collapsed: true });

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk, loggerMiddleware)
);

export default store;
