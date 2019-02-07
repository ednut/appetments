import Fetch from "isomorphic-unfetch";
import Cookies from "js-cookie";
import Router from "next/router";
import {
  LoginAPI,
  SignupAPI,
  ComapanyAPI,
  LocationsAPI,
  StaffAPI
} from "../Config";

export const Login = postData => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData)
  };
  return Fetch(LoginAPI, requestOptions)
    .then(handleResponse)
    .then(user => user);
};

export const Signup = postData => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData)
  };
  return Fetch(SignupAPI, requestOptions)
    .then(handleResponse)
    .then(user => user);
};

export const Company = postData => {
  var auth = "Token " + JSON.parse(Cookies.get("token"));
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postData)
  };
  return Fetch(ComapanyAPI, requestOptions)
    .then(handleResponse)
    .then(user => user);
};

export function logout() {
  // remove token from local storage to log user out
  Cookies.remove("token");
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        // logout();
        Router.push("/");
      }
      const error = data || data.message || response.statusText;
      return Promise.reject(error);
    }
    console.log(data);
    return data;
  });
}
