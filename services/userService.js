import Fetch from "isomorphic-unfetch";
import { LoginAPI, SignupAPI } from "../Config";
import Router from "next/router";

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

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        // logout();
        Router.push("/");
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    console.log(data);
    return data;
  });
}
