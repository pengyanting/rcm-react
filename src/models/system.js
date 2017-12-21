
// import { hashHistory } from 'dva/router';
// import { routerRedux } from 'dva/router';
import { query, del, create, changeState } from '../services/system';
import tool from '../utils/tool';

export default {
  namespace: 'system',
  state: {
    list: [],
    loading: false,
    total: null,
    showModal: false,
    searchForm: {
      name: '',
      code: '',
      current: 1,
    },
    selectId: '',
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/system') {
          dispatch({
            type: 'query',
            payload: {
              current: 1,
              name: '',
              code: '',
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
        yield put({
          type: 'querySuccess',
          payload: {
            list: tool.formatData(data.data),
            total: data.page.total,
            searchForm: payload,
          },
        });
      }
    },
    *del({ payload }, { call, put, select }) {
      const { data } = yield call(del, { id: payload.id });
      const searchForm = yield select(state => state.system.searchForm); // select用于从state里面获取数据
      if (data) {
        yield put({ type: 'query', payload: searchForm });
      }
    },
    *create({ payload }, { call, put, select }) {
      const { data } = yield call(create, payload);
      const searchForm = yield select(state => state.system.searchForm); // select用于从state里面获取数据
      if (data) {
        yield put({ type: 'query', payload: searchForm });
        yield put({ type: 'hideModal' });
      }
    },
    *changeStatus({ payload }, { call, put, select }) {
      const { data } = yield call(changeState, payload);
      const searchForm = yield select(state => state.system.searchForm); // select用于从state里面获取数据
      if (data) {
        yield put({ type: 'query', payload: searchForm });
      }
    },
  },
  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    showModal(state) {
      return { ...state, showModal: true };
    },
    hideModal(state) {
      return { ...state, showModal: false };
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    getSelection(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
