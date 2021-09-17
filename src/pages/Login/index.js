import React, { Component } from 'react'
import './login.less'
import img from './imgs/logo.webp'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { post } from '../../utils/request';
import memoryUtil from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';
import { Redirect } from 'react-router-dom';
import defaultUrl from '../../utils/current';

export default class Login extends Component {
    onFinish = (values) => {
        post(defaultUrl+`/site/login`,values).then(
			response => {
				//请求成功后通知App更新状态
                if(response && response.data.code === 20000){
                    message.success('登录成功！');
                    const user = response.data.userInfo;
                    memoryUtil.user = user;
                    storageUtils.saveUser(user);
                    this.props.history.replace('/admin/home');
                }
			},
			error => {
				//请求失败后通知App更新状态
                console.log(error)
			}
		)
    };
    
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    render() {
        const user = memoryUtil.user;
        if(user && user.user_id){
            return <Redirect  to="/admin/home"/>
        }
        return (
            <div className="login">
                <div className="login-head">
                    <img src={img} alt="logo" className="login-logo" />
                    <h1 >react后台登录</h1>
                </div>
                <section className="login-body">
                    <h2>用户登录</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: '请输入用户名!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: '请输入密码!' }]}
                        >
                            <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{margin:'0 auto'}}>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
