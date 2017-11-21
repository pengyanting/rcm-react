import qs from 'qs';
import request from '../utils/request';

export async function query(params) {
  return request(`/api/userGroup/query?${qs.stringify(params)}`);
}
