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
//根据分类ID获取分类名称
export const category=(categoryId)=>ajxs('/manage/category/info',{categoryId})

//商品列表接口
/**
 * |pageNum    |Y       |Number   |页码
   |pageSize   |Y       |Number   |每页条目数
 */
export const products=(params)=>ajxs('/manage/category/list',params)
//商品列表搜索接口
/**
 * |pageNum       |Y       |Number   |页码
    |pageSize      |Y       |Number   |每页条目数
    |productName   |N       |String   |根据商品名称搜索
    |productDesc   |N       |String   |根据商品描述搜索
 */
export const productsSearch=(params)=>ajxs('/manage/product/search',params)

//添加商品接口
/**
 * |categoryId    |Y       |string   |分类ID
    |pCategoryId   |Y       |string   |父分类ID
    |name          |Y       |string   |商品名称
    |desc          |N       |string   |商品描述
    |price         |N       |string   |商品价格
    |detail        |N       |string   |商品详情
    |imgs          |N       |array   |商品图片名数组
 */
export const productsAdd=(params)=>ajxs('/manage/product/add',params,'POST')

//更新商品接口
/**
 *  |_id           |Y       |string   |商品ID
    |categoryId    |Y       |string   |分类ID
    |pCategoryId   |Y       |string   |父分类ID
    |name          |Y       |string   |商品名称
    |desc          |N       |string   |商品描述
    |price         |N       |string   |商品价格
    |detail        |N       |string   |商品详情
    |imgs          |N       |array   |商品图片名数组
 */
export const productsUpdate=(params)=>ajxs('/manage/product/update',params,'POST')

// 对商品进行上架/下架处理
/**
 * |productId    |Y       |string   |商品名称
    |status       |Y       |number   |商品状态值
 */
export const productsUpdateStatus=(productId,status)=>ajxs('/manage/product/updateStatus',{productId,status},'POST')

