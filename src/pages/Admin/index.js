import React, { Component } from 'react'
import memoryUtil from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {Route,Switch,Redirect} from 'react-router-dom'

import { Layout } from 'antd';
import Header from '../../components/header';
import LeftNav from '../../components/left-nav';
import Home from './Home';
import Line from './Charts/line'
import Bar from './Charts/bar'
import Pie from './Charts/pie'
import Product from './Manage/product/product'
import Category from './Manage/category/category'
import User from './User'
import Role from './Role'
const {  Footer, Sider, Content } = Layout;


export default class Admin extends Component {
    render() {
        const user = memoryUtil.user
        const a = new Date().getTime()
        console.log(user)
        if(!user||!user.user_id){
            return <Redirect to="/login"/>
        }
        if(user.user_id){
            const b = new Date(user.auth_key).getTime()
            if(b<a){
                storageUtils.removeUser()
                memoryUtil.user = {}
                return <Redirect to="/login"/>
            }
        }
        //如果没有权限则返回home
        if(user.auth.indexOf(this.props.location.pathname)===-1&&
            !(this.props.location.pathname.indexOf('/admin/manage/product/')!==-1&&user.auth.indexOf('/admin/manage/product')!==-1))
            return <Redirect to="/admin/home"/>
        return (
            <Layout style={{height:"100%"}}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{backgroundColor:'white',margin:'20px 15px'}}>
                        <Switch>
                            <Route path='/admin/home' component={Home} ></Route>
                            <Route path='/admin/manage/category' component={Category}></Route>
                            <Route path='/admin/manage/product' component={Product}></Route>
                            <Route path='/admin/user' component={User}></Route>
                            <Route path='/admin/charts/line' component={Line}></Route>
                            <Route path='/admin/charts/bar' component={Bar}></Route>
                            <Route path='/admin/charts/pie' component={Pie}></Route>
                            <Route path='/admin/role' component={Role}></Route>
                            <Redirect to='/admin/home'></Redirect>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center',color:'#ccc'}}>wjcTest</Footer>
                </Layout>
            </Layout>
        )
    }
}
