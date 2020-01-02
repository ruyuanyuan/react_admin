import React from 'react'
import {Card,Table,Button,Icon,message,Modal} from 'antd'
import LinkButton from '../../components/link-button'
import {categorys,addCategorys,upadteCategorys} from '../../api/index'
import AppForm from './addForm'
import UpdateForm from './updateForm'
export default class Category extends React.Component{
  state = {
    loading:false,
    categorys:[],
    subCategorys:[],
    parentId:'0',//当前的分类ID
    parentName:'',//一级分类名称
    showStatus:0, //更新添加框显示 0 不显示 1显示添加 2显示更新
  }
  initTableColumns = ()=>{
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        width:300,
        render:(record)=>(
          
          <span>
            <LinkButton onClick={()=>{this.showUpate(record)}}>修改分类</LinkButton>
            {
              this.state.parentId==='0'? <LinkButton onClick={()=>{this.showSubsubCategorys(record)}}>查看分类</LinkButton>:null
            }
          </span>
        )
      }
    ]
  }
  showCategorys=()=>{
    console.log(1)
    this.setState({
      parentId:'0',
      parentName:'',
      subcategorys:[]
    })
  }
  //显示二级分类
  showSubsubCategorys=(record)=>{
    this.setState({
      parentId:record._id,
      parentName:record.name
    },()=>{
      this.getcategorys()
    })
  }
  getcategorys= async ()=>{
    this.setState({
      loading:true
    })
    const {parentId} = this.state
    const result = await categorys(parentId)
    if(result.status===0){
      const categorys = result.data
      if(parentId==='0'){
        this.setState({categorys})
      }else{
        this.setState({subcategorys:categorys})
      }
      
    }else{
      message.error('获取分类数据失败')
    }
    this.setState({
      loading:false
    })
  }
 
  //点击取消
  handleCancel=()=>{
    //重置数据
    this.form.resetFields()
    this.setState({
      showStatus:0
    })
  }
  //显示添加
  showAdd = ()=>{
    this.setState({
      showStatus:1
    })
  }
  //添加分类
  addCategory=async ()=>{
    console.log('addCategory')
    this.setState({
      showStatus:0
    })
    const {parentId,cartgroyName} = this.form.getFieldsValue()
    //重置数据
    this.form.resetFields()
    //添加分类接口
    let result = await addCategorys(parentId,cartgroyName)
    if(result.status===0){
      this.getcategorys()
    }else{
      message.error('添加分类失败')
    }
  }
  // 显示更新分类
  showUpate=(record)=>{
    //保存分类对象
    this.categroy=record
    this.setState({
      showStatus:2
    })
  }
  //更新分类
  upadteCategory=async ()=>{
    console.log('upadteCategory')
    this.setState({
      showStatus:0
    })
    const categoryId = this.categroy._id
    const categoryName = this.form.getFieldValue('categoryName')
    //重置数据
    this.form.resetFields()
    //更新接口
    let result = await upadteCategorys(categoryId,categoryName)
    if(result.status===0){
      this.getcategorys()
    }else{
      message.error('分类名称修改失败')
    }
    
  }

  //为第一次render准备数据
  componentWillMount(){
    this.initTableColumns()
  }
  //发送请求
  componentDidMount(){
    this.getcategorys()
  }
  render(){
    //读取动态数据
    const {categorys,loading,subcategorys,parentId,parentName,showStatus} = this.state
    const categroy = this.categroy || {}
    // 标题
    const title = parentId==='0'?'一级分类列表':(
      <span>
        <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
        <Icon type='arrow-right' style={{margin:'0px 10px'}}></Icon>
       <span>{parentName}</span>
      </span>
      )
    const btn = (
      <Button type='primary' onClick={this.showAdd}>
        <Icon type="plus" /> 添加
      </Button>
    )
    return (
      <Card  title={title} extra={btn} >
        <Table 
          dataSource={parentId==='0'?categorys:subcategorys}
          columns={this.columns} 
          bordered 
          rowKey='_id' 
          loading={loading}
          pagination={{defaultPageSize:5,showQuickJumper:true}} 
        />
        <Modal
          title="添加分类"
          visible={showStatus===1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
         <AppForm categorys={categorys} 
         parentId={parentId}
         setForm={(form)=>{this.form = form}}
         ></AppForm>
        </Modal>
        <Modal
          title="修改分类"
          visible={showStatus===2}
          onOk={this.upadteCategory}
          onCancel={this.handleCancel}
        >
          <UpdateForm 
          categroyName={categroy.name} 
          setForm={(form)=>{this.form = form}}></UpdateForm>
        </Modal>
      </Card>
    )
  }
}