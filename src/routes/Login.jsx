import React, { PropTypes } from 'react';
import { connect } from 'dva';
import LoginFiled from '../components/Login/Login';

function Login({ location, dispatch, login }) {
  const LoginProps = {
    dispatch,
  };
  return (
    <div>
      <LoginFiled {...LoginProps} />
    </div>
  );
}

Login.propTypes = {
  login: PropTypes.object,
};
// 指定订阅数据关联login
function mapStateToProps({ login }) {
  return { login };
}
// 建立数据关联关系
export default connect(mapStateToProps)(Login);
