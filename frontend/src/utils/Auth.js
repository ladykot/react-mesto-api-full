import { BASE_URL } from "./constants";

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// взять данные пользователя по токену для вставки в header
export const getContent = (token) => {
  // const token = localStorage.getItem('jwt');
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
};

export const authorize = (email, password, token) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      // прилетает token
      if (data) {
        localStorage.setItem('jwt', data.token);
        return data;
      } else {
        return;
      }
    })
    .catch((err) => console.log(err));
};
