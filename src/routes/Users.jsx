import React, { PropTypes } from 'react';
import { connect } from 'dva';
import UserList from '../components/Users/UserList';
import UserSearch from '../components/Users/UserSearch';
import UserModal from '../components/Users/UserModal';

function Users({ location, dispatch, users }) {
  const { total, current, loading, dataSource, modalVisible, modalType, formValue } = users;
  const UserListProps = {
    total,
    current,
    loading,
    dataSource,
    dispatch,
    modalType,
  };
  const UserSearchProps = {
    modalVisible,
    dispatch,
  };
  const UserModalProps = {
    modalVisible,
    dispatch,
    modalType,
    formValue,
  };
  return (
    <div>
      { /* 用户查询组件 */ }
      <UserSearch {...UserSearchProps} />
      {/* 用户列表 */}
      <UserList {...UserListProps} />
      {/* 添加修改弹框 */}
      <UserModal {...UserModalProps} />
    </div>
  );
}

Users.propTypes = {
  users: PropTypes.object,
};
// 指定订阅数据关联users
function mapStateToProps({ users }) {
  return { users };
}
// 建立数据关联关系
export default connect(mapStateToProps)(Users);
