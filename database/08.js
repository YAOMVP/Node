//引入mongoose第三方模块
const mongoose = require('mongoose')

// 数据库连接
mongoose.connect('mongodb://localhost/playground')

// 连接成功
.then(() => console.log('success'))
    //连接失败
    .catch(err => console.log(err, 'not success'))

//创建集合规则
//在mongoose下有Schema构造函数，里边可以传递对象，就是具体的集合规则

//用户集合规则
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});
//文章集合规则
//在文章集合中存储发布文章的作者，对文章集合和用户集合进行关联
const postSchema = new mongoose.Schema({
    title: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        //进相关联使用的是ref属性，当前字段关联的集合
        ref: 'User'
    }
})

//使用规则创建集合用 model方法 调用两个参数
//1.集合的名称(首字母必须大写) 2.集合用的规则

//用户集合
const User = mongoose.model('User', userSchema)

//文章集合
const Post = mongoose.model('Post', postSchema)

//创建用户，再创建文章，文章用创建的用户进行发布
User.create({ name: 'Olivia' }).then(result => console.log(result))

//创建文章 存储用户的id
Post.create({ title: 'hi,Olivia', author: '62708ddb8486a78ca85713f7' }).then(result => console.log(result))

//把文章信息查询出来 populate查询出用户的信息
Post.find().populate('author').then(result => console.log(result))