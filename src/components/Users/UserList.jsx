import React from 'react';
import { Table, message, Popconfirm } from 'antd';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.doAdd = () => {
      this.props.dispatch({
        type: 'users/showModal',
      });
    };
  }
  render() {
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="#">{text}</a>,
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '操作',
      key: 'operation',
      render: () => (
        <p>
          <a onClick={() => { this.doAdd(); }}>编辑</a>
          &nbsp;
          <Popconfirm title="确定要删除吗？" onConfirm={() => {}}>
            <a>删除</a>
          </Popconfirm>
        </p>
      ),
    }];
    // 定义分页对象
    const pagination = {
      total,
      current,
      pageSize: 10,
      onChange: () => {},
    };
    const { total, current, loading, dataSource } = this.props;
    return (
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          pagination={pagination}
        />
      </div>
    );
  }
}
export default UserList;
