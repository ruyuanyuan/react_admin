/**
 * 根组件
 */
import React from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
export default class App extends React.Component{
  render(){
    return (
      <BrowserRouter>
      {/**只匹配一个路由 */}
      <Switch>
        <Route path='/login' component={Login}></Route>
        <Route path='/' component={Admin}></Route>
      </Switch>
      </BrowserRouter>
    )
  }
}