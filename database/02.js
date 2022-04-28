const mongoose = require('mongoose');
//数据库连接
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Success'))
    .catch(err => console.log(err, 'not success'))

//创建集合规则，在集合下边才是具体的数据
//在mongoose对象下，有Schema构造函数，在里边传递对象，就是具体的集合规则
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean
})

//使用规则创建集合 model方法,调用时有两个参数
//第一个参数：集合的名称,规定首字母大写
//第二个参数：集合用哪个规则
const Course = mongoose.model('Course', courseSchema)

//创建集合构造函数的实例，像集合当中插入数据,给一个course对象去接收
const course = new Course({
        name: 'node.js',
        author: 'Olivia',
        isPublished: true
    })
    //把数据保存
course.save()