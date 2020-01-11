import React from 'react'
import './index.less'
import logo from '../../assets/images/logo.png'
import {Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd';
import menuList from '../../config/menu.config'
const { SubMenu } = Menu
class LeftNav extends React.Component{
  //根据数据去生成菜单 map+递归
  getMenuList = (menuList)=>{
    
    return menuList.map(item=>{
      if(!item.children){
        return  <Menu.Item key={item.path}>
                  <Link to={item.path}>
                    <Icon type={item.icon} />
                    <span>{item.title}</span>
                  </Link>
                </Menu.Item>
      }else{
        //获取当前路由路径
          const path = this.props.location.pathname
          const cItempath = item.children.find(citem=>path.indexOf(citem.path) === 0)
          if(cItempath){
            this.openkey = item.path
          }
          return  <SubMenu
                    key={item.path}
                    title={
                      <span>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                      </span>
                    }
                  > 
                    {this.getMenuList(item.children)}
                  </SubMenu>
      }
      
    })
  }
  //reduce实现
  getMenuNode = (menuList)=>{
   return menuList.reduce((menu,item)=>{
      if(!item.children){
        menu.push((<Menu.Item key={item.path}>
                  <Link to={item.path}>
                    <Icon type={item.icon} />
                    <span>{item.title}</span>
                  </Link>
                </Menu.Item>))
      }else{
        menu.push((<SubMenu
          key={item.path}
          title={
            <span>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </span>
          }
        > 
          {this.getMenuNode(item.children)}
        </SubMenu>))
      }
      return menu
    },[])
  }
  componentWillMount(){
    this.menuList= this.getMenuList(menuList)
  }
  render(){
    //获取当前路由路径
    let path = this.props.location.pathname
    if(path.indexOf('/product') === 0){
      path = '/product'
    }
    return <div className='left-nav'>
              <Link to='/'>
                <header className='left-nav-header'>
                    <img className='logo' src={logo} alt=""/>
                    <span className='systemName'>SIRIUS</span>
                </header>
              </Link>
              <Menu
                selectedKeys={[path]}
                defaultOpenKeys={[this.openkey]}
                mode="inline"
                theme="dark"
              >
                {this.menuList}
                {/* <Menu.Item key="/home">
                  <Link to='/home'>
                    <Icon type="pie-chart" />
                    <span>首页</span>
                    </Link>
                </Menu.Item>
              
                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <Icon type="mail" />
                      <span>商品</span>
                    </span>
                  }
                > 
                    <Menu.Item key="/category">
                    <Link to='/category'>
                      <Icon type="mail" />
                      <span>分类管理</span>
                      </Link>
                    </Menu.Item>
                 
                  
                    <Menu.Item key="/product">
                    <Link to='/product'>
                      <Icon type="mail" />
                      <span>商品管理</span>
                      </Link>
                    </Menu.Item>
                  
                </SubMenu>
                 */}
              </Menu>
           </div>
  }
}

export default withRouter(LeftNav)