
// import { hashHistory } from 'dva/router';

// 处理异步请求
import { query } from '../services/users';

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
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/users') {
          dispatch({
            type: 'query',
            payload: {},
          });
        }
      });
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { data } = yield call(query);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            dataSource: data.data,
            total: data.page.total,
            current: data.page.current,
          },
        });
      }
    },
    *create() { console.log(1); },
    *del() { console.log(1); },
    *update() { console.log(1); },
  },
  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    }, // 控制加载状态的 reducer
    showModal(state) {
      return { ...state, modalVisible: true };
    }, // 控制 Modal 显示状态的 reducer
    hideModal(state) {
      return { ...state, modalVisible: false };
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    createSuccess() {},
    deleteSuccess() {},
    updateSuccess() {},
  },
};
