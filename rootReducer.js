import { combineReducers } from "redux";

import loginReducer from "./modules/login";
import signupReducer from "./modules/signup";
import companyReducer from "./modules/company";
import alertReducer from "./modules/alert";
import authentication from "./services/authentication";
import staffReducer from "./modules/staffModule";
import orderReducer from "./modules/orderModule";
import locationReducer from "./modules/locationModule";
import productReducer from "./modules/productModule";
import serviceGroupReducer from "./modules/serviceGroupModule";
import serviceReducer from "./modules/serviceModule";
import productVariantReducer from "./modules/productVariantModule";
import clientReducer from "./modules/clientModule";

export const rootReducer = combineReducers({
  login: loginReducer,
  signup: signupReducer,
  company: companyReducer,
  alert: alertReducer,
  auth: authentication,
  staffReducer: staffReducer,
  locationReducer: locationReducer,
  productReducer: productReducer,
  serviceGroupReducer: serviceGroupReducer,
  serviceReducer: serviceReducer,
  productVariantReducer: productVariantReducer,
  clientReducer: clientReducer,
  orderReducer: orderReducer
});
