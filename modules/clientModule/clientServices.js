import Router from "next/router";
import Fetch from "isomorphic-unfetch";
import Cookies from "js-cookie";
import { ClientAPi } from "../../Config";

export function createClient(data) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  return Fetch(ClientAPi, requestOptions)
    .then(handleResponse)
    .then(client => client);
}

export function getAllClients() {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    }
  };

  return Fetch(ClientAPi, requestOptions)
    .then(handleResponse)
    .then(clients => clients);
}

export function getClientById(id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    }
  };

  return Fetch(ClientAPi + `${id}/`, requestOptions).then(handleResponse);
}

export function activateClient(id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    }
  };

  return Fetch(ClientAPi + `${id}/activate/`, requestOptions)
    .then(handleResponse)
    .then(client => client);
}

export function deactivateClient(id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  return Fetch(ClientAPi + `${id}/deactivate/`, requestOptions)
    .then(handleResponse)
    .then(client => client);
}

export function addPetToClient(data, id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  return Fetch(ClientAPi + `${id}/pets/`, requestOptions)
    .then(handleResponse)
    .then(client => client);
}

export function getPetById(id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    }
  };

  return Fetch(ClientAPi + `${id}/pets/`, requestOptions)
    .then(handleResponse)
    .then(client => client);
}

export function updateClient(data, id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "PATCH",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  return fetch(ClientAPi + `${id}/`, requestOptions).then(handleResponse);
}

export function _deleteClient(id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(id)
  };

  return Fetch(ClientAPi + `${id}/`, requestOptions).then(handleResponse);
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
