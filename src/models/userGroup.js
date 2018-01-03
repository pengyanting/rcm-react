// import { hashHistory } from 'dva/router';
// import { routerRedux } from 'dva/router';
import {
  queryList,
  detail,
  child,
  del,
  changeStatus,
  createGroup,
  updateGroup,
} from '../services/userGroup';
import tool from '../utils/tool.js';

export default {
  namespace: 'userGroup',
  state: {
    loading: false,
    dataSource: [],
    groupList: [],
    total: 0,
    current: 1,
    parentId: null,
    listType: 'detail',
    selectId: '',
    addModalShow: false,
    modalType: 'create',
    formValue: {},
  },
  subscriptions: {
    setUp({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/userGroup') {
          dispatch({ type: 'query' });
        }
      });
    },
  },
  effects: {
    *query({ payload }, { call, put }) {
      const { data } = yield call(queryList);
      if (data) {
        if (data.success) {
          yield put({
            type: 'querySuccess',
            payload: {
              groupList: tool.getTreeDataLevel3(data.data),
            },
          });
        }
      }
    },
    *getDetail({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { data } = yield call(detail, payload);
      if (data) {
        yield put({
          type: 'getDataSuccess',
          payload: {
            dataSource: tool.formatData(data.data),
            total: data.page.total,
            parentId: payload.id,
            listType: 'detail',
          },
        });
      }
    },
    *getChild({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
      const { data } = yield call(child, payload);
      if (data) {
        yield put({
          type: 'getDataSuccess',
          payload: {
            dataSource: tool.formatData(data.data),
            total: data.page.total,
            current: data.page.current,
            listType: 'child',
          },
        });
      }
    },
    *del({ payload }, { call, put }) {
      const { data } = yield call(del, payload);
      if (data) {
        yield put({ type: 'updateList' });
      }
    },
    *changeState({ payload }, { call, put }) {
      const { data } = yield call(changeStatus, payload);
      if (data) {
        yield put({ type: 'updateList' });
      }
    },
    *updateList({ payload }, { put, select }) {
      const listType = yield select(state => state.userGroup.listType);
      let types;
      let params;
      if (listType === 'detail') {
        types = 'getDetail';
        params = {
          id: yield select(state => state.userGroup.parentId),
        };
      } else if (listType === 'child') {
        types = 'getChild';
        params = {
          id: yield select(state => state.userGroup.parentId),
          current: yield select(state => state.userGroup.current),
        };
      }
      yield put({ type: types, payload: params });
    },
    *create({ payload }, { call, put }) {
      const { data } = yield call(createGroup, payload);
      if (data) {
        yield put({ type: 'updateList' });
        yield put({ type: 'hideAddModal' });
      }
    },
    *update({ payload }, { call, put }) {
      const { data } = yield call(updateGroup, payload);
      if (data) {
        yield put({ type: 'updateList' });
        yield put({ type: 'hideAddModal' });
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
      return { ...state, ...action.payload };
    },
    getDataSuccess(state, action) {
      return { ...state, ...action.payload, loading: false };
    },
    getSelection(state, action) {
      return { ...state, ...action.payload };
    },
    showAddModal(state, action) {
      return {
        ...state,
        addModalShow: true,
        modalType: action.payload.modalType,
        formValue: action.payload.formValue,
      };
    },
    hideAddModal(state) {
      return { ...state, addModalShow: false, formValue: {} };
    },
  },
};
