import React,{ PropTypes } from 'react';
import { connect } from 'dva';
import PrivilegeList from '../components/Privilege/PrivilegeList';

function Privilege({ location, dispatch, privilege }) {
  const PrivilegeListProps = {};
  return (
    <div>
      <PrivilegeList {...PrivilegeListProps} />
    </div>
  );
}

Privilege.propTypes = {
  privilege: PropTypes.object,
};

function mapStateToProps({ privilege }) {
  return { privilege };
}

export default connect(mapStateToProps)(Privilege);
