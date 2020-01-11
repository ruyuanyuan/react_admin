import React from 'react'
import {Card,Form,Icon,Input,Cascader,Upload,Button} from 'antd'
import LinkButton from '../../components/link-button'
import {categorys, products} from "../../api/index"
const Item = Form.Item
const { TextArea } = Input;
class ProductAddUpdate extends React.Component{
  state = {
    options:[],
  }
  initOptions=async (categorys)=>{
    const options = categorys.map(item=>({
      value:item._id,
      label:item.name,
      isLeaf:false
    }))
    const {isUpdate,product} = this
    const {pCategoryId,categoryId} = product
    if(isUpdate&&pCategoryId!=='0'){
      //获取对应的二级分类类列表
      const subCategory = await this.getCategorys(pCategoryId)
      const tagOptions = options.find(option=>option.value===categoryId)
      // 生成二级下拉的options
      const childrenOption = subCategory.map(c=>({
        value:c._id,
        label:c.name,
        isLeaf:true
      }))
      tagOptions.children = childrenOption

    }
    this.setState({options})
  }
  //async 函数的返回值是一个新的Promise对象，promise的结果和值由async的结果来决定
  getCategorys = async (parentId)=>{
    const result = await categorys(parentId)
    if(result.status === 0){
      const categorys = result.data
      //是否一级分类
      if(parentId==='0'){
        this.initOptions(categorys)
      }else{
        return categorys
      }
      
    }
  }
  loadData =async selectedOptions => {
    const targetOption = selectedOptions[0]
    targetOption.loading = true
    //根据选中的分类获取下级分类
    const subCategorys = await this.getCategorys(targetOption.value)
    if(subCategorys&&subCategorys.length>0){
      const cOption = subCategorys.map(c=>({
        value:c._id,
        label:c.name,
        isLeaf:true
      }))
      targetOption.children = cOption
    }else{
      targetOption.isLeaf = true
    }
    targetOption.loading = false
    this.setState({
      options: [...this.state.options],
    });
  }
  submit=()=>{
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  validatorPrice=(rule, value, callback)=>{
    if(value*1>0){
      callback()
    }else{
      callback('价格必须大于0')
    }
  }
  componentDidMount(){
    this.getCategorys('0')
  }
  componentWillMount(){
    const product = this.props.location.state
    this.isUpdate = !!product
    this.product = product || {}
  }
  render(){
    const {isUpdate,product}= this
    const {categoryId,pCategoryId} = product
    const categoryIds = []
    if(isUpdate){
      if(pCategoryId==='0'){
        categoryIds.push(categoryId)
      }else{
        categoryIds.push(categoryId)
        categoryIds.push(pCategoryId)
      }
      
    }
    const title = (
      <span>
        <LinkButton onClick={()=>{this.props.history.goBack()}}>
          <Icon type='arrow-left' style={{marginRight:10}}></Icon>
        </LinkButton>
        {isUpdate?'修改商品':'添加商品'}
        
      </span>
    )
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },//左侧label的宽度
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    const { getFieldDecorator } = this.props.form
    return (
      <Card title={title}>
        <Form {...formItemLayout}>
          <Item label='商品名称:'>
            {
              getFieldDecorator('name',{
                rules: [
                  { required: true, message: '商品名称必填' }
                ],
                initialValue:product.name
              })(
                <Input placeholder='请输入商品名称'></Input>
              )
            }
            
          </Item>
          <Item label='商品描述:'>
            {
              getFieldDecorator('desc',{
                rules: [
                  { required: true, message: '商品描述必填' }
                ],
                initialValue:product.desc
              })(
                <TextArea  placeholder='请输入商品描述' autoSize={{minRows:2,maxRows:6}} ></TextArea>
              )
            }
            
          </Item>
          <Item label='商品价格:'>
            {
              getFieldDecorator('price',{
                rules: [
                  { required: true, message: '商品价格必填' },
                  { validator:this.validatorPrice}
                ],
                initialValue:product.price
              })(
                <Input type='number' addonAfter='元' placeholder='请输入商品价格'></Input>
              )
            }
            
          </Item>
          <Item label='商品分类:'>
          {
              getFieldDecorator('categoryIds',{
                rules: [
                  { required: true, message: '商品分类必填' },
                ],
                initialValue:[]
              })(
                <Cascader
                  placeholder='请选择商品分类'
                  options={this.state.options}
                  loadData={this.loadData}
                />
              )
            }
            
          </Item>
          <Item label='商品图片:'>
            <div>商品图片</div>
          </Item>
          <Item label='商品详情:'>
            <div>商品详情</div>
          </Item>
          <Item label=' '>
            <Button type='primary' onClick={()=>this.submit()}>提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(ProductAddUpdate)