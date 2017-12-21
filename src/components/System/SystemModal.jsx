import React from 'react';
import { Button, Modal, Form, Input, Select } from 'antd'

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

class SystemModal extends React.Component {
  constructor (props) {
    super(props);
    this.handleOk = () => {
      this.props.form.validateFields((error, values) => {
        console.log(values)
        if(!error){
          this.props.dispatch({
            type: 'system/create',
            payload: values
          })
        }
      })
    }
    this.handleCancel = () => {
      this.props.dispatch({
        type: 'system/hideModal'
      })
    }
  }
  render () {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout ={
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    }
    return (
      <div>
        <Modal
          title="添加系统"
          visible={this.props.showModal} 
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="系统名称"
              hasFeedback
            >
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入系统名称' }],
              })(
                <Input placeholder="" />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="系统代码"
              hasFeedback
            >
              {getFieldDecorator('code', {
                rules: [{ required: true, message: '请输入系统代码' }]
              })(
                <Input placeholder="" />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="状态"
              hasFeedback
            >
              {getFieldDecorator('enabled', {
                initialValue: 'true',
                rules: [{ required: true, message: '请选择系统状态' }]
              })(
                <Select style={{width: '100%'}}>
                  <Option value='true'>启用</Option>
                  <Option value='false'>禁用</Option>
                </Select>,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="备注"
              hasFeedback
            >
              {getFieldDecorator('remark', {
              })(
                <TextArea rows={4} />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(SystemModal);