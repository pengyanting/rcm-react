// request 是我们封装的一个网络请求库
import qs from 'qs';
import request from '../utils/request';

export async function query(params) {
  return request(`/api/users?${qs.stringify(params)}`);
}
