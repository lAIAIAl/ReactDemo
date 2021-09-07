/*
    入口js
*/
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import storageUtils from './utils/storageUtils'
import memoryUtil from './utils/memoryUtils'
//读取local中保存的user,保存到内存中

const user = storageUtils.getUser()
memoryUtil.user = user

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
,document.getElementById('root'))