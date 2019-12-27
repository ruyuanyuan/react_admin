/**入口js */
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './utils/storage'
import memory from './utils/memory'
const user = store.getStorage('user')
memory.user= user
//读取localstorage中的数据
ReactDOM.render(<App></App>,document.getElementById('root'))