const mongoose = require('mongoose');
//数据库连接
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('success'))
    .catch(err => console.log(err, 'not success'))

//创建集合规则
//在mongoose下有Schema构造函数，里边可以传递对象，就是具体的集合规则
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean
})

//使用规则创建集合用 model方法 调用两个参数
//1.集合的名称(首字母必须大写) 2.集合用的规则
const Course = mongoose.model('Course', courseSchema)

//像集合中插入文档
/* Course.create({ name: 'Javascript', author: 'Olivia', isPublished: false }, (err, result) => {
    console.log(err);
    console.log(result);
}) */

Course.create({ name: 'Javascript2', author: 'Oliva', isPublished: false })
    .then(result => {
        console.log(result);
    })