import React, { Component } from 'react'
import { Redirect, Route,Switch } from 'react-router'
import ProductAddUpdate from './add-product'
import ProductDetails from './details'
import ProductHome from './home'
import './product.less'

export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/admin/manage/product/product' component={ProductHome}/>
                <Route exact path='/admin/manage/product/addUpdate' component={ProductAddUpdate}/>
                <Route exact path='/admin/manage/product/details' component={ProductDetails}/>
                <Redirect to='/admin/manage/product/product' />
            </Switch>
        )
    }
}
