/*
要求: 能根据接口文档定义接口请求
包含应用中所有接口请求函数的模块
每个函数的返回值都是promise

基本要求: 能根据接口文档定义接口请求函数
 */
import jsonp from 'jsonp'
import {message} from 'antd'
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
export const reqLogin = (username, password) => ajax(BASE + '/login', {username, password}, 'POST')

// 获取一级/二级分类的列表
export const reqCategorys = (parentId) => //ajax(BASE + '/manage/category/list', {parentId})
{
   return new Promise(function(resolve,reject){
      setTimeout(() => {
        if(parentId ==='0'){
          resolve({
            status:'0',
            data:[
            {parentId:'0',name:'电器',id:'1'},
            {parentId:'0',name:'电子产品',id:'2'},
            {parentId:'0',name:'食品',id:'3'},
            {parentId:'0',name:'美妆',id:'4'},
            {parentId:'0',name:'办公',id:'5'},
            {parentId:'0',name:'生活用品',id:'6'},
            {parentId:'0',name:'穿着',id:'7'},
            {parentId:'0',name:'家具',id:'8'},
          ]})
        }
        else if(parentId === '1'){
          resolve({
            status:'0',
            data:[
            {parentId:'1',name:'电脑',id:'11',},
            {parentId:'1',name:'电视',id:'12',},
            {parentId:'1',name:'空调',id:'13',},
            {parentId:'1',name:'电扇',id:'14',},
            {parentId:'1',name:'冰箱',id:'15',},
          ]})
        }
        else if(parentId === '2'){
          resolve({
            status:'0',
            data:[
            {parentId:'2',name:'手机',id:'21',},
            {parentId:'2',name:'笔记本电脑',id:'22',},
            {parentId:'2',name:'电子表',id:'23',},
          ]})
        }
        else if(parentId === '3'){
          resolve({
            status:'0',
            data:[
            {parentId:'3',name:'饮料',id:'31',},
            {parentId:'3',name:'面包',id:'32',},
            {parentId:'3',name:'泡面',id:'33',},
          ]})
        }
        else if(parentId === '4'){
          resolve({
            status:'0',
            data:[
            {parentId:'4',name:'口红',id:'41',},
            {parentId:'4',name:'卸妆油',id:'42',},
            {parentId:'4',name:'粉底',id:'43',},
          ]})
        }
        else if(parentId === '5'){
          resolve({
            status:'0',
            data:[
            {parentId:'5',name:'笔记本',id:'51',},
            {parentId:'5',name:'水笔',id:'52',},
            {parentId:'5',name:'订书机',id:'53',},
            {parentId:'5',name:'打印机',id:'54',},
          ]})
        }
        else if(parentId === '6'){
          resolve({
            status:'0',
            data:[
            {parentId:'6',name:'菜刀',id:'61',},
            {parentId:'6',name:'叉子',id:'62',},
            {parentId:'6',name:'勺子',id:'63',},
            {parentId:'6',name:'碗',id:'64',},
          ]})
        }
        else if(parentId === '7'){
          resolve({
            status:'0',
            data:[
            {parentId:'7',name:'衣服',id:'71',},
            {parentId:'7',name:'裤子',id:'72',},
            {parentId:'7',name:'鞋子',id:'73',},
            {parentId:'7',name:'袜子',id:'74',},
          ]})
        }
        else if(parentId === '8'){
          resolve({
            status:'0',
            data:[
            {parentId:'8',name:'桌子',id:'81',},
            {parentId:'8',name:'椅子',id:'82',},
            {parentId:'8',name:'橱窗',id:'83',},
            {parentId:'8',name:'凳子',id:'84',},
          ]})
        }
        else{
          resolve({
            status:'-1'
          })
        }
      }, 1000);
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
      const newStatus = status ==0? 1:0
      post(defaultUrl+'/request/update-products-status',{id:productId,status:newStatus}).then(
        response => {
            if(response.data.status==0)
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

// 添加分类
export const reqAddCategory = (categoryName, parentId) => ajax(BASE + '/manage/category/add', {categoryName, parentId}, 'POST')

// 更新分类
export const reqUpdateCategory = ({categoryId, categoryName}) => ajax(BASE + '/manage/category/update', {categoryId, categoryName}, 'POST')

// 获取一个分类
export const reqCategory = (categoryId) => ajax(BASE + '/manage/category/info', {categoryId})

// 获取商品分页列表
/* export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/manage/product/list', {pageNum, pageSize})
 */
// 更新商品的状态(上架/下架)
/* export const reqUpdateStatus = (productId, status) => ajax(BASE + '/manage/product/updateStatus', {productId, status}, 'POST') */



/*
搜索商品分页列表 (根据商品名称/商品描述)
searchType: 搜索的类型, productName/productDesc
 */
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

// 删除指定名称的图片
/* export const reqDeleteImg = (name) => ajax(BASE + '/manage/img/delete', {name}, 'POST') */
export const reqDeleteImg = (name)=>{
  return new Promise((resolve,reject)=>{
    post(defaultUrl+'/request/delete-picture',{name:name}).then(
      response => {
          if(response.data.status==0)
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
          if(response.data.status==0)
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

// 修改商品
// export const reqUpdateProduct = (product) => ajax(BASE + '/manage/product/update', product, 'POST')


// 获取所有角色的列表
export const reqRoles = () => ajax(BASE + '/manage/role/list')
// 添加角色
export const reqAddRole = (roleName) => ajax(BASE + '/manage/role/add', {roleName}, 'POST')
// 添加角色
export const reqUpdateRole = (role) => ajax(BASE + '/manage/role/update', role, 'POST')


// 获取所有用户的列表
export const reqUsers = () => ajax(BASE + '/manage/user/list')
// 删除指定用户
export const reqDeleteUser = (userId) => ajax(BASE + '/manage/user/delete', {userId}, 'POST')
// 添加/更新用户
export const reqAddOrUpdateUser = (user) => ajax(BASE + '/manage/user/'+(user._id ? 'update' : 'add'), user, 'POST')

/*
json请求的接口请求函数
 */
export const reqWeather = (city) => {

  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    // 发送jsonp请求
    jsonp(url, {}, (err, data) => {
      console.log('jsonp()', err, data)
      // 如果成功了
      if (!err && data.status==='success') {
        // 取出需要的数据
        const {dayPictureUrl, weather} = data.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      } else {
        // 如果失败了
        message.error('获取天气信息失败!')
      }

    })
  })
}
// reqWeather('北京')
/*
jsonp解决ajax跨域的原理
  1). jsonp只能解决GET类型的ajax请求跨域问题
  2). jsonp请求不是ajax请求, 而是一般的get请求
  3). 基本原理
   浏览器端:
      动态生成<script>来请求后台接口(src就是接口的url)
      定义好用于接收响应数据的函数(fn), 并将函数名通过请求参数提交给后台(如: callback=fn)
   服务器端:
      接收到请求处理产生结果数据后, 返回一个函数调用的js代码, 并将结果数据作为实参传入函数调用
   浏览器端:
      收到响应自动执行函数调用的js代码, 也就执行了提前定义好的回调函数, 并得到了需要的结果数据
 */