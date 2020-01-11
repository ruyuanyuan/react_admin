import React from 'react'
import {withRouter} from 'react-router-dom'
import { Modal,Icon} from 'antd';
import './index.less'
import {formateDate} from '../../utils/dateUtils'
import memory from '../../utils/memory'
import menulist from '../../config/menu.config'
import storage from '../../utils/storage'
import LinkButton from '../../components/link-button'
class Header extends React.Component{
  state = {
    nowdate:formateDate(Date.now())
  }
  getTime=()=>{
    this.interval =setInterval(()=>{
      this.setState({
        nowdate:formateDate(Date.now())
      })
    },1000)
  }
  getPageTitle(){
    let path = this.props.location.pathname
    let title = ''
    menulist.forEach((item)=>{
      if(item.path === path){
        title = item.title
      }else if(item.children){
        const cItem=item.children.find(citem=>citem.path === path)
        if(cItem){
        title =<span>{item.title} <Icon type='arrow-right' style={{margin:'0px 10px',color:'#1da57a'}}></Icon> {cItem.title}</span> 
        }
      }
    })
    return title
  }
  logoutEvent=()=>{
    Modal.confirm({
      content: '确认退出SIRIUS系统吗',
      okText:'确定',
      cancelText:'取消',
      onOk:()=>{
        storage.removeStorage('user')
        memory.user={}
        this.props.history.replace('/login')
      },
      onCancel() {
        
      },
    });
  }
  //第一次render之后执行，执行一次，一般用来执行一步操作，发定时器
  componentDidMount(){
    this.getTime()
  }
  //当前组件卸载之前调用
  componentWillUnmount(){
    clearInterval(this.interval)
  }
  render(){
    const {nowdate} = this.state 
    const username = memory.user.username
    const title = this.getPageTitle()
    return <div className='header'>
      <div className='header-top'>
        <span>欢迎,{username}</span>
        <LinkButton  onClick={this.logoutEvent}>退出</LinkButton>
        {/* <a href="javascript:" onClick={this.logoutEvent}></a> */}
      </div>
      <div className='header-bottom'>
        <div className='header-bottom-left'>{title}</div>
        <div className='header-bottom-right'>
        <span>{nowdate}</span>
        </div>
      </div>
    </div>
  }
}
export default withRouter(Header)