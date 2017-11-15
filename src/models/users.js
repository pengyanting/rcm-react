
// import { hashHistory } from 'dva/router';

// 处理异步请求
import { query, add, update, del } from '../services/users';
import tool from '../utils/tool.js';

export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
    loading: false, // 控制加载状态
    current: null, // 当前分页信息
    currentItem: {}, // 当前操作的用户对象
    modalVisible: false, // 弹出窗的显示状态
    modalType: 'create', // 弹出窗的类型（添加用户，编辑用户）
    formValue: {},
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/users') {
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
        yield put({
          type: 'querySuccess',
          payload: {
            dataSource: tool.formatData(data.data),
            total: data.page.total,
            current: data.page.current,
          },
        });
      }
    },
    *create({ payload }, { call, put }) {
      const { data } = yield call(add, payload);
      if (data) {
        yield put({
          type: 'createSuccess',
          payload: {},
        });
      }
    },
    *del({ payload }, { call, put }) {
      const { data } = yield call(del, payload);
      if (data) {
        yield put({
          type: 'deleteSuccess',
          payload: {
            dataSource: tool.formatData(data.data),
            total: data.page.total,
            current: data.page.current,
          },
        });
      }
    },
    *update({ payload }, { call, put }) {
      const { data } = yield call(update, payload);
      if (data) {
        yield put({
          type: 'updateSuccess',
          payload: {
            dataSource: tool.formatData(data.data),
            total: data.page.total,
            current: data.page.current,
          },
        });
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
    createSuccess(state) {
      return { ...state, modalVisible: false };
    },
    deleteSuccess(state, action) {
      return { ...state, ...action.payload };
    },
    updateSuccess(state, action) {
      return { ...state, ...action.payload, modalVisible: false };
    },
  },
};
