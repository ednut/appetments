import { combineReducers } from "redux";

import loginReducer from "./modules/login";
import signupReducer from "./modules/signup";
import companyReducer from "./modules/company";
import alertReducer from "./modules/alert";
import authentication from "./services/authentication";
import staffReducer from "./modules/staffModule";
import locationReducer from "./modules/locationModule";
import productReducer from "./modules/productModule";

export const rootReducer = combineReducers({
  login: loginReducer,
  signup: signupReducer,
  company: companyReducer,
  alert: alertReducer,
  auth: authentication,
  staffReducer: staffReducer,
  locationReducer: locationReducer,
  productReducer: productReducer
});
