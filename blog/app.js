//引用express框架
const express = require('express')
    //处理路径
const path = require('path')

//创建网站服务器
const app = express()

//2.1告诉express框架 模板所在的位置  (用 app.set) 最后给admin.js的 做完2.2.2才可以使用res.render()方法渲染模板
//2.1.1 第一个参数views是规定好的  第二个参数是模板的位置
app.set('views', path.join(__dirname, 'views'))

//告诉express框架 模板的默认后缀
app.set('view engine', 'art')
    //2.2.2当渲染后缀为art模板时 所使用的模板引擎是什么
app.engine('art', require('express-art-template'))

//2.开放静态资源文件 static
app.use(express.static(path.join(__dirname, 'public')))


//引入路由模块：通过require把刚才的home 和 admin导入
const home = require('./route/home')
const admin = require('./route/admin')

//app.use 为路由匹配请求对象
app.use('/home', home)
app.use('/admin', admin)


//监听端口
app.listen(80)
console.log('网站服务器启动成功,访问localhost去哈');