import Cookies from "js-cookie";
import Router from "next/router";
import { error } from "../modules/alert";

export default function(state = { authenticate: true }, action) {
  switch (action.type) {
    case "NOT_AUTHENTICATED":
      return {
        ...state,
        isAuthenticated: action.payload
      };
    default:
      return state;
  }
}

export const authUser = () => dispatch => {
  let auth = Cookies.get("token");
  if (auth === undefined) {
    Router.push("/login");
    dispatch({
      type: "NOT_AUTHENTICATED",
      payload: { authenticate: false }
    });
    dispatch(error("You need to login first"));
  }
};
