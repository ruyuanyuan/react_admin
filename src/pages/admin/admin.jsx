import React from 'react'
import { Layout } from 'antd';
import {Redirect,Route,Switch} from 'react-router-dom'
import memory from '../../utils/memory'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'

import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../chart/bar'
import Line from '../chart/line'
import Pie from '../chart/pie'
import Order from '../order/order'

const { Footer, Sider, Content } = Layout;
export default class Admin extends React.Component{
  
  render(){
    const user = memory.user //用户信息
    if(!user||!user._id){
      //自动跳转到登录
      return <Redirect to='/login'></Redirect>
    }
    return  <Layout style={{height:'100%'}}>
              <Sider>
              <LeftNav></LeftNav>
              </Sider>
              <Layout>
                <Header></Header>
                <Content style={{background:'#fff',margin:'20px 20px 0'}}>
                  <Switch>
                    <Route path='/home' component={Home}></Route>
                    <Route path='/category' component={Category}></Route>
                    <Route path='/product' component={Product}></Route>
                    <Route path='/role' component={Role}></Route>
                    <Route path='/user' component={User}></Route>
                    <Route path='/charts/bar' component={Bar}></Route>
                    <Route path='/charts/line' component={Line}></Route>
                    <Route path='/charts/pie' component={Pie}></Route>
                    <Route path='/order' component={Order}></Route>
                    <Redirect to='/home'></Redirect>
                  </Switch>
                </Content>
                <Footer style={{textAlign:'center',fontSize:'14px',color:'#ccc'}}>Copyright © 2019 Sirius Wolf Inc. 狼智七星</Footer>
              </Layout>
            </Layout>
  }
}