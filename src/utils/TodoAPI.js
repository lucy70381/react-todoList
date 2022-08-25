import * as TodoAPIBase from "./TodoAPIBase";

const apiUrl = 'https://todoo.5xcamp.us';


export const login = (body) => {
  let url = `${apiUrl}/users/sign_in`;
  return TodoAPIBase.getRequest(url, 'POST', {}, body);
}

export const register = (auth, body) => {
  let url = `${apiUrl}/users`;
  let header = { 'Authorization': `Bearer ${auth}` };
  return TodoAPIBase.getRequest(url, 'POST', header, body)
}