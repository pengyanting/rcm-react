import React from 'react';
import { Modal, Form, Input, Icon, Row, Col, Select, DatePicker } from 'antd';
import Moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;

class UserMadol extends React.Component {
  constructor(props) {
    super(props);
    this.handleOk = () => {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          let type = 'users/create';
          if (this.props.modalType === 'create') {
            type = 'users/create';
          } else if (this.props.modalType === 'update') {
            type = 'users/update';
            values.id = this.props.formValue.id;
          }
          values.enabled = values.enabled === 'true' ? true : false;
          this.props.dispatch({
            type: type,
            payload: values
          });
        }
      });
    };
    this.handleCancel = () => {
      this.props.dispatch({
        type: 'users/hideModal',
      });
    };
    this.checkPwd = (rule, value, callback) => {
      const password = this.props.form.getFieldValue('password');
      if (value && value !== password) {
        callback('两次输入的密码不一致！');
      } else {
        callback();
      }
    }
  }
  componentWillMount () {
  }
  componentWillReceiveProps (nextprops) {
    if (this.props.formValue === nextprops.formValue) {
      return;
    }
    if (nextprops.modalType === 'update') {
      this.props.form.setFields({
        loginName: {
          value: nextprops.formValue.loginName,
        },
        realName: {
          value: nextprops.formValue.realName,
        },
        mobileNumber: {
          value: nextprops.formValue.mobileNumber,
        },
        enabled: {
          value: nextprops.formValue.enabled + '',
        },
        gender: {
          value: nextprops.formValue.gender,
        },
        email: {
          value: nextprops.formValue.email,
        },
        componeyNumber: {
          value: nextprops.formValue.componeyNumber,
        },
        birthday: {
          value: Moment(nextprops.formValue.birthday),
        },
      });
    } else {
      this.props.form.resetFields();
    }
  }
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const { getFieldDecorator } = this.props.form;
    const { modalType } = this.props;
    return (
      <Modal
        title="添加用户"
        width={700}
        visible={this.props.modalVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="登录名"
                hasFeedback
              >
                {getFieldDecorator('loginName', {
                  rules: [{ required: true, message: '请输入登录名!' }],
                })(
                  <Input placeholder="登录名" />,
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="手机号码"
                hasFeedback
              >
                {getFieldDecorator('mobileNumber', {
                  rules: [{ required: true, message: '请输入手机号码!' }],
                })(
                  <Input disabled={ modalType==='create' ? false : true } placeholder="手机号码" />,
                )}
              </FormItem>
              {modalType==='create' ? (<FormItem
                {...formItemLayout}
                label="密码"
                hasFeedback
              >
                {getFieldDecorator('password', {
                  rules: [{ required: modalType==='create' ? true : false, message: '请输入密码!' }],
                })(
                  <Input placeholder="密码" type='password' />,
                )}
              </FormItem>) : null}
              <FormItem
                {...formItemLayout}
                label="性别"
                hasFeedback
              >
                {getFieldDecorator('gender', {
                  initialValue: 'N'
                })(
                  <Select>
                     <Option value='N'>未知</Option>
                     <Option value='M'>男</Option>
                     <Option value='F'>女</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="生日"
                hasFeedback
              >
                {getFieldDecorator('birthday', {
                })(
                  <DatePicker style={{width: '100%'}} allowClear/>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label="真实姓名"
                hasFeedback
              >
                {getFieldDecorator('realName', {
                  rules: [{ required: true, message: '请输入真实姓名!' }],
                })(
                  <Input placeholder="真实姓名" />,
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="状态"
                hasFeedback
              >
                {getFieldDecorator('enabled', {
                  initialValue: 'true',
                  rules: [{ required: true, message: '请选择一个状态!' }],
                })(
                  <Select>
                    <Option value='true'>启用</Option>
                    <Option value='false'>禁用</Option>
                  </Select>
                )}
              </FormItem>
              {modalType==='create' ? (<FormItem
                {...formItemLayout}
                label="确认密码"
                hasFeedback
              >
                {getFieldDecorator('confirmPassword', {
                  rules: [{
                    required: modalType==='create' ? true : false, message: '请再次输入密码!'
                  }, {
                    validator: modalType==='create' ? this.checkPwd : null
                  }],
                })(
                  <Input placeholder="确认密码" type='password'/>,
                )}
              </FormItem>) : null}
              <FormItem
                {...formItemLayout}
                label="公司电话"
                hasFeedback
              >
                {getFieldDecorator('componeyNumber', {
                })(
                  <Input placeholder="公司电话" />,
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="邮箱"
                hasFeedback
              >
                {getFieldDecorator('email', {
                  rules: [{ type: 'email', message: '请输入正确的邮箱格式!' }],
                })(
                  <Input placeholder="邮箱" />,
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
export default Form.create()(UserMadol);
