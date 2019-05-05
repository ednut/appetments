import Router from "next/router";
import Fetch from "isomorphic-unfetch";
import Cookies from "js-cookie";
import { BankDetailsAPI } from "../../Config";

export function createBankDetails(data) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  return Fetch(BankDetailsAPI, requestOptions)
    .then(handleResponse)
    .then(bankDetails => bankDetails);
}

export function getAllBankDetails() {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    }
  };

  return Fetch(BankDetailsAPI, requestOptions)
    .then(handleResponse)
    .then(bankDetails => bankDetails);
}

export function getBankDetailsById(id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    }
  };

  return Fetch(BankDetailsAPI + `${id}/`, requestOptions).then(handleResponse);
}

export function activateBankDetails(id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    }
  };

  return Fetch(BankDetailsAPI + `${id}/activate/`, requestOptions)
    .then(handleResponse)
    .then(bankDetails => bankDetails);
}

export function deactivateBankDetails(id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    }
  };

  return Fetch(BankDetailsAPI + `${id}/deactivate/`, requestOptions)
    .then(handleResponse)
    .then(bankDetails => bankDetails);
}

export function _deleteBankDetails(id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(id)
  };

  return Fetch(BankDetailsAPI + `${id}/`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        // logout();
        Router.push("/login");
      }
      const error = data || data.message || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}
