import React, { Component } from 'react'
import './index.less'
import formateDate from '../../utils/dateUtils'
import memoryUitls from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
//import { reqWeather } from '../../api'
import weatherPic from '../../assets/weather.jpg'
import { withRouter } from 'react-router'
import menuList from '../../config/menuConfig'
import {Modal} from 'antd'
import LinkButton from '../link-button'

class Header extends Component {
    state = {
        currentTime:formateDate(Date.now()),
        dayPictureUrl:'',
        weather:'',
    }
    getTime = ()=>{
        this.timeInterval =  setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({currentTime})
        }, 1000);
    }
    //百度地图api已经失效
    /* getWeather = async()=>{
        const {dayPictureUrl,weather} = await reqWeather('上海')
        console.log({dayPictureUrl,weather})
        this.setState({dayPictureUrl,weather})
    } */
    /* 第一次render之后执行一次
        一般执行异步任务
        发送ajax或者启动定时器
    */
   getTitle = ()=>{
       let t = this.props.location.pathname
       let title
       menuList.forEach(function(item){
            if(item.key===t){
                title = item.name
            }
            else if(item.children){
                const cItem = item.children.find(cItem => t.indexOf(cItem.key)===0)
                // 如果有值才说明有匹配的
                if(cItem) {
                  // 取出它的title
                  title = cItem.name
                }
            }
       })
       return title
   }
   /*退出登录*/
   logout = () =>{
        Modal.confirm({
            /* title:'c', */
            content: '是否确定退出？',
            onOk:()=>{
                storageUtils.removeUser()
                memoryUitls.user = {}
                this.props.history.replace('/login');
            },
            onCancel(){

            }
        })
   }
    componentDidMount(){
        this.getTime()
        /* this.getWeather() */
        this.setState({weather:'晴天',dayPictureUrl:weatherPic})
    }
    componentWillUnmount(){
        clearInterval(this.timeInterval)
    }
    render() {
        const {currentTime,dayPictureUrl,weather} = this.state;
        const title = this.getTitle();
        const username = memoryUitls.user.username
        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎,{username}</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span>{currentTime}</span>
                        <img style={{width:'25px'}} src={dayPictureUrl} alt='weather'/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)