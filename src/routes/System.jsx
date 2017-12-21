import React, { PropTypes } from 'react';
import { connect } from 'dva';
import SystemList from '../components/System/SystemList';
import SystemSearch from '../components/System/SystemSearch';
import SystemModal from '../components/System/SystemModal';

function System({ location, dispatch, system }) {
  const { total, list, searchForm, loading, showModal, selectId } = system;
  const { current, name, code } = searchForm
  const SystemListProps = {
    total,
    current,
    loading,
    list,
    searchForm,
    dispatch,
  };
  const SystemSearchProps = {
    dispatch,
    selectId,
    searchForm,
  }
  const SystemModalProps = {
    dispatch,
    showModal,
  }
  return (
    <div>
      <SystemSearch {...SystemSearchProps} />
      <SystemList {...SystemListProps} />
      <SystemModal {...SystemModalProps} />
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