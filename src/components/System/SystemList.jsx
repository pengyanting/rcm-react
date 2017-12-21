import React from 'react';
import { Table, message, Popconfirm, Tag } from 'antd'

class SystemList extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = (current) => {
      this.props.dispatch({
        type: 'system/query',
        payload: {
          current: current,
          name: this.props.searchForm.name,
          code: this.props.searchForm.code,
        },
      });
    }
    this.del = (id) => {
      this.props.dispatch({
        type: 'system/del',
        payload: {
          id: id
        }
      })
    },
    this.handleChangeStatus = (id, state) => {
      this.props.dispatch({
        type: 'system/changeStatus',
        payload: {
          id: id + '',
          enabled: state === 'true' ? 'false' : 'true',
        }
      })
    }
  }
  render() {
    const columns = [{
      title: '系统名称',
      dataIndex: 'name'
    }, {
      title: '系统代码',
      dataIndex: 'code'
    }, {
      title: '启用状态',
      dataIndex: 'enabled',
      render: (text, record) => (
        <Tag color={record.enabled ==='true' ? 'green' : 'red'}>{record.enabled === 'true' ? '启用' : '禁用'}</Tag>
      ),
    }, {
      title: '备注',
      dataIndex: 'remark',
    }, {
      title: '操作',
      render: (tetx, record) => (
        <p>
          <Popconfirm
            title="确定要删除吗？"
            onConfirm={() => { this.del(record.id) }}>
            <a style={{marginRight: '10px'}}>删除</a>
          </Popconfirm>
          <Popconfirm
            title={record.enabled ==='true'?'确定要禁用吗？':'确定要启用吗？'}
            onConfirm={() => { this.handleChangeStatus(record.id, record.enabled) }}>
            <a>{record.enabled === 'false' ? '启用' : '禁用'}</a>
          </Popconfirm>
        </p>
      )
    }];
    const { list, total, current, loading } = this.props
    function showTotal(total) {
      return `Total ${total} items`;
    }
    const pagination = {
      total,
      current,
      pageSize: 10,
      onChange: this.onChange,
      showTotal: showTotal,
    }
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        let ids = [];
        selectedRows.forEach((item) => {
          ids.push(item.id)
        })
        this.props.dispatch({
          type: 'system/getSelection',
          payload: {
            selectId: ids.join(','),
          }
        })
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
      }),
    };
    return (
      <Table
        columns={columns}
        dataSource = { list }
        loading = { loading }
        pagination = { pagination }
        rowKey = {(record) => record.id }
        rowSelection={rowSelection}
      />
    );
  }
}

export default SystemList;