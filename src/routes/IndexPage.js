import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './IndexPage.less';

const { Header, Sider, Content } = Layout;

class SiderLayout extends React.Component {
  state = {
    collapsed: false,
    text: '用户权限管理',
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      text: !this.state.collapsed ? '' : '用户权限管理',
    });
  }
  handleClick = ({ key }) => {
    this.props.dispatch(routerRedux.push(`/${key}`));
  }
  render() {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className={styles.logo} >{this.state.text}</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={this.handleClick}>
            <Menu.Item key="users">
              <Icon type="user" />
              <span>用户管理</span>
            </Menu.Item>
            <Menu.Item key="userGroup">
              <Icon type="usergroup-add" />
              <span>用户组</span>
            </Menu.Item>
            <Menu.Item key="role">
              <Icon type="solution" />
              <span>角色管理</span>
            </Menu.Item>
            <Menu.Item key="privilege">
              <Icon type="key" />
              <span>权限管理</span>
            </Menu.Item>
            <Menu.Item key="menu">
              <Icon type="menu-fold" />
              <span>菜单管理</span>
            </Menu.Item>
            <Menu.Item key="system">
              <Icon type="star" />
              <span>系统管理</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className={styles.trigger}
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ padding: 24, background: '#fff', minHeight: 280 }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

SiderLayout.propTypes = {};

export default connect(({ example }) => ({ example }))(SiderLayout);
