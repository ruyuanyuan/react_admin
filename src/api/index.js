/**
 * 包含应用中所有请求接口
 */
import ajxs from './ajax'

export const login =(username,password)=>ajxs('/login',{username,password},'POST')

export const addUser =(username,password)=>ajxs('/login',{username,password},'POST')

// 商品分类接口

//获取分类
export const categorys=(parentId)=>ajxs('/manage/category/list',{parentId})
//添加分类
export const addCategorys=(parentId,categoryName)=>ajxs('/manage/category/add',{parentId,categoryName},'POST')
//更新分类
export const upadteCategorys=(categoryId,categoryName)=>ajxs('/manage/category/update',{categoryId,categoryName},'POST')