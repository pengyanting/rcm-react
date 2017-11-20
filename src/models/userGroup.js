
// import { hashHistory } from 'dva/router';
import { routerRedux } from 'dva/router';
import { userLogin } from '../services/login';

export default {
  namespace: 'userGroup',
  state: {
    loginLoading: false,
  },
  subscriptions: {
  },
  effects: {
    *login({ payload }, { call, put }) {
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
