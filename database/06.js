/* 这是更新文档 
刚才不是删除完了吗 
别忘了先引入回来  
引入方法：
mongoimport引入 -d 往哪个数据库当中引入数据 -c引入到哪个集合 --file 哪一个文件
mongoimport -d playground -c users --file ./user.json */

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

//更新文档 如果匹配到多个也只更新第一个
User.updateOne({ name: '李四' }, { name: '李狗蛋' }).then(result => console.log(result))
    //更新多个文档
User.updateMany({}, { age: 56 }).then(result => console.log(result))