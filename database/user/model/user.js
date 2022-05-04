//2.1连接数据库 借助第三方模块mongoose 上一级database有node_modules
const mongoose = require('mongoose')

//2.3创建用户集合规则,可以规定有哪些字段
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

//app.js好多地方用了User集合构造函数，所以需要开放出去，其他文件就可以拿到User集合的构造函数了

module.exports = User