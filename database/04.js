//引入mongoose第三方模块 
const mongoose = require('mongoose');
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

//使用User集合构造函数来查询文档
//查询用户集合中的所有文档 返回的是数组
// User.find().then(result => console.log(result))

//通过_id字段来查找文档
/* User.find({ _id: '5c09f267aeb04b22f8460968' }).then(result => console.log(result)) */

//findOne方法返回第一条文档 默认返回当前集合中的第一条文档
// User.findOne({ name: '李四' }).then(result => console.log(result))

//find和findOne的区别是：find返回一组文档
// findOne返回一个文档

//年龄大于$gt 20 小于$lt 40
User.find({ age: { $gt: 20, $lt: 40 } }).then(result => console.log(result))

//包含匹配$in
User.find({ hobbies: { $in: ['足球'] } }).then(result => console.log(result))

//选择要查询的字段select 多个字段以空格隔开  -_id表示不想查询有_id的字段
User.find().select('name email -_id').then(result => console.log(result))

//按照年龄进行升序排序sort('age)  降序排列sort('-age)就可以了
/* User.find().sort('age').then(result => console.log(result)) */
User.find().sort('-age').then(result => console.log(result))

//查询文档时 skip跳过 多少条数据 可以做分页功能
//limit限制 查询 的数量
//User.find查询所有文档 跳过前2个文档 只想显示3条数据
User.find().skip(2).limit(3).then(result => console.log(result))