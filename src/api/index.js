/**
 * 包含应用中所有请求接口
 */
import ajxs from './ajax'

export const login =(username,password)=>ajxs('/login',{username,password},'post')

export const addUser =(username,password)=>ajxs('/login',{username,password},'post')
