import Router from "next/router";
import Fetch from "isomorphic-unfetch";
import Cookies from "js-cookie";
import { ServiceGroupsAPi } from "../../Config";

export function createServiceGroup(data) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  return Fetch(ServiceGroupsAPi, requestOptions)
    .then(handleResponse)
    .then(serviceGroup => serviceGroup);
}

export function getAllServiceGroups() {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    }
  };

  return Fetch(ServiceGroupsAPi, requestOptions)
    .then(handleResponse)
    .then(serviceGroups => serviceGroups);
}

export function getServiceGroupsById(id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(id)
  };

  return Fetch(ServiceGroupsAPi, requestOptions).then(handleResponse);
}

export function updateServiceGroup(data, id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "PATCH",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  return fetch(ServiceGroupsAPi + `${id}/`, requestOptions).then(
    handleResponse
  );
}

// prefixed function name with underscore because delete is a reserved word in javascript
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

  return Fetch(ServiceGroupsAPi + `${id}/`, requestOptions).then(
    handleResponse
  );
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
