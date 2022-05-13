//😊讲的是 构建模块化路由的基础代码：

const express = require('express')

//创建网站服务器
const app = express()

//创建路由对象
const home = express.Router()

//当客户端访问什么样的路径来处理这个请求
app.use('/home', home)
    //创建二级路由
home.get('/index', (req, res) => {
    res.send('Welcome 来到首页')
})


//监听端口
app.listen(3000)
console.log('网站服务器启动成功了');