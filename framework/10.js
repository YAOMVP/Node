//😊讲的是 Post请求参数：
const express = require('express')
const bodyParse = require('body-parser')
    // 创建网站服务器
const app = express()

//拦截所有 的请求
//extended:false 方法内部使用querystring模块处理请求参数的格式
//extended：true 方法内部使用第三方模块qs处理请求参数的格式

// app.use(express.urlencoded({ extended: false }))
app.use(bodyParse.urlencoded({ extended: false }))

app.post('/add', (req, res) => {
    res.send(req.body)
})

//监听端口
app.listen(3000)
console.log('网站服务器启动成功了');