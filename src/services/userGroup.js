import qs from 'qs';
import request from '../utils/request';

export async function queryList() {
  return request('/api/userGroup/queryList?');
}

export async function detail(params) {
  return request(`/api/userGroup/detail?${qs.stringify(params)}`);
}

export async function child(params) {
  return request(`/api/userGroup/child?${qs.stringify(params)}`);
}

export async function del(params) {
  return request(`/api/userGroup/del?${qs.stringify(params)}`);
}

export async function changeStatus(params) {
  return request('/api/userGroup/changeStatus', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}

export async function createGroup(params) {
  return request('/api/userGroup/add', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}

export async function updateGroup(params) {
  return request('/api/userGroup/update', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}
