import React,{ PropTypes } from 'react';
import { connect } from 'dva';
import MenuList from '../components/Menu/MenuList';

function Menu({ location, dispatch, menu }) {
  const MenuListProps = {};
  return (
    <div>
      <MenuList {...MenuListProps} />
    </div>
  );
}

Menu.propTypes = {
  menu: PropTypes.object,
};

function mapStateToProps({ menu }) {
  return { menu };
}

export default connect(mapStateToProps)(Menu);