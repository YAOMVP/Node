//1.引入系统模块http
//得到纯粹的请求地址需要引入系统模块url,把req.url解析
const url = require('url');
const http = require('http');
//2.创建系统服务器
const app = http.createServer();
//3.为网站服务器对象添加请求事件
app.on('request', (req, res) => {
    //4.实现路由功能
    //1.先 获取客户端的请求方式 toLowerCase()方法获取小写
    //2.再 获取客户端的请求地址 
    // 得到纯粹的请求地址需要引入系统模块url 里边有个parse()方法返回url地址的各个部分 里边的parthname就是请求地址
    const method = req.method.toLowerCase();
    const pathname = url.parse(req.url).pathname;
    //响应报文
    res.writeHead(200, {
        'content-type': 'text/html'
    })
    if (method == 'get') {
        if (pathname == '/' || pathname == '/index') {
            res.end('Welcome to homepage')
        } else if (pathname == '/list') {
            res.end('Welcome to listpage')
        } else {
            res.end('Not found uo')
        }
    } else if (method == 'post') {}
})
app.listen(3000)
console.log('okokok');