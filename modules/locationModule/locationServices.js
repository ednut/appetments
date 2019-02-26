import Router from "next/router";
import Fetch from "isomorphic-unfetch";
import Cookies from "js-cookie";
import { LocationAPI } from "../../Config";

export function createLocation(data) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  return Fetch(LocationAPI, requestOptions)
    .then(handleResponse)
    .then(location => location);
}

export function getAllLocations() {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    }
  };

  return Fetch(LocationAPI, requestOptions)
    .then(handleResponse)
    .then(locations => locations);
}

export function getLocationsById(id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(id)
  };

  return Fetch(LocationAPI, requestOptions).then(handleResponse);
}

export function update(data, id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "PATCH",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  return fetch(LocationAPI + `${id}/`, requestOptions).then(handleResponse);
}

export function _delete(id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(id)
  };

  return Fetch(LocationAPI + `${id}/`, requestOptions).then(handleResponse);
}

export function addStaff(data, id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  return Fetch(LocationAPI + `${id}/add_staff/`, requestOptions)
    .then(handleResponse)
    .then(staff => staff);
}

export function removeStaff(data, id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  return Fetch(LocationAPI + `${id}/remove_staff/`, requestOptions)
    .then(handleResponse)
    .then(staff => staff);
}

export function activateLocation(data, id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  return Fetch(LocationAPI + `${id}/activate/`, requestOptions)
    .then(handleResponse)
    .then(location => location);
}

export function deactivateLocation(data, id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  return Fetch(LocationAPI + `${id}/deactivate/`, requestOptions)
    .then(handleResponse)
    .then(location => location);
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
    return data;
  });
}
