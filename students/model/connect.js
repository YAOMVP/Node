//2.先下载数据库，在命令行中输入：npm install mongoose
const mongoose = require('mongoose')

//2.1连接数据库
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('数据库连接成功了嘿'))
    .catch(() => console.log('数据库连接失败了呢'))