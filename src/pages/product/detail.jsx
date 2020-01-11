import React from 'react'
import {Card,Icon,List} from 'antd'
import LinkButton from '../../components/link-button/'
import {BASE_IMG_URL} from '../../utils/constant'
import {category} from '../../api/index'
const Item = List.Item
export default class ProductDetail extends React.Component{
  state={
    cName1:'',
    cName2:''
  }
  async componentDidMount(){
    const {pCategoryId,categoryId} = this.props.location.state.product
    if(pCategoryId==='0'){
      const relust = await category(categoryId)
      const cName1 = relust.data.name
      this.setState({cName1})
    }else{
      /**
       * 效率有问题 相当于同步
       * const relust1 = await category(pCategoryId)
          const relust2 = await category(categoryId)
          const cName1 = relust1.data.name
          const cName2 = relust2.data.name
      */
      //希望一次发送多个请求，都成功之后返回结果
      const relusts = await Promise.all(category(pCategoryId),category(categoryId))
      const cName1 = relusts[0].data.name
      const cName2 = relusts[1].data.name
      this.setState({cName1,cName2})
    }
  }
  render(){
    const {name,desc,price,detail,imgs} = this.props.location.state.product
    const {cName1,cName2} = this.state
    const title=(
      <span>
        <LinkButton onClick={()=>{this.props.history.goBack()}}>
        <Icon type='arrow-left' style={{marginRight:15,fontSize:18}}></Icon>
        </LinkButton>
        <span>商品详情</span>
      </span>
    )
    return (
      <Card title={title} className='product-detail'>
        <List>
          <Item>
            <span className='left'>商品名称：</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className='left'>商品描述：</span>
    <span>{desc}</span>
          </Item>
          <Item>
            <span className='left'>商品价格：</span>
    <span>{price}元</span>
          </Item>
          <Item>
            <span className='left'>所属分类：</span>
            <span>{cName1}-->{cName2?'-->'+cName2 :null}</span>
          </Item>
          <Item>
            <span className='left'>商品图片：</span>
            <span>
              {
                imgs.map(img=>(
                  <img 
                  key={ img }
                  src={ BASE_IMG_URL + img } 
                  className='productImg'
                  alt="img"
                  />
                ))
              }
             
            </span>
          </Item>
          <Item>
            <span className='left'>商品详情：</span>
            <span dangerouslySetInnerHTML={{__html:detail}}></span>
          </Item>
        </List>
      </Card>
    )
  }
}