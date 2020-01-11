import React from 'react'
import {Form,Select,Input} from 'antd'
import PropTypes from 'prop-types'
/**
 * form组件
 */
const Item = Form.Item
const Option = Select.Option

class AddForm extends React.Component{
  static propTypes = {
    setForm:PropTypes.func.isRequired,
    categorys:PropTypes.array.isRequired,
    parentId:PropTypes.string.isRequired,
  }
  componentWillMount(){
    this.props.setForm(this.props.form)
  }
  render(){
    const { getFieldDecorator } = this.props.form
    const {categorys,parentId} = this.props
    return (
      <Form>
        <Item label="所属分类">
          {getFieldDecorator('parentId', {
            initialValue:parentId,
            rules: [{ required: true, message: '请选择分类' }],
          })(
            <Select>
              <Option value='0'>一级分类</Option>
              {
                categorys.map(c=> <Option value={c._id} key={c._id}>{c.name}</Option>)
              }
             
            </Select>
          )}
        </Item>
        <Item label="分类名称">
          {getFieldDecorator('cartgroyName', {
            initialValue:'',
            rules: [{ required: true, message: '请输入分类名称' }],
          })(
            <Input placeholder='请输入分类名称'></Input>
          )}
        </Item>
        
      </Form>
    )
  }
}

export default  Form.create()(AddForm)