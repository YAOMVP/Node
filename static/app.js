//1.创建网站服务器的模块
const http = require('http');
const url = require('url');
//读取文件用到系统模块fs
const fs = require('fs');
//拼接路径
const path = require('path');
//2.app对象就是网站服务器对象
const app = http.createServer();
//3.为网站服务器添加请求事件,有请求来触发事件，添加事件 处理函数
app.on('request', (req, res) => {
    let pathname = url.parse(req.url).pathname;
    //将用户的请求路径转换为服务器实际的硬盘路径,就需要进行路径拼接
    //(__dirname绝对路径 public文件都在这里边 pathname用户请求路径)
    let realPath = path.join(__dirname, 'public' + pathname)
        //读取文件
    fs.readFile(realPath, (error, result) => {
        //文件读取失败
        if (error != null) {
            res.writeHead(404, {
                'content-type': 'text/html'
            })
            res.end('sorry,can not open!')
            return
        }
        res.end(result)
    })
})

//4.监听端口才可以
app.listen(3000)
console.log('OK');