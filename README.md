# 简介

个人练手的react后台管理项目,主要目的是熟悉整个react开发流程以及常用技术

## 运行说明

本地运行直接下载,已经生成打包文件build,配置一下nginx,即可运行,可以参考src中的nginx.conf,后台api在http://alaiala.com/ 的80端口上
此项目前端于http://alaiala.com:5001/ 端口运行,但是由于服务器过low(单核2G),经常无法响应,因此想要看效果最好自行下载查看,服务器上的项目不嫌慢的话多等等刷新刷新就行

## `说明`

### `文件说明`
api文件夹中分别定义了axios封装和请求api

assets中定义了静态资源

components中定义了可复用组件

config中定义了静态配置项

pages中定义了路由组件

utils中定义了相关的工具以及登录状态保存的文件


### `工程化`
使用的less,入口文件中引入了normal.css定义了基本样式

封装了axios,定义了请求和响应拦截器,api统一放在api.js中

使用的Craco.config.js对webpack配置进行了一些修改,没有执行eject,保持了react脚手架的默认配置


### `css`
主要使用的ui库为antd,craco.config中重置了默认主题色,没有做移动端适配,有时间再加上


### `js`

主要是类式组件,也有部分使用的函数式hooks,有用到react-redux

使用的browserrouter,用的nginx解决的打包后文件运行时刷新页面根路径丢失问题

使用了echarts,一个静态展示组件
