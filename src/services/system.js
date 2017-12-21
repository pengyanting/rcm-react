import qs from 'qs';
import request from '../utils/request';

export async function query(params) {
  return request(`/api/systemList?${qs.stringify(params)}`);
}

export async function del(params) {
  return request(`/api/system/del?${qs.stringify(params)}`);
}

export async function create(params) {
  return request('/api/system/add', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}

export async function changeState(params) {
  return request('/api/system/changeStatus', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}
