//2.1连接数据库 借助第三方模块mongoose 上一级database有node_modules
const mongoose = require('mongoose')


//2.2数据库连接 第一个参数是 数据库的连接地址 以及 数据库的名字 27017是数据库的默认端口可以不写
mongoose.connect('mongodb://localhost/playground')
    //如果走了.then里边的回调函数就说明连接成功了
    .then(() => console.log('数据库连接成功了哈'))
    .catch(() => console.log('啊欧，咋数据库连接失败了呢'))