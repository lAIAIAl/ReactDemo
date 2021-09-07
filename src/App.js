/*
    根组件
*/

import React,{ Component,Fragment } from "react";
import {Route,Switch,Redirect} from 'react-router-dom'
import Login from "./pages/Login";
import Admin from "./pages/Admin";

export default class App extends Component {
    render (){
        return (
            <Fragment>
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/admin' component={Admin} />
                    <Redirect to='/login'/>
                </Switch>
            </Fragment>
        )
    }
}