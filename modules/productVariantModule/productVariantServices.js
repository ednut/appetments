import Router from "next/router";
import Fetch from "isomorphic-unfetch";
import Cookies from "js-cookie";
import { ProductVariantAPi, ProductsAPi } from "../../Config";

export function createProductVariant(data, id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  return Fetch(ProductsAPi + `${id}/variants/`, requestOptions)
    .then(handleResponse)
    .then(variant => variant);
}

export function getAllProductVariants(id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    }
  };

  return Fetch(ProductsAPi + `${id}/variants/`, requestOptions)
    .then(handleResponse)
    .then(variants => variants);
}

export function getProductVariantsById(id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(id)
  };

  return Fetch(ProductVariantAPi + `${id}/`, requestOptions).then(
    handleResponse
  );
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

  return fetch(ProductVariantAPi + `${id}/`, requestOptions).then(
    handleResponse
  );
}

export function activateVariant(data, id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  return fetch(ProductVariantAPi + `${id}/activate/`, requestOptions).then(
    handleResponse
  );
}

export function deactivateVariant(data, id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  return fetch(ProductVariantAPi + `${id}/deactivate/`, requestOptions).then(
    handleResponse
  );
}

export function adjustInventory(data, id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  return fetch(
    ProductVariantAPi + `${id}/adjust_inventory/`,
    requestOptions
  ).then(handleResponse);
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

  return Fetch(ProductVariantAPi + `${id}/`, requestOptions).then(
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
