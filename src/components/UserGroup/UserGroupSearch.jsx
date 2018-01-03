import React from 'react';
import { Button, TreeSelect, Dropdown, Menu, message } from 'antd';

class UserGroupSearch extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: undefined,
    }
    this.onChange = (value) => {
      this.setState({ value });
      this.props.dispatch({
        type: 'userGroup/getDetail',
        payload: {
          id: parseInt(value.split('-')[1]),
        }
      })
    }
    this.handleClick = (e) => {
      if (e.key === 'detail') {
        this.props.dispatch({
          type: 'userGroup/getDetail',
          payload: {
            id: parseInt(this.state.value.split('-')[1]),
          }
        })
      } else if (e.key === 'child') {
        this.props.dispatch({
          type: 'userGroup/getChild',
          payload: {
            id: parseInt(this.state.value.split('-')[1]),
            current: this.props.current,
          }
        })
      } else if (e.key === 'new') {
        this.props.dispatch({
          type: 'userGroup/showAddModal',
          payload: {
            modalType: 'create',
          }
        });
      }
    }
    this.del = () => {
      if (!this.props.selectId) {
        message.warning('请至少选择一条要操作的数据');
        return;
      }
      this.props.dispatch({
        type: 'userGroup/del',
        payload: {
          id: this.props.selectId,
        },
      });
    }
    this.changeStatus = (status) => {
      if (!this.props.selectId) {
        message.warning('请至少选择一条要操作的数据');
        return;
      }
      this.props.dispatch({
        type: 'userGroup/changeState',
        payload: {
          id: this.props.selectId,
          enabled: status === 'true' ? true : false,
        }
      });
    }
  }
  render () {
    const { groupList } = this.props;
    const groupMenu = (
      <Menu onClick={(e) => {this.handleClick(e)}}>
        <Menu.Item key='detail'>本机构信息</Menu.Item>
        <Menu.Item key='child'>下属机构信息</Menu.Item>
        <Menu.Item key='new'>新建机构</Menu.Item>
    </Menu>
    );
    const userMenu = (
      <Menu  onClick={(e) => {this.handleClick(e)}}>
        <Menu.Item key='addUser'>添加用户</Menu.Item>
        <Menu.Item key='delUser'>删除用户</Menu.Item>
      </Menu>
    );
    return (
      <div style={{marginBottom: 20}}>
        <TreeSelect
          style={{ width: 300, marginBottom: 10 }}
          value={this.state.value}
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          treeData={groupList}
          placeholder="Please select"
          showSearch = {true}
          treeNodeFilterProp = 'label'
          onChange={this.onChange}
        />
        <div>
          <Dropdown overlay={groupMenu} placement="bottomLeft">
            <Button style={{marginRight: 10}}>组织机构管理</Button>
          </Dropdown>
          <Button style={{marginRight: 10}}>角色管理</Button>
          <Dropdown overlay={userMenu} placement="bottomLeft">
            <Button style={{marginRight: 10}}>用户管理</Button>
          </Dropdown>
          <Button style={{marginRight: 10}}>关联系统管理</Button>
          <Button onClick={this.del} style={{marginRight: 10}}>批量删除</Button>
          <Button onClick={()=> this.changeStatus('true')} style={{marginRight: 10}}>批量启用</Button>
          <Button onClick={()=> this.changeStatus('false')}>批量禁用</Button>
        </div>
      </div>
    );
  }
};

export default UserGroupSearch;