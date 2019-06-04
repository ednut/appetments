import Fetch from "isomorphic-unfetch";
import Cookies from "js-cookie";
import Router from "next/router";
import {
  LoginAPI,
  SignupAPI,
  ComapanyAPI,
  LocationsAPI,
  StaffAPI,
  GoogleLoginAPI,
  GoogleSignupAPI
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

export const googleLogin = postData => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData)
  };
  return Fetch(GoogleLoginAPI, requestOptions)
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

export const GoogleSignup = postData => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData)
  };
  return Fetch(GoogleSignupAPI, requestOptions)
    .then(handleResponse)
    .then(user => user);
};

export function logout() {
  Cookies.remove("token");
}

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
  var company = localStorage.getItem("companyID");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    }
  };

  return Fetch(ComapanyAPI + `${company}/`, requestOptions)
    .then(handleResponse)
    .then(companies => companies);
}

export function update(data) {
  var auth = "Token " + Cookies.get("token");
  var company = localStorage.getItem("companyID");
  const requestOptions = {
    method: "PATCH",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  return fetch(ComapanyAPI + `${company}/`, requestOptions).then(
    handleResponse
  );
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

export const getCompanyByCode = data => {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
  return Fetch(ComapanyAPI + `get-by-code/`, requestOptions)
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
      const error = data || data.message || response.statusText || [];
      return Promise.reject(error);
    }
    // console.log(data);
    return data;
  });
}
