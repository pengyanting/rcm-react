import React from 'react';
import { Table, message, Popconfirm, Tag } from 'antd';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.doAdd = (record) => {
      this.props.dispatch({
        type: 'users/showModal',
        payload: {
          record: record,
          modalType: 'update',
        },
      });
    };
    this.onChange = (current) => {
      this.props.dispatch({
        type: 'users/query',
        payload: {
          current: current,
        },
      })
    };
    this.del = (id) => {
      this.props.dispatch({
        type: 'users/del',
        payload: {
          id: id,
        },
      });
    };
  }
  render() {
    const columns = [{
      title: '登录名',
      dataIndex: 'loginName',
    }, {
      title: '真实姓名',
      dataIndex: 'realName',
    }, {
      title: '性别',
      dataIndex: 'gender',
    }, {
      title: '手机号码',
      dataIndex: 'mobileNumber',
    }, {
      title: '邮箱',
      dataIndex: 'email',
    }, {
      title: '状态',
      dataIndex: 'enabled',
      render: (text, record) => (
        <Tag color={record.enabled ? 'green' : 'red'}>{record.enabled ? '启用' : '禁用'}</Tag>
      ),
    }, {
      title: '操作',
      render: (text, record) => (
        <p>
          <a onClick={() => { this.doAdd(record); }}>编辑</a>
          &nbsp;
          <Popconfirm title="确定要删除吗？" onConfirm={() => { this.del(record.id) }}>
            <a>删除</a>
          </Popconfirm>
        </p>
      ),
    }];
    const { total, current, loading, dataSource } = this.props;
    // 定义分页对象
    const pagination = {
      total,
      current,
      pageSize: 10,
      onChange: this.onChange,
    };
    return (
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          pagination={pagination}
          rowKey={ record => record.id }
        />
      </div>
    );
  }
}
export default UserList;
