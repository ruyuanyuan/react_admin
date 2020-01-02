import React from 'react'
import {Form,Input} from 'antd'
import PropTypes from 'prop-types'
/**
 * form组件
 */
const Item = Form.Item

class UpdateForm extends React.Component{
  static propTypes = {
    categroyName:PropTypes.string.isRequired,
    setForm:PropTypes.func.isRequired
  }
  componentWillMount(){
    this.props.setForm(this.props.form)
  }
  render(){
    const { getFieldDecorator } = this.props.form
    const {categroyName} = this.props
    return (
      <Form>
        <Item label="分类名称">
          {getFieldDecorator('categoryName', {
            initialValue:categroyName,
            rules: [{ required: true, message: '请输入分类名称' }],
          })(
            <Input placeholder='请输入分类名称'></Input>
          )}
        </Item>
        
      </Form>
    )
  }
}

export default  Form.create()(UpdateForm)