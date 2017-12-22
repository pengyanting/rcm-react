import React from 'react';
import { Form, Input, Row, Col, Button, message } from 'antd';

const FormItem = Form.Item
class SystemSearch extends React.Component {
  constructor (props) {
    super(props);
    this.handleSubmit = () => {
      const formData = this.props.form.getFieldsValue()
      this.props.dispatch({
        type: 'system/query',
        payload: {
          name: formData.name,
          code: formData.code,
          current: this.props.searchForm.current,
        },
      });
    }
    this.handleAdd = () => {
      this.props.dispatch({
        type: 'system/showModal',
      });
    }
    this.handleDel = () => {
      if (!this.props.selectId) {
        message.warning('请选择要操作的系统');
        return;
      }
      this.props.dispatch({
        type: 'system/del',
        payload: {
          id: this.props.selectId
        }
      });
    },
    this.handleChangeStatus = (state) => {
      if (!this.props.selectId) {
        message.warning('请选择要操作的系统');
        return;
      }
      this.props.dispatch({
        type: 'system/changeStatus',
        payload: {
          id: this.props.selectId,
          enabled: state
        }
      });
    }
  }
  render () {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    return (
      <div style={{marginBottom:'20px'}}>
        <Form layout='inline'>
          <FormItem>
            {getFieldDecorator('name', {
            })(
              <Input placeholder="系统名称" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('code', {
            })(
              <Input placeholder="系统代码" />
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
          <Button style={{marginRight: '10px'}} onClick={this.handleAdd}>添加系统</Button>
          <Button style={{marginRight: '10px'}} onClick={()=>{this.handleChangeStatus('true')}} type="success">批量启用</Button>
          <Button style={{marginRight: '10px'}} onClick={()=>{this.handleChangeStatus('false')}}type="danger">批量禁用</Button>
          <Button style={{marginRight: '10px'}} onClick={this.handleDel} type="danger">批量删除</Button>
        </div>
      </div>
    )
  }
}
const WrappedHorizontalLoginForm = Form.create()(SystemSearch);
export default WrappedHorizontalLoginForm;