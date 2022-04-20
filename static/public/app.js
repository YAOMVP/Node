//创建网站服务器的模块
const http = require('http');
//app对象就是网站服务器对象
const app = http.createServer();
//为网站服务器添加请求事件,有请求来触发事件，添加事件 处理函数
app.on('request', (req, res) => {
    res.end('okhi');
})

//监听端口才可以
app.listen(3000)
console.log('OK');