import React, { PropTypes } from 'react';
import { connect } from 'dva';
import SystemList from '../components/System/SystemList';

function System({ location, dispatch, system }) {
  const SystemListProps = {};
  return (
    <div>
      <SystemList {...SystemListProps} />
    </div>
  );
}

System.propTypes = {
  system: PropTypes.object,
};

function mapStateToProps({ system }) {
  return { system };
}

export default connect(mapStateToProps)(System);