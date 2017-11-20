import React, { PropTypes } from 'react';
import { connect } from 'dva';
import RoleList from '../components/Role/RoleList';

function Role({ location, dispatch, role }) {
  const RoleListProps = {};
  return (
    <div>
      <RoleList {...RoleListProps}/>
    </div>
  );
}

Role.propTypes = {
  role: PropTypes.object,
}

function mapStateToProps({ role }) {
  return { role };
}

export default connect(mapStateToProps)(Role);