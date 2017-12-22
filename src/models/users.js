
// import { hashHistory } from 'dva/router';
import { message } from 'antd';
// 处理异步请求
import { query, add, update, del, changeStatus } from '../services/users';
import tool from '../utils/tool.js';

export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
    loading: false, // 控制加载状态
    modalVisible: false, // 弹出窗的显示状态
    modalType: 'create', // 弹出窗的类型（添加用户，编辑用户）
    formValue: {},
    searchForm: {
      loginName: '',
      realName: '',
      mobileNumber: '',
      current: 1,
    },
    selectId: '',
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/users' || location.pathname === '/') {
          dispatch({
            type: 'query',
            payload: {
              loginName: '',
              realName: '',
              mobileNumber: '',
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
        yield put({
          type: 'querySuccess',
          payload: {
            dataSource: tool.formatData(data.data),
            total: data.page.total,
            searchForm: payload,
          },
        });
      }
    },
    *create({ payload }, { call, put, select }) {
      const { data } = yield call(add, payload);
      const searchForm = yield select(state => state.users.searchForm);
      if (data) {
        yield put({ type: 'query', payload: searchForm });
        yield put({ type: 'hideModal' });
        message.success('添加成功');
      } else {
        message.error('添加失败');
      }
    },
    *del({ payload }, { call, put, select }) {
      const { data } = yield call(del, payload);
      const searchForm = yield select(state => state.user.searchForm);
      if (data) {
        yield put({ type: 'query', payload: searchForm });
      }
    },
    *update({ payload }, { call, put, select }) {
      const { data } = yield call(update, payload);
      const searchForm = yield select(state => state.users.searchForm);
      if (data) {
        yield put({ type: 'query', payload: searchForm });
        yield put({ type: 'hideModal' });
      }
    },
    *changeState({ payload }, { call, put, select }) {
      const { data } = yield call(changeStatus, payload);
      const searchForm = yield select(state => state.users.searchForm);
      if (data) {
        yield put({ type: 'query', payload: searchForm });
        message.success(`${payload.enabled ? '启用' : '禁用'}成功`);
      } else {
        message.error(`${payload.enabled ? '启用' : '禁用'}失败`);
      }
    },
  },
  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    }, // 控制加载状态的 reducer
    showModal(state, action) {
      return {
        ...state,
        modalVisible: true,
        formValue: action.payload.record,
        modalType: action.payload.modalType,
      };
    }, // 控制 Modal 显示状态的 reducer
    hideModal(state) {
      return { ...state, modalVisible: false };
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    getSelection(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
