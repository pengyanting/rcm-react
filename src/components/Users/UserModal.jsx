import React from 'react';
import { Modal, Form, Input, Icon } from 'antd';

const FormItem = Form.Item;

class UserMadol extends React.Component {
  constructor(props) {
    super(props);
    this.handleOk = () => {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          let type = 'create';
          if (this.props.modalType === 'create') {
            type = 'users/create';
          } else if (this.props.modalType === 'update') {
            type = 'users/update';
            values.id = this.props.formValue.id;
          }
          this.props.dispatch({
            type: type,
            payload: values
          });
          return
        }
      });
    };
    this.handleCancel = () => {
      this.props.dispatch({
        type: 'users/hideModal',
      });
    };
  }
  componentWillMount () {
  }
  componentWillReceiveProps (nextprops) {
    if (this.props.formValue === nextprops.formValue) {
      return;
    }
    this.props.form.setFields({
      userName: {
        value: nextprops.formValue.name,
      },
      age: {
        value: nextprops.formValue.age,
      },
      address: {
        value: nextprops.formValue.address,
      },
      id: {
        value: nextprops.formValue.id,
      },
    });
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
              rules: [{ required: true, message: 'Please input username!' }],
            })(
              <Input placeholder="Username" />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="年龄"
            hasFeedback
          >
            {getFieldDecorator('age', {
              rules: [{ required: true, message: 'Please input age!' }]
            })(
              <Input placeholder="Age" />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="住址"
            hasFeedback
          >
            {getFieldDecorator('address', {
              rules: [{ required: true, message: 'Please input address!' }]
            })(
              <Input placeholder="Address" />,
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
export default Form.create()(UserMadol);
