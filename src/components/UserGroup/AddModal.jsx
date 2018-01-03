import React from 'react';
import { Form, Input, Select, Button, Modal } from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleCancel = () => {
      this.props.dispatch({ type: 'userGroup/hideAddModal' });
    }
    this.handleOk = () => {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          let type = 'userGroup/create';
          values.parentId = this.props.parentId;
          if (this.props.modalType === 'update') {
            type = 'userGroup/update';
            console.log(this.props.formValue);
            values.id = this.props.formValue.id;
            values.parentId = this.props.formValue.parentNode ? this.props.formValue.parentNode.id : null;
          }
          values.enabled = values.enabled === 'true' ? true : false;
          this.props.dispatch({
            type: type,
            payload: values,
          });
        }
      })
    }
  }
  componentWillReceiveProps (nextprops) {
    if (this.props.formValue === nextprops.formValue) {
      return
    }
    if (nextprops.modalType === 'update') {
      this.props.form.setFields({
        name: {
          value: nextprops.formValue.name,
        },
        code: {
          value: nextprops.formValue.code,
        },
        enabled: {
          value: nextprops.formValue.enabled ? 'true' : 'false',
        },
        type: {
          value: nextprops.formValue.type,
        },
        remark: {
          value: nextprops.formValue.remark,
        },
      });
    }
  }
  render () {
    const { getFieldDecorator } = this.props.form;
    const { addModalShow } = this.props;
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
    return (
      <Modal
        title='添加组织机构'
        visible={addModalShow}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        >
        <Form>
          <FormItem
          {...formItemLayout}
          label="机构名称：">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入机构名称'}]
            })(
              <Input placeholder='机构名称'/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='机构代码：'>
            {getFieldDecorator('code',{
              rules: [{ required: true, message: '请输入组织机构代码' }]
            })(
              <Input placeholder='机构代码' />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='状态：'>
            {getFieldDecorator('enabled', {
              initialValue: 'true',
              rules: [{ required: true, message: '请选择状态' }]
            })(
              <Select>
                <Option value='true'>启用</Option>
                <Option value='false'>禁用</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='类型：'>
            {getFieldDecorator('type', {
              initialValue: 'ORGANIZATION',
              rules: [{ required: true, message: '请选择组织机构类型' }],
            })(
              <Select>
                <Option value='ORGANIZATION'>组织</Option>
                <Option value='USERGROUP'>机构</Option>
                <Option value='POSITION'>岗位</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label='备注'>
            {getFieldDecorator('remark')(
              <TextArea rows={4}/>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Form.create()(AddModal);