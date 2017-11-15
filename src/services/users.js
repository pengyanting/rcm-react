// request 是我们封装的一个网络请求库
import qs from 'qs';
import request from '../utils/request';

export async function query(params) {
  return request(`/api/users?${qs.stringify(params)}`);
}
export async function add(params) {
  return request('/api/users/add', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}
export async function update(params) {
  return request('/api/users/update', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}
export async function del(params) {
  return request(`/api/users/del?${qs.stringify(params)}`);
}
