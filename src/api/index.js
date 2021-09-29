/*
要求: 能根据接口文档定义接口请求
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise

基本要求: 能根据接口文档定义接口请求函数
 */
//import jsonp from 'jsonp'
//import {message} from 'antd'
import ajax from './ajax'
import { post } from '../utils/request';
import defaultUrl from '../utils/current';

// const BASE = 'http://localhost:5000'
const BASE = '';
// 登陆
/*
export function reqLogin(username, password) {
  return ajax('/login', {username, password}, 'POST')
}*/

// 获取一级/二级分类的列表
export const reqCategorys = (parent_id) => ajax(defaultUrl + '/request/get-categories', {parent_id:parent_id*1},'POST')

// 添加分类
export const reqAddCategory = (category, parent_id) => ajax(defaultUrl + '/request/add-category', {category, parent_id}, 'POST')

// 更新分类
export const reqUpdateCategory = (id, category) => ajax(defaultUrl + '/request/update-category', {id, category}, 'POST')

// 获取一个分类
export const reqCategory = (categoryId) => ajax(BASE + '/manage/category/info', {categoryId})

export const reqSearchProducts = ({pageNum, pageSize, searchName, searchType}) => ajax(BASE + '/manage/product/search', {
  pageNum,
  pageSize,
  [searchType]: searchName,
})

// 搜索商品分页列表 (根据商品描述)
/*export const reqSearchProducts2 = ({pageNum, pageSize, searchName}) => ajax(BASE + '/manage/product/search', {
  pageNum,
  pageSize,
  productDesc: searchName,
})*/




// 获取所有角色的列表
export const reqRoles = () => ajax(defaultUrl+'/request/get-roles')
// 添加角色
export const reqAddRole = (roleName) => ajax(defaultUrl + '/request/add-role', {roleName}, 'POST')
// 添加角色
export const reqUpdateRole = (role) => ajax(defaultUrl + '/request/update-role', role, 'POST')

// 获取所有用户的列表
/* export const reqUsers = () => ajax(BASE + '/manage/user/list') */
export const reqUsers = () => ajax(defaultUrl + '/request/get-users')
// 删除指定用户
export const reqDeleteUser = (id) => ajax(defaultUrl + '/request/delete-user', {id}, 'POST')
// 添加/更新用户
export const reqAddOrUpdateUser = (user) => ajax(defaultUrl + '/request/'+(user.user_id ? 'update' : 'add')+'-user', user, 'POST')

// 删除指定名称的图片
/* export const reqDeleteImg = (name) => ajax(BASE + '/manage/img/delete', {name}, 'POST') */
export const reqDeleteImg = (name)=>{
  return new Promise((resolve,reject)=>{
    post(defaultUrl+'/request/delete-picture',{name:name}).then(
      response => {
          if(response.data.status===0)
            resolve(0)
          else
            resolve(1)
        },
      error => {
        resolve(1)
      }
    )
  })
}

// 添加/修改商品
/* export const reqAddOrUpdateProduct = (product) => ajax(BASE + '/manage/product/' + ( product._id?'update':'add'), product, 'POST') */
export const reqAddOrUpdateProduct = (product) =>{
  return new Promise((resolve,reject)=>{
    post(defaultUrl+'/request/add-update-product',{product}).then(
      response => {
          if(response.data.status===0)
            resolve(0)
          else
            resolve(1)
        },
      error => {
        resolve(1)
      }
    )
  })
}

export const reqProducts = (conditions)=>{
  let productInfo = 
    {products:[
      {
        id: '1',
        name: '胡彦斌',
        price: 32333,
        descripition: '西湖区湖底公园1号',
        status:0
      },
      {
        id: '2',
        name: '胡彦祖',
        price: 4342,
        descripition: '西湖区湖底公园1号',
        status:1
      }]}
    return new Promise((resolve,reject)=>{
        post(defaultUrl+'/request/req-products',conditions).then(
          response => {
            //请求成功后通知App更新状态
              console.log(response.data.data)
              productInfo = response.data.data  
              resolve(productInfo)
            },
          error => {
            //请求失败后通知App更新状态
              console.log(error)
              reject(error)
          }
        )
    })
}
export const reqUpdateStatus = (productId, status) =>{
  return new Promise((resolve,reject)=>{
      const newStatus = status ==='0'? '1':'0'
      post(defaultUrl+'/request/update-products-status',{id:productId,status:newStatus}).then(
        response => {
            if(response.data.status===0)
              resolve(0)
            else
              resolve(1)
          },
        error => {
          resolve(0)
        }
      )
  })
}

// 修改商品
// export const reqUpdateProduct = (product) => ajax(BASE + '/manage/product/update', product, 'POST')