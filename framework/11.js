//😊现在讲的是 app.use：

const express = require('express')
const bodyParse = require('body-parser')

const app = express()

app.use(fn({ a: 1 }))

function fn(obj) {
    return function(req, res, next) {
        if (obj.a == 1) {
            console.log(req.url);
        } else {
            console.log(req.method);
        }
        next()
    }
}


app.post('/add', (req, res) => {
    //接收post请求参数
    res.send(req.body)
})


//监听端口
app.listen(3000)
console.log('网站服务器启动成功了');