//😊讲的是 异步函数错误的捕获：

const express = require('express')
const fs = require('fs')

//需要将读取文件的api改造成支持异步函数的形式
const promisify = require('util').promisify
const readFile = promisify(fs.readFile)

//创建网站服务器
const app = express()

app.get('/index', async(req, res, next) => {
    //先尝试try执行，如果有错误执行catch 没有错误 执行catch后边的语句
    //用了之后程序不报错了，不会因为一个程序没有读取到，而停止运行，增加了程序的健壮性
    try {
        await readFile('./aaa.js')
    } catch (ex) {
        next(ex)
    }
})

//错误处理中间件
app.use((err, req, res, next) => {
    res.status(500).send(err.message)
})

//监听端口
app.listen(3000)
console.log('网站服务器启动成功了');