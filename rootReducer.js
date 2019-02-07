import { combineReducers } from "redux";

import loginReducer from "./modules/login";
import signupReducer from "./modules/signup";
import companyReducer from "./modules/company";
import alertReducer from "./modules/alert";
import authentication from "./services/authentication";
import staffReducer from "./modules/staffModule";

export const rootReducer = combineReducers({
  login: loginReducer,
  signup: signupReducer,
  company: companyReducer,
  alert: alertReducer,
  auth: authentication,
  staffReducer: staffReducer
});
