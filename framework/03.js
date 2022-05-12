//😊讲的是 app.use：
const express = require('express')

const app = express()

//中间件1  接收所有请求的中间件
app.use((req, res, next) => {
        console.log('走app.use');
        next()
    })
    //中间件2
app.use('/request', (req, res, next) => {
    console.log('走app.use /request');
    next()
})

app.get('request', (req, res, next) => {
    req.name = '张三'
    next()
})

//会走第一个中间件，因为第一个没有限制请求地址
app.get('list', (req, res, next) => {
    res.send('/list')
})

app.get('/request', (req, res) => {
    res.send(req.name)
})

app.listen(3000)
console.log('网站服务器启动成功');