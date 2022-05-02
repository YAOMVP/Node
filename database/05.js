//引入mongoose第三方模块
const mongoose = require('mongoose')

//数据库连接
mongoose.connect('mongodb://localhost/playground')

//连接成功
.then(() => console.log('success'))
    .catch(err => console.log(err, 'not success'))

//创建集合规则
//在mongoose下有Schema构造函数，里边可以传递对象，就是具体的集合规则
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password: String,
    hobbies: [String]
})

//使用规则创建集合用 model方法 调用两个参数
//1.集合的名称(首字母必须大写) 2.集合用的规则
const User = mongoose.model('User', userSchema)

//查到到一条文档并且删除 ，如果匹配到了多个文档，只会删除第一个匹配的文档
User.findOneAndDelete({ ID: '5c09f267aeb04b22f8460968' }).then(result => console.log(result)) //删除哪个文档就返回哪个文档

//删除多个文档
User.deleteMany({}).then(result => console.log(result)) //返回值是一个对象有两个属性 acknowledge：true删除成功 deletedCount 删除了几条数据