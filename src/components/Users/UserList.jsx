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
    this.handleChangeStatus = (record) => {
      this.props.dispatch({
        type: 'users/changeState',
        payload: {
          id: record.id,
          enabled: !record.enabled,
        }
      });
    }
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
      render: (text, record) => {
        let gender = '未知';
        if (record.gender === 'M') {
          gender = '男';
        } else if (record.gender === 'F') {
          gender = '女';
        } else {
          gender = '未知';
        }
        return (<p>{gender}</p>)
      }
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
          <a style={{marginRight: '10px'}} onClick={() => { this.doAdd(record); }}>编辑</a>
          <a onClick={() => { this.handleChangeStatus(record); }}>{record.enabled?'禁用':'启用'}</a>
          &nbsp;
        </p>
      ),
    }];
    const { total, current, loading, dataSource } = this.props;
    // 定义分页对象
    function showTotal(total) {
      return `Total ${total} items`;
    }
    const pagination = {
      total,
      current,
      pageSize: 10,
      onChange: this.onChange,
      showTotal: showTotal
    };
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        let ids = [];
        selectedRows.forEach((item) => {
          ids.push(item.id)
        })
        this.props.dispatch({
          type: 'users/getSelection',
          payload: {
            selectId: ids.join(','),
          }
        })
      },
      getCheckboxProps: record => ({
        // defaultChecked: record.loginName === 'Larry Jackson',
      }),
    };
    return (
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          pagination={pagination}
          rowKey={ record => record.id }
          rowSelection = { rowSelection }
        />
      </div>
    );
  }
}
export default UserList;
