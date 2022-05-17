//创建用户集合

//引入mongoose第三方模块
const mongoose = require('mongoose')

//创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        //保证邮箱地址不重复
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    //admin 超级管理员  normal 普通用户
    role: {
        type: String,
        required: true
    },
    //0 启用状态 1禁用状态
    state: {
        type: Number,
        default: 0
    }
})

//创建集合
const User = mongoose.model('User', userSchema)

/* User.create({
    username: 'olivia',
    email: 'olivia@123.com',
    password: '123456',
    role: 'admin',
    state: '0'
}).then(() => {
    console.log('创建成功了您');
}).catch(() => {
    console.log('创建失败了');
}) */

//用户集合的数据开放出去，别人可以拿到数据，就可以对集合进行操作，比如路由模块
module.exports = {
    User //之前写成 User : User  ES6中一样就省略不写了
}