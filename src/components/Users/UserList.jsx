import React from 'react';
import { Table, message, Popconfirm } from 'antd';

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
      title: 'ID',
      dataIndex: 'id',
    }, {
      title: '姓名',
      dataIndex: 'name',
      render: text => <a href="#">{text}</a>,
    }, {
      title: '年龄',
      dataIndex: 'age',
    }, {
      title: '住址',
      dataIndex: 'address',
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
