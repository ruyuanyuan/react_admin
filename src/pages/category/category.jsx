import React from 'react'
import {Card,Table,Button,Icon,message,Modal} from 'antd'
import LinkButton from '../../components/link-button'
import {categorys,addCategorys,upadteCategorys} from '../../api/index'
export default class Category extends React.Component{
  state = {
    loading:false,
    categroys:[],
    subCategroys:[],
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
        render:(categroy)=>(
          <span>
            <LinkButton onClick={this.showUpate}>修改分类</LinkButton>
            {
              this.state.parentId==='0'? <LinkButton onClick={(categroy)=>{this.showSubsubCategroys(categroy)}}>查看分类</LinkButton>:null
            }
          </span>
        )
      }
    ]
  }
  showCategroys=()=>{
    this.setState({
      parentId:'0',
      parentName:'',
      subCategroys:[]
    })
  }
  //显示二级分类
  showSubsubCategroys=(categroy)=>{
    this.setState({
      parentId:categroy._id,
      parentName:categroy.name
    },()=>{
      this.getCategroys()
    })
  }
  getCategroys= async ()=>{
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
        this.setState({subCategroys:categorys})
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
  addCategory=()=>{
    console.log('addCategory')
    this.setState({
      showStatus:0
    })
  }
  // 显示更新分类
  showUpate=()=>{
    this.setState({
      showStatus:2
    })
  }
  //更新分类
  upadteCategory=()=>{
    console.log('upadteCategory')
  }
  //为第一次render准备数据
  componentWillMount(){
    this.initTableColumns()
  }
  //发送请求
  componentDidMount(){
    this.getCategroys()
  }
  render(){
    //读取动态数据
    const {categroys,loading,subCategroys,parentId,parentName,showStatus} = this.state
    // 标题
    const title = parentId==='0'?'一级分类列表':(
      <span>
        <LinkButton onClick={this.showCategroys}>一级分类列表</LinkButton>
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
          dataSource={parentId==='0'?categroys:subCategroys}
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
          <p>添加</p>
         
        </Modal>
        <Modal
          title="修改分类"
          visible={showStatus===2}
          onOk={this.upadteCategory}
          onCancel={this.handleCancel}
        >
          <p>更新</p>
          
        </Modal>
      </Card>
    )
  }
}