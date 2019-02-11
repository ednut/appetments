import Router from "next/router";
import Fetch from "isomorphic-unfetch";
import Cookies from "js-cookie";
import { ProductsAPi, ProductCategoriesAPi } from "../../Config";

export function createProductCategory(data) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  return Fetch(ProductCategoriesAPi, requestOptions)
    .then(handleResponse)
    .then(productCategory => productCategory);
}

export function createProduct(data) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  return Fetch(ProductsAPi, requestOptions)
    .then(handleResponse)
    .then(product => product);
}

export function getAllProduct() {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    }
  };

  return Fetch(ProductsAPi, requestOptions)
    .then(handleResponse)
    .then(products => products);
}

export function getAllProductCategories() {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    }
  };

  return Fetch(ProductCategoriesAPi, requestOptions)
    .then(handleResponse)
    .then(productCategories => productCategories);
}

export function getProductById(id) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(id)
  };

  return Fetch(ProductsAPi, requestOptions).then(handleResponse);
}

export function updateProduct(data) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  return fetch(ProductsAPi, requestOptions).then(handleResponse);
}

export function updateProductCategory(data) {
  var auth = "Token " + Cookies.get("token");
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  return fetch(ProductCategoriesAPi, requestOptions).then(handleResponse);
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

  return Fetch(ProductsAPi, requestOptions).then(handleResponse);
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
