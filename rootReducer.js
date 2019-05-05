import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import userReducer from "./modules/user";
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
import petReducer from "./modules/petModule";
import petCategoryReducer from "./modules/petCategoryModule";
import bankDetailsReducer from "./modules/bankDetailsModule";
import messagesReducer from "./modules/messagesModule";

export const rootReducer = combineReducers({
  user: userReducer,
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
  orderReducer: orderReducer,
  petReducer: petReducer,
  petCategoryReducer: petCategoryReducer,
  bankDetailsReducer: bankDetailsReducer,
  messagesReducer: messagesReducer,
  form: formReducer
});
