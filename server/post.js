//创建网站服务器的模块
const http = require('http');
//app对象就是网站服务器对象
const app = http.createServer();
//处理请求参数模块
const querystring = require('querystring');
//为网站服务器添加请求事件,有请求来触发事件，添加事件 处理函数
app.on('request', (req, res) => {
    //post 参数是通过事件的方式接收的
    //1.data 请求参数传递的时候触发
    //2.end 请求参数完成时触发
    let postParams = '';
    req.on('data', params => {
        postParams += params;
    })
    req.on('end', () => {
        console.log(querystring.parse(postParams))
    })
    res.end('okokok');
})

//监听端口才可以
app.listen(3000)
console.log('OK');