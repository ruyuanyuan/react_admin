import React from 'react'
import './index.less'
import logo from '../../assets/images/logo.png'
import {Link} from 'react-router-dom'
import { Menu, Icon } from 'antd';
const { SubMenu } = Menu
export default class LeftNav extends React.Component{
  render(){
    return <div className='left-nav'>
              <Link to='/'>
                <header className='left-nav-header'>
                    <img className='logo' src={logo} alt=""/>
                    <span className='systemName'>SIRIUS</span>
                </header>
              </Link>
              <Menu
                defaultSelectedKeys={'1'}
                mode="inline"
                theme="dark"
              >
                  <Menu.Item key="/home">
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
                
                <Menu.Item key="/user">
                <Link to='/user'>
                  <Icon type="pie-chart" />
                  <span>用户管理</span>
                  </Link>
                </Menu.Item>
                
                
                <Menu.Item key="/role">
                <Link to='/role'>
                  <Icon type="pie-chart" />
                  <span>角色管理</span>
                  </Link>
                </Menu.Item>
               
                <SubMenu
                  key="/chart"
                  title={
                    <span>
                      <Icon type="mail" />
                      <span>图表</span>
                    </span>
                  }
                > 
                    <Menu.Item key="/charts/bar">
                    <Link to='/charts/bar'>
                      <Icon type="mail" />
                      <span>柱状图</span>
                      </Link>
                    </Menu.Item>
                  
                  
                    <Menu.Item key="/charts/line">
                    <Link to='/charts/line'>
                      <Icon type="mail" />
                      <span>线型图</span>
                      </Link>
                    </Menu.Item>
                 
                 
                    <Menu.Item key="/charts/pie">
                    <Link to='/charts/pie'>
                      <Icon type="mail" />
                      <span>饼图</span>
                      </Link>
                    </Menu.Item>
                
                </SubMenu>
              </Menu>
           </div>
  }
}