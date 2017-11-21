
// import { hashHistory } from 'dva/router';
// import { routerRedux } from 'dva/router';
import { query } from '../services/userGroup';
import tool from '../utils/tool.js';

export default {
  namespace: 'userGroup',
  state: {
    loading: false,
    dataSource: [],
    total: 0,
    current: 1,
  },
  subscriptions: {
    setUp({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/userGroup') {
          dispatch({
            type: 'query',
            payload: {
              current: 1,
            },
          });
        }
      });
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { data } = yield call(query, payload);
      if (data) {
        if (data.success) {
          yield put({
            type: 'querySuccess',
            payload: {
              dataSource: tool.formatData(data.data),
              total: data.page.total,
              current: data.page.current,
            },
          });
        }
      }
    },
  },
  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    hideLoading(state) {
      return { ...state, loading: false };
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
  },
};
