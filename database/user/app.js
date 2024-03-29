/* 1.搭建网站服务器，实现客户端与服务器端的通信
2.连接数据库，创建用户集合，向集合中插入文档
3.当用户访问/list时，将所有用户信息查询出来
	3.1实现路由功能
	3.2呈现用户列表页面
	3.3从数据库中查询用户信息 将用户信息展示在列表中
将用户信息和表格HTML进行拼接并将拼接结果响应回客户端
4.当用户访问/add时，呈现表单页面，并实现添加用户信息功能
当用户访问/modify时，呈现修改页面，并实现修改用户信息功能
5.修改用户信息分为两大步骤
		5.1.增加页面路由 呈现页面
			5.1在点击修改按钮的时候 将用户ID传递到当前页面
			5.2从数据库中查询当前用户信息 将用户信息展示到页面中
		5.2.实现用户修改功能
			5.2指定表单的提交地址以及请求方式
			5.2接受客户端传递过来的修改信息 找到用户 将用户信息更改为最新的
6.当用户访问/delete时，实现用户删除功能 */


//1.1搭建网站服务器 需要引入系统模块http
const http = require('http')

/* //2.1连接数据库 借助第三方模块mongoose 上一级database有node_modules
const mongoose = require('mongoose') */

//3.1.4导入url模块
const url = require('url')

//4.1.4导入queryString模块 可转换为对象格式
const querystring = require('querystring')

//6.连接数据库模块引入  创建用户集合的代码引入 .js可以省略
require('./model/index')
const User = require('./model/user')


/* //2.2数据库连接 第一个参数是 数据库的连接地址 以及 数据库的名字 27017是数据库的默认端口可以不写
mongoose.connect('mongodb://localhost/playground')
    //如果走了.then里边的回调函数就说明连接成功了
    .then(() => console.log('数据库连接成功了哈'))
    .catch(() => console.log('啊欧，咋数据库连接失败了呢'))
 */
/* //2.3创建用户集合规则,可以规定有哪些字段
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    age: {
        type: Number,
        min: 18,
        max: 80
    },
    password: String,
    email: String,
    //一个人的爱好可以有多个，所以以数组的形式，每一个值都需要是字符串类型
    hobbies: [String]
})

//2.4使用集合规则去创建集合 
//接下来就是导入将数据导入到集合当中，方便做用户列表，在database目录下有user.json文件，将文件的内容导入到数据库当中，
//mongoimport -d导入到哪一个数据库中 -c哪一个集合中 --file哪一个文件
// mongoimport -d playground -c users --file ./user.json
const User = mongoose.model('User', userSchema)
 */
//1.2创建服务器
const app = http.createServer()

// 1.3为服务器对象添加请求事件，当客户端有请求的时候会走事件处理函数，(事件名称是第一个值 request)
app.on('request', async(req, res) => {

    //3.1.1实现路由功能  获取用户的请求方式和请求地址，再进行这两个判断，路由功能就实现了
    //3.1.2先获取请求方式
    const method = req.method
        //3.1.3再获取请求地址 
        //不是纯粹的请求地址，需要系统模块url的parse方法，所以先要导入url模块(3.1.4) parse有一个属性pathname就是纯粹的请求地址，通过对象解构的方式结构出来

    //5.1.2解析对象中有一个属性是query默认是字符串类型，想转换为对象类型协商true
    const { pathname, query } = url.parse(req.url, true)

    //3.1.5对请求方式和请求地址进行判断
    if (method == 'GET') {
        //GET方法 大多是 数据的请求 或者 页面的呈递
        //3.2.1呈现用户列表页面
        if (pathname == '/list') {

            //3.3.1使用User.find()查询用户信息 .await使用异步函数拿到执行结果 并在(1.3) async (req, res)加上async关键字，通过异步函数的方式拿到返回值 find的结果
            let users = await User.find()

            //3.3.2要把真数据拼接到字符串里
            let list = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>用户列表</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
            </head>
            <body>
                <div class="container">
                    <h6>
                        <a href="/add" class="btn btn-primary">添加用户</a>
                    </h6>
                    <table class="table table-striped table-bordered">
                        <tr>
                            <td>用户名</td>
                            <td>年龄</td>
                            <td>爱好</td>
                            <td>邮箱</td>
                            <td>操作</td>
                        </tr>
            
            `;

            //3.3.3循环数据进行拼接 数组users的方法forEach item就是每一个对象

            //3.3.4爱好也是数组，又要循环，在进行拼接
            users.forEach(item => {
                list += `
                <tr>
				<td>${item.name}</td>
				<td>${item.age}</td>
				<td>
            `;
                item.hobbies.forEach(item => {
                    list += `<span>${item}</span>`
                })
                list += `
                </td>
				<td>${item.email}</td>
				<td>
					<a href="/remove?id=${item._id}" class="btn btn-danger btn-xs">删除</a>
					<a href="/modify?id=${item._id}" class="btn btn-success btn-xs">修改</a>
				</td>
			</tr>
                `;
            })

            list += `
            </table>
	</div>
</body>
</html>
            `;
            res.end(list);
            // 4.1.1添加路由 add页面
            // 4.1.1添加路由 add页面
            // 4.1.1添加路由 add页面
            // 4.1.1添加路由 add页面
            // 4.1.1添加路由 add页面
        } else if (pathname == '/add') { //4.1.1添加路由add页面
            let add = `
            <!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>用户列表</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
</head>
<body>
	<div class="container">
		<h3>添加用户</h3>
		<form method="post" action="/add">
		  <div class="form-group">
		    <label>用户名</label>
		    <input name="name" type="text" class="form-control" placeholder="请填写用户名">
		  </div>
		  <div class="form-group">
		    <label>密码</label>
		    <input name="password" type="password" class="form-control" placeholder="请输入密码">
		  </div>
		  <div class="form-group">
		    <label>年龄</label>
		    <input name="age" type="text" class="form-control" placeholder="请填写邮箱">
		  </div>
		  <div class="form-group">
		    <label>邮箱</label>
		    <input name="email" type="email" class="form-control" placeholder="请填写邮箱">
		  </div>
		  <div class="form-group">
		    <label>请选择爱好</label>
		    <div>
		    	<label class="checkbox-inline">
		    	  <input type="checkbox" value="足球" name="hobbies"> 足球
		    	</label>
		    	<label class="checkbox-inline">
		    	  <input type="checkbox" value="篮球" name="hobbies"> 篮球
		    	</label>
		    	<label class="checkbox-inline">
		    	  <input type="checkbox" value="橄榄球" name="hobbies"> 橄榄球
		    	</label>
		    	<label class="checkbox-inline">
		    	  <input type="checkbox" value="敲代码" name="hobbies"> 敲代码
		    	</label>
		    	<label class="checkbox-inline">
		    	  <input type="checkbox" value="抽烟" name="hobbies"> 抽烟
		    	</label>
		    	<label class="checkbox-inline">
		    	  <input type="checkbox" value="喝酒" name="hobbies"> 喝酒
		    	</label>
		    	<label class="checkbox-inline">
		    	  <input type="checkbox" value="烫头" name="hobbies"> 烫头
		    	</label>
		    </div>
		  </div>
		  <button type="submit" class="btn btn-primary">添加用户</button>
		</form>
	</div>
</body>
</html>
            `
            res.end(add)
        } else if (pathname == '/modify') {
            //5.1.1 通过id把用户信息查询出来 再将用户信息展示出来 
            let user = await User.findOne({ _id: query.id })
            let hobbies = ['足球', '篮球', '橄榄球', '敲代码', '抽烟', '喝酒', '烫头']
            console.log(user);
            //5.1.3把对象和html进行拼接
            let modify = `
            <!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>用户列表</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
</head>
<body>
	<div class="container">
		<h3>修改用户</h3>
		<form method="post" action="/modify?id${user._id}">
		  <div class="form-group">
		    <label>用户名</label>
		    <input value="${user.name}" name="name" type="text" class="form-control" placeholder="请填写用户名">
		  </div>
		  <div class="form-group">
		    <label>密码</label>
		    <input value="${user.password}" name="password" type="password" class="form-control" placeholder="请输入密码">
		  </div>
		  <div class="form-group">
		    <label>年龄</label>
		    <input value="${user.age}" name="age" type="text" class="form-control" placeholder="请填写邮箱">
		  </div>
		  <div class="form-group">
		    <label>邮箱</label>
		    <input value="${user.email}" name="email" type="email" class="form-control" placeholder="请填写邮箱">
		  </div>
		  <div class="form-group">
		    <label>请选择爱好</label>
		    <div>
		    
		    
            `

            hobbies.forEach(item => {
                //判断当前循环项目是否在用户的数组当中
                let isHobby = user.hobbies.includes(item)
                if (isHobby) {
                    modify += `
                    <label class="checkbox-inline">
                    <input type="checkbox" value="${item}" name="hobbies" checked> ${item}
                  </label>
            
                    `
                } else {
                    modify += `
                    <label class="checkbox-inline">
                    <input type="checkbox" value="${item}" name="hobbies" > ${item}
                  </label>
            
                    `
                }
            })

            //5.1.4进行拼接
            modify += `
            </div>
            </div>
            <button type="submit" class="btn btn-primary">修改用户</button>
          </form>
      </div>
  </body>
  </html>
            `
            res.end(modify)
        } else if (pathname == '/remove') {
            await User.findOneAndDelete({ _id: query.id })
            res.writeHead(301, {
                Location: '/list'
            })
            res.end()
        }

    } else if (method == 'POST') {
        //POST方法 添加数据 或者 修改数据
        //4.1.2处理用户添加功能 
        if (pathname == '/add') {
            //4.1.3先接受用户提交的信息 有传递的时候触发data事件，post参数一步步接收 data持续被触发 +=parama是每一次传递过来的参数
            // 传递结束的时候触发end事件
            let formData = ''
            req.on('data', parama => {
                formData += parama
            })
            req.on('end', async() => {
                let user = querystring.parse(formData)
                    //4.1.4再放进数据库当中create(对象类型，)
                await User.create(user)
                    //第一个空是重定向状态码 第二个Location跳转到列表页面
                res.writeHead(301, {
                        Location: '/list'
                    })
                    //4.1.5最后跳转完加上这句话，才叫跳转结束
                res.end()
            })

        } else if (pathname == '/modify') {
            // 5.2.1 获取到用户提交的最新的表单信息
            let formData = ''
            req.on('data', parama => {
                formData += parama
            })
            req.on('end', async() => {
                let user = querystring.parse(formData)
                    //4.1.4再放进数据库当中create(对象类型，)
                await User.updateOne({ _id: query.id }, user)
                    //第一个空是重定向状态码 第二个Location跳转到列表页面
                res.writeHead(301, {
                        Location: '/list'
                    })
                    //4.1.5最后跳转完加上这句话，才叫跳转结束
                res.end()
            })
        }
    }


})

//1.4监听端口
app.listen(3000)