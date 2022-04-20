//创建网站服务器的模块
const http = require('http');
//app对象就是网站服务器对象
const app = http.createServer();
//为网站服务器添加请求事件,有请求来触发事件，添加事件 处理函数
app.on('request', (req, res) => {
        //获取请求方式
        // req.method
        // console.log(req.method);

        //获取请求地址 req.url
        // console.log(req.url);

        //获取请求报文信息 req.headers
        // console.log(req.headers['accept']);

        //响应报文(状态码，内容类型)
        res.writeHead(200, {
            'content-type': 'text/html;charset=utf8'
        })
        console.log(req.url);
        if (req.url == '/index' || req.url == '/') {
            res.end('<h2>欢迎来到首页</h2>')
        } else if (req.url == '/list') {
            res.end('Welcome to listpage')
        } else {
            res.end('Not found')
        }
        // if (req.method == 'POST') {
        //     res.end('post')
        // } else if (req.method == 'GET') {
        //     res.end('get')
        // }
        // res.end('<h2>HELLO USER</h2>')
    })
    //监听端口才可以
app.listen(3000)
console.log('OK');