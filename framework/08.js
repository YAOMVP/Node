//😊讲的是 构建模块化路由：

const express = require('express')

//创建网站服务器
const app = express()

//导入路由模块使之生效
const home = require('./route/home')
const admin = require('./route/admin')

//当客户端访问/home 用home路由进行处理  
app.use('/home', home)
app.use('/admin', admin)

//监听端口
app.listen(3000)
console.log('网站服务器启动成功了');