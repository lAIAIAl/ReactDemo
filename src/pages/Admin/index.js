import React, { Component } from 'react'
import memoryUtil from '../../utils/memoryUtils'
import {Route,Switch,Redirect} from 'react-router-dom'

import { Layout } from 'antd';
import Header from '../../components/header';
import LeftNav from '../../components/left-nav';
import Home from './Home';
import Line from './Charts/line'
import Bar from './Charts/bar'
import Pie from './Charts/pie'
import Product from './Manage/product'
import Category from './Manage/category'
import User from './User'
const {  Footer, Sider, Content } = Layout;


export default class Admin extends Component {
    render() {
        const user = memoryUtil.user;
        if(!user||!user.user_id){
            return <Redirect to="/login"/>
        }
        return (
            <Layout style={{height:"100%"}}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{backgroundColor:'white',margin:'20px 15px'}}>
                        <Switch>
                            <Route path='/admin/home' component={Home}></Route>
                            <Route path='/admin/manage/category' component={Category}></Route>
                            <Route path='/admin/manage/product' component={Product}></Route>
                            <Route path='/admin/user' component={User}></Route>
                            <Route path='/admin/charts/line' component={Line}></Route>
                            <Route path='/admin/charts/bar' component={Bar}></Route>
                            <Route path='/admin/charts/pie' component={Pie}></Route>
                            <Redirect to='/admin/home'></Redirect>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center',color:'#ccc'}}>盛锦不锈钢</Footer>
                </Layout>
            </Layout>
        )
    }
}
