/**
 * 包含应用中所有请求接口
 */
import ajxs from './ajax'
import jsonp from 'jsonp'

export const login =(username,password)=>ajxs('/login',{username,password},'post')

export const addUser =(username,password)=>ajxs('/login',{username,password},'post')

// jsonp 请求

export const weather = (city)=>{
   const url = `http://api.map.baidu.com/telematics/v3/weather?ak=FK9mkfdQsloEngodbFl4FeY3&location=${city}`
  jsonp(url,null,(err,data)=>{
    console.log('jsonp',err,data)
  })
}
weather('北京')