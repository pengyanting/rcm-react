
// import { hashHistory } from 'dva/router';
import { routerRedux } from 'dva/router';
import { userLogin } from '../services/login';

console.log(userLogin);
export default {
  namespace: 'login',
  state: {
    loginLoading: false,
  },
  subscriptions: {
  },
  effects: {
    *login({ payload }, { call, put }) {
      console.log(payload);
      const { data } = yield call(userLogin, payload);
      if (data) {
        if (data.success) {
          yield put(routerRedux.push('/users'));
        }
      }
    },
  },
  reducers: {
  },
};
