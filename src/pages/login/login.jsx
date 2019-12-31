import React from 'react'
import { Form, Icon, Input, Button,message} from 'antd';
import {Redirect} from 'react-router-dom'
import './login.less'
import logo from '../../assets/images/logo.png'
import {login} from '../../api/index'
import memory from '../../utils/memory'
import store from '../../utils/storage'
/**登录页面 */
class Login extends React.Component{
  handleSubmit=(event)=>{
    event.preventDefault()
    const form = this.props.form

    form.validateFields(async (err, values) => {
      if (!err) {
        const {username,password} = values
        const result = await login(username,password)
        if(result.status===0){
          message.success('登陆成功')
          const user = result.data
          memory.user = user
          store.saveStorage('user',user)
          //跳转至后台
          this.props.history.replace('/')
        }else{
          message.error(result.msg)
        }
      }
    });
  }
  pwValidator=(rule,value,callback)=>{
    if(!value){
      callback('请输入密码')
    }else if(12<value.length||4>value.length){
      callback('密码长度大于等于4，小于1等于2')
    }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
      callback('密码只能由数字字母下划线组成')
    }else{
      callback()
    }
  }
  render(){                                                                                                                                                                                                                                                                                                                                                                                                                                              
    const { getFieldDecorator } = this.props.form;
    const user = memory.user
    if(user&&user._id){
      return <Redirect to='/'></Redirect>
    }
    return (
      <div className='login'>
        <header className='login-header'>
          <img className='logo' src={logo} alt=""/>
          <h1 className='login-title'>SIRIUS管理系统</h1>
        </header>
        <section className='login-content'>
          <h2>用户登录</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                  {
                    getFieldDecorator('username',{
                      rules: [
                        { required: true, whitespace: true, message: '请输入用户名' },
                        { min: 4, message: '用户名至少4位' },
                        { max: 12, message: '用户名最多12位' },
                        { pattern: /^[a-zA-Z0-9——]+$/, message: '用户名必须是数字、英文、下划线的组合' },
                      ],
                      initialValue:'admin'
                    })(
                      <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="用户名"
                      />,
                    )
                  }
              </Form.Item>
              <Form.Item>
                  {
                    getFieldDecorator('password',{
                      rules: [
                        {validator:this.pwValidator},
                      ]
                    })(
                      <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="密码"
                      />
                    )
                  }
                   
              </Form.Item>
              <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                  </Button>
              </Form.Item>
            </Form>
        </section>
      </div>
    )
  }
}
/**
 * 1.高阶函数
 *   1)一类特别的函数
 *      a. 接收函数类型的参数
 *      b. 返回值是函数
 *   2) 常见
 *      a.定时器setTimeout setInterval
 *      b.Promise 
 *      c.数组遍历 map forEach filter find
 *      d. bind()
 *      e. Form.create()()  getFieldDecorator()()
 *   3)高阶函数更加动态，扩展性高
 * 
 * 2.高阶组件
 *    1)本质是函数
 *    2)接收一个组件(被包装组件)，返回一个新组件(包装组件)
 */
/**
 * 包装from组件，生成新的组件
 */
const WrapLogin = Form.create()(Login)

export default WrapLogin