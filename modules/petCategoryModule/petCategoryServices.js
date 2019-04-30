import Router from "next/router";
import Fetch from "isomorphic-unfetch";
import Cookies from "js-cookie";
import { PetCategoriesAPI } from "../../Config";

export function createPetCategory(data) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  return Fetch(PetCategoriesAPI, requestOptions)
    .then(handleResponse)
    .then(petCategory => petCategory);
}

export function getAllPetsCategory() {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    }
  };

  return Fetch(PetCategoriesAPI, requestOptions)
    .then(handleResponse)
    .then(petsCategory => petsCategory);
}

export function getPetCategoryById(id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    }
  };

  return Fetch(PetCategoriesAPI + `${id}/`, requestOptions).then(
    handleResponse
  );
}

export function activatePetCategory(id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    }
  };

  return Fetch(PetCategoriesAPI + `${id}/activate/`, requestOptions)
    .then(handleResponse)
    .then(petCategory => petCategory);
}

export function deactivatePetCategory(id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    }
  };

  return Fetch(PetCategoriesAPI + `${id}/deactivate/`, requestOptions)
    .then(handleResponse)
    .then(petCategory => petCategory);
}

export function _deletePetCategory(id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(id)
  };

  return Fetch(PetCategoriesAPI + `${id}/`, requestOptions).then(
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
        Router.push("/login");
      }
      const error = data || data.message || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}
