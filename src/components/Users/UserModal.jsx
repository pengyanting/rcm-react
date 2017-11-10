import React from 'react';
import { Modal, Form, Input, Icon } from 'antd';

const FormItem = Form.Item;

class UserMadol extends React.Component {
  constructor(props) {
    super(props);
    this.handleOk = () => {
      const value = this.props.form.getFieldsValue();
      console.log(value);
      this.props.form.validateFields((err, values) => {
        console.log(values);
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
      // this.props.dispatch({
      //   type: 'users/hideModal',
      // });
    };
    this.handleCancel = () => {
      this.props.dispatch({
        type: 'users/hideModal',
      });
    };
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
    return (
      <Modal
        title="添加用户"
        visible={this.props.modalVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="姓名"
            hasFeedback
          >
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="年龄"
            hasFeedback
          >
            {getFieldDecorator('age', {})(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="住址"
            hasFeedback
          >
            {getFieldDecorator('address', {})(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />,
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
export default Form.create()(UserMadol);
