// import qs from 'qs';
import request from '../utils/request';

export async function userLogin(params) {
  return request('/api/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}
