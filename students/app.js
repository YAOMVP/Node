//引入http模块
const http = require('http')

//3.引入router模块
const getRouter = require('router')

//4.引入模板引擎
const template = require('art-template')

//4.2配置模板的根目录需要路径拼接
const path = require('path')

//4.3想实现静态资源访问 引入静态资源访问模块
const serveStatic = require('serve-static')

//6.1引入querystring模块，可以把请求参数的格式转换为对象类型
const querystring = require('querystring')

//7.1引入处理日期第三方模块
const dateformat = require('dateformat')

//3.1调用getRouter获取请求对象
const router = getRouter()

//4.4实现静态资源服务
const serve = serveStatic(path.join(__dirname, 'public'))

//4.1配置模板的根目录
template.defaults.root = path.join(__dirname, 'views')

//7.2 把日期方法导入到模板当中
template.defaults.imports.dateformat = dateformat

//呈递学生档案信息页面
router.get('/add', (req, res) => {
    const html = template('index.art', {})
    res.end(html)
})

//呈递学生档案信息列表页面
router.get('/list', async(req, res) => {
    //查询学生信息
    let students = await Student.find()
    console.log(students);
    const html = template('list.art', {
        students: students
    })
    res.end(html)
})

//6.添加请求方式为post 请求地址为/add的路由
router.post('/add', (req, res) => {
    //接收post的请求参数 param客户每一次发过来的请求参数
    let formData = ''
    req.on('data', parma => {
        formData += parma
    })
    req.on('end', async() => {
        //6.2把数据添加到数据库当中
        await student.create(querystring.parse(formData))
        res.writeHead(301, {
            location: '/list'
        })
        res.end()
    })
})

//2.把connect.js导入过来 没有导出任何成员 所以不需要接收返回结果
require('./model/connect')
    //3.创建的学生集合开放过来，以后会用到
const student = require('./model/user')
const Student = require('./model/user')

//😊创建网站服务器，实现客户端的 请求和访问
const app = http.createServer()

//😊实现客户端与服务器端的通信，为服务器对象添加请求事件
app.on('request', (req, res) => {
    //3.2启动路由
    router(req, res, () => {})
        //4.5启动静态资源访问功能
    serve(req, res, () => {})
})

//监听端口(然后在命令行中输入：nodemon app.js 则显示服务器启动成功。地址栏输入：localhost显示okkk，则代表客户端与服务器形成通信)
app.listen(80)
console.log('成功了服务器 欧耶！');