import React from 'react'
import {Card,Select,Button,Input,Icon,Table,message} from 'antd'
import ButtonLink from '../../components/link-button'
import {products,productsSearch,productsUpdateStatus} from '../../api/index'
import {PAGE_SZIE} from '../../utils/constant'
const Option = Select.Option
export default class ProductHome extends React.Component{
  state={
    total:0,
    products:[],
    loading:false,
    searchName:'',
    searchType:'productName'
  }
  initColumns=()=>{
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render:(price)=>'￥'+price
      },
      {
        title: '状态',
        width:100,
        render:(product)=>{
          const {status,_id} = product
          const newStatus = status === 1?2:1
          return (
            <span>
        <Button type='primary' onClick={()=>{this.updateStatus(_id,newStatus)}}>{status===1 ? '下架' : '上架'}</Button>
              <span>{status===1 ? '在售' : '已下架'}</span>
            </span>
          )
        }
      },
      {
        title: '操作',
        width:100,
        render:(product)=>{
          return (
            <span>
              <ButtonLink onClick={()=>{this.props.history.push('/product/detail',{product})}}>详情</ButtonLink>
              <ButtonLink onClick={()=>{this.props.history.push('/product/addupdate',{product})}}>修改</ButtonLink>
            </span>
          )
        }
      },
    ];
  }
  updateStatus=async (productId,status)=>{
    const result = await productsUpdateStatus(productId,status)
    if(result.status === 0){
      message.success('更新商品状态成功')
      this.getProducts(this.pageNum)
    }
  }
  getProducts=async (pageNum)=>{
    this.pageNum = pageNum
    this.setState({loading:true})
    const {searchName,searchType} = this.state
    let reslut = {}
    if(searchName){
      reslut = await productsSearch({pageNum,pageSize:PAGE_SZIE,[searchType]:searchName})
    }else{
      reslut = await products(pageNum,PAGE_SZIE)
    }
    
    this.setState({loading:false})
    if(reslut.status===0){
      const {total,list} = reslut.data
      this.setState({
        total:total,
        products:list
      })
    }
  }
  componentDidMount(){
    this.getProducts(1)
  }
  componentWillMount(){
    this.initColumns()
  }
  render(){
    const {products,total,loading,searchName,searchType} = this.state
    const title = (
      <span>
        <Select value={searchType} 
        style={{width:150,marginRight:10}} 
        onChange={(value)=>this.setState({searchType:value})}>
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input 
        placeholder='商品关键字' 
        value={searchName} 
        style={{width:240,marginRight:10}}
        onChange={(event)=>this.setState({searchName:event.target.value})}
        ></Input>
        <Button type='primary' onClick={()=>{this.getProducts(1)}}>
          搜索<Icon type="search" />
        </Button>
      </span>
    )
    const extra = (
      <Button type='primary' onClick={()=>this.props.history.push('/product/addupdate')}>
        <Icon type="plus"  /> 添加商品
      </Button>
    )
    return (
      <Card title={title} extra={extra}>
        <Table 
        dataSource={products}
        columns={this.columns}
        rowKey='_id'
        bordered
        loading={loading}
        pagination={{
          defaultPageSize:PAGE_SZIE,
          showQuickJumper:true,
          total,
          onChange:this.getProducts
        }}
        
        >
        </Table>
      </Card>
    )
  }
}