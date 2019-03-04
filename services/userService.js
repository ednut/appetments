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

export const createCompany = postData => {
  var auth = "Token " + Cookies.get("token");
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

export function getAllCompany() {
  var auth = "Token " + Cookies.get("token");
  var user = localStorage.getItem("userId");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    }
  };

  return Fetch(ComapanyAPI + `${user}/`, requestOptions)
    .then(handleResponse)
    .then(companies => companies);
}

export function update(data) {
  var auth = "Token " + Cookies.get("token");
  var user = localStorage.getItem("userId");
  const requestOptions = {
    method: "PATCH",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  return fetch(ComapanyAPI + `${user}/`, requestOptions).then(handleResponse);
}

export function getCompanyById(id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(id)
  };

  return Fetch(ComapanyAPI + `${id}/`, requestOptions).then(handleResponse);
}

export function addCloseDateToCompany(data, id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  return Fetch(ComapanyAPI + `${id}/add_closed_date/`, requestOptions)
    .then(handleResponse)
    .then(company => company);
}

export function removeCloseDateFromCompany(data, id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  return Fetch(ComapanyAPI + `${id}/remove_closed_date/`, requestOptions)
    .then(handleResponse)
    .then(company => company);
}

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
    // console.log(data);
    return data;
  });
}
