import React, { PropTypes } from 'react';
import { connect } from 'dva';
import UserGroupList from '../components/UserGroup/UserGroupList';
import UserGroupSearch from '../components/UserGroup/UserGroupSearch';
import AddMadol from '../components/UserGroup/AddModal';

function UserGroup({ location, dispatch, userGroup }) {
  const {
    dataSource,
    total,
    current,
    loading,
    groupList,
    parentId,
    selectId,
    addModalShow,
    modalType,
    formValue,
  } = userGroup;
  const UserGroupListProps = {
    dispatch,
    dataSource,
    total,
    current,
    loading,
    parentId,
    addModalShow,
  };
  const UserGroupSearchProps = {
    dispatch,
    groupList,
    current,
    selectId,
  }
  const AddMadolProps = {
    dispatch,
    addModalShow,
    modalType,
    formValue,
    parentId,
  }
  return (
    <div>
      <UserGroupSearch {...UserGroupSearchProps} />
      <UserGroupList {...UserGroupListProps} />
      <AddMadol {...AddMadolProps} />
    </div>
  );
}

UserGroup.propTypes = {
  userGroup: PropTypes.object,
};
// 指定订阅数据关联userGroup
function mapStateToProps({ userGroup }) {
  return { userGroup };
}
// 建立数据关联关系
export default connect(mapStateToProps)(UserGroup);
