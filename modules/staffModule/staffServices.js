import Router from "next/router";
import Fetch from "isomorphic-unfetch";
import Cookies from "js-cookie";
import { StaffAPI } from "../../Config";

export function createStaff(data) {
  var auth = "Token " + JSON.parse(Cookies.get("token"));
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  return Fetch(StaffAPI, requestOptions)
    .then(handleResponse)
    .then(staff => staff);
}

export function getAllStaffs() {
  var auth = "Token " + JSON.parse(Cookies.get("token"));
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    }
  };

  return Fetch(StaffAPI, requestOptions)
    .then(handleResponse)
    .then(staffs => staffs);
}

export function getStaffsById(id) {
  var auth = "Token " + JSON.parse(Cookies.get("token"));
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(id)
  };

  return Fetch(StaffAPI, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
export function _delete(id) {
  var auth = "Token " + JSON.parse(Cookies.get("token"));
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: auth,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(id)
  };

  return Fetch(StaffAPI, requestOptions).then(handleResponse);
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
