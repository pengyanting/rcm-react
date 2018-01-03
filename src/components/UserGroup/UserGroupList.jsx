import React from 'react';
import { Table, Tag, Popconfirm } from 'antd';
class UserGroupList extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = (value) => {
      this.props.dispatch({
        type: 'userGroup/child',
        payload: {
          current: value,
          id: this.props.parentId,
        },
      });
    }
    this.del = (id) => {
      this.props.dispatch({ type: 'userGroup/del', payload: { id: id + ''} });
    }
    this.changeStatus = (record) => {
      this.props.dispatch({
        type: 'userGroup/changeState',
        payload: {
          id: record.id + '',
          enabled: !record.enabled,
        },
      });
    }
    this.doAdd = (record) => {
      this.props.dispatch({
        type: 'userGroup/showAddModal',
        payload: {
          formValue: record,
          modalType: 'update',
        },
      })
    }
  }
  render() {
    const typeText = function(type) {
      if (type === 'ORGANIZATION') {
        return (<p>组织</p>);
      } else if (type === 'USERGROUP') {
        return (<p>机构</p>);
      } else if (type === 'POSITION') {
        return (<p>岗位</p>);
      }
    }
    const columns = [{
      title: '状态',
      dataIndex: 'enabled',
      render: (text, record) => (
        <Tag color={record.enabled ? 'green' : 'red'}>{record.enabled ? '启用' : '禁用'}</Tag>
      ),
    }, {
      title: '机构名',
      dataIndex: 'name',
    }, {
      title: '代码',
      dataIndex: 'code',
    }, {
      title: '组织类型',
      dataIndex: 'type',
      render: (text, record) => typeText(record.type)
    }, {
      title: '备注',
      dataIndex: 'remark',
    }, {
      title: '',
      render: (text, record) => (
        <p>
          <a onClick={() => { this.doAdd(record); }}>编辑</a>
          &nbsp;
          <Popconfirm title="确定要删除吗？" onConfirm={() => { this.del(record.id) }}>
            <a>删除</a>
          </Popconfirm>
          &nbsp;
          <Popconfirm
            title={`确定要${record.enabled ? '禁用' : '启用'}吗?`}
            onConfirm={() => { this.changeStatus(record) }}>
            <a>{record.enabled ? '禁用' : '启用'}</a>
          </Popconfirm>
        </p>
      ),
    }]
    const { dataSource, loading, total, current } = this.props;
    const pagination = {
      total,
      current,
      pageSize: 10,
      onChange: this.onChange,
    };
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        let ids = [];
        selectedRows.forEach((item) => {
          ids.push(item.id)
        })
        this.props.dispatch({
          type: 'userGroup/getSelection',
          payload: {
            selectId: ids.join(','),
          }
        })
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
      }),
    }
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

export default UserGroupList;