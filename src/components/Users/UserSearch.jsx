import React from 'react';
import { Button, Form, Icon, Input, Row, Col } from 'antd';

import * as styles from './userSearch.less';

class UserSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibel: this.props.modalVisible,
    };
    this.onAdd = () => {
      this.props.dispatch({
        type: 'users/showModal',
        payload: {},
      });
    };
  }
  render() {
    // Only show error after a field is touched.
    return (
      <Row className={styles.normal}>
        <Col span={8}>
          <Button type="ghost" onClick={this.onAdd}>添加</Button>
        </Col>
        <Col span={8} offset={8} className={styles.search}>
          <Input />&nbsp;&nbsp;
          <Button type="ghost" onClick={this.onAdd}>搜索</Button>
        </Col>
      </Row>
    );
  }
}

export default UserSearch;

