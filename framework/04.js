//😊讲的是 中间件应用：

const express = require('express')

//创建网站服务器
const app = express()

/* app.use((req, res, next) => {
    res.send('网站正在维护 明天早上8点来就好了')
}) */

app.use('/admin', (req, res, next) => {
    //用户没有登录
    let isLogin = true
        //如果用户登录
    if (isLogin) {
        //请求继续向下执行
        next()
    } else {
        //如果用户没有登录 直接对客户端进行响应
        res.send('没登陆呢 不能访问')
    }
})


app.get('/admin', (req, res) => {
    res.send('登陆成功 可以访问页面')
})

app.use((req, res, next) => {
    //为客户端响应404
    res.status(404).send('访问页面不存在')
})

//监听端口
app.listen(3000)
console.log('网站服务器启动成功了');