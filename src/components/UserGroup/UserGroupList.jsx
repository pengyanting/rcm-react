import React from 'react';
import { Table, Tag, Popconfirm } from 'antd';
class UserGroupList extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = (value) => {
      this.props.dispatch({
        type: 'userGroup/query',
        payload: {
          current: value,
        },
      });
    }
  }
  render() {
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
    }, {
      title: '',
      render: (text, record) => (
        <p>
          <a onClick={() => { this.doAdd(record); }}>编辑</a>
          &nbsp;
          <Popconfirm title="确定要删除吗？" onConfirm={() => { this.del(record.id) }}>
            <a>删除</a>
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

export default UserGroupList;