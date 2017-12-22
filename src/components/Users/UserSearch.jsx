import React from 'react';
import { Button, Form, Icon, Input, Row, Col, message } from 'antd';

const FormItem = Form.Item;

class UserSearch extends React.Component {
  constructor(props) {
    super(props);
    this.onAdd = () => {
      this.props.dispatch({
        type: 'users/showModal',
        payload: {
          modalType: 'create', 
          record: {},
        },
      });
    };
    this.handleSubmit = () => {
      const data = this.props.form.getFieldsValue();
      this.props.dispatch({
        type: 'users/query',
        payload: {
          loginName: data.loginName1,
          realName: data.realName1,
          mobileNumber: data.mobileNumber1,
          current: this.props.current,
        }
      })
    }
    this.handleChangeStatus = (state) => {
      if (!this.props.selectId) {
        message.warning('请至少选择一个要操作的用户！');
        return;
      }
      this.props.dispatch({
        type: 'users/changeState',
        payload: {
          id: this.props.selectId,
          enabled: state === 'true' ? true : false,
        }
      })
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{marginBottom:'20px'}}>
        <Form layout='inline'>
          <FormItem>
            {getFieldDecorator('loginName1', {
            })(
              <Input placeholder="登录名" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('realName1', {
            })(
              <Input placeholder="真实姓名" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('mobileNumber1', {
            })(
              <Input placeholder="手机号码" />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              onClick={this.handleSubmit}>
              search
            </Button>
          </FormItem>
        </Form>
        <div style={{margin: '10px 0 0'}}>
          <Button style={{marginRight: '10px'}} onClick={this.onAdd}>添加用户</Button>
          <Button style={{marginRight: '10px'}} onClick={()=>{this.handleChangeStatus('true')}} type="success">批量启用</Button>
          <Button style={{marginRight: '10px'}} onClick={()=>{this.handleChangeStatus('false')}}type="danger">批量禁用</Button>
        </div>
      </div>
    );
  }
}

export default Form.create()(UserSearch);

