//讲的是：😊Express 框架
const express = require('express')
const { send } = require('express/lib/response')

//创建网站服务器
const app = express()

app.get('/', (req, res) => {
    // send()
    //1.send方法会 😊检测内部相应内容的类型
    //2.send方法会 😊自动设置http状态码
    //3.send方法会 😊自动设置响应的内容类型以及编码
    res.send('Hello,express')
})

app.get('/list', (req, res) => {
    res.send({ name: '张三', age: '20' })
})

//监听端口
app.listen(3000)
console.log('网站服务器启动成功了嘿');