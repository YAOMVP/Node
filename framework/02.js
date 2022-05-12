//😊讲的是 中间件：

const express = require('express')

//创建网站服务器
const app = express()

app.get('/request', (req, res, next) => {
    req.name = '张三'
    next()
})

app.get('/request', (req, res) => {
    res.send(req.name)
})

//监听端口
app.listen(3000)
console.log('网站服务器启动成功');