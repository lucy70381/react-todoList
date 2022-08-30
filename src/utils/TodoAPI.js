import { METHOD } from './constants';
import getRequest from './TodoAPIBase';

const apiUrl = 'https://todoo.5xcamp.us';

export const login = (body) => {
  const url = `${apiUrl}/users/sign_in`;
  return getRequest(url, METHOD.POST, {}, body, (response) => response);
};

export const logout = (auth) => {
  const url = `${apiUrl}/users/sign_out`;
  const header = { Authorization: auth };
  return getRequest(url, METHOD.DELETE, header);
};

export const register = (body) => {
  const url = `${apiUrl}/users`;
  return getRequest(url, METHOD.POST, {}, body);
};

export const getTodos = (auth) => {
  const url = `${apiUrl}/todos`;
  const header = { Authorization: auth };
  return getRequest(url, METHOD.GET, header);
};

export const addTodo = (auth, body) => {
  const url = `${apiUrl}/todos`;
  const header = { Authorization: auth };
  return getRequest(url, METHOD.POST, header, body);
};

export const toggleTodo = (auth, id) => {
  const url = `${apiUrl}/todos/${id}/toggle`;
  const header = { Authorization: auth };
  return getRequest(url, METHOD.PATCH, header);
};

export const deleteTodo = (auth, id) => {
  const url = `${apiUrl}/todos/${id}`;
  const header = { Authorization: auth };
  return getRequest(url, METHOD.DELETE, header);
};
