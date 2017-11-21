import React, { PropTypes } from 'react';
import { connect } from 'dva';
import UserGroupList from '../components/UserGroup/UserGroupList';

function UserGroup({ location, dispatch, userGroup }) {
  console.log(userGroup);
  const { dataSource, total, current, loading } = userGroup;
  const UserGroupListProps = {
    dispatch,
    dataSource,
    total,
    current,
    loading,
  };
  return (
    <div>
      <UserGroupList {...UserGroupListProps} />
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
