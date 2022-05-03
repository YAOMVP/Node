//引入mongoose第三方模块
const mongoose = require('mongoose')

//数据库连接
mongoose.connect('mongodb://localhost/playground')

//连接成功
.then(() => console.log('success'))
    .catch(err => console.log(err, 'not success'))

const postSchema = new mongoose.Schema({
    title: {
        //必选字段
        type: String,
        required: [true, 'PLEASE TYPE THE TITLE~~~'],
        //minlength 和 maxlength 主要是规定字符串的最小、最大长度
        minlength: [2, '文章长度不能小于2'],
        maxlength: [5, '文章长度不能超过5'],
        //去除字符串两边的空格
        trim: true
    },
    age: {
        type: Number,
        //min和max 是数值类型的
        min: 18,
        max: 100
    },
    PublishDate: {
        type: Date,
        //默认值
        default: Date.now
    },
    category: {
        type: String,
        enum: {
            values: ['html', 'css', 'javascript', 'node.js'],
            message: '分类名称要在一定的范围内'
        }
    },
    //用户自己自定义的验证规则
    author: {
        type: String,
        validate: {
            //形参v是用户传递的值
            validator: (v) => {
                //返回布尔值 true代表验证成功 否则失败 v是验证的值
                return v && v.length > 4
            },
            //自定义错误信息
            message: '传入的值不符合验证规则'
        }

    }
})
const Post = mongoose.model('Post', postSchema)

Post.create({ title: 'aaaaa', age: 60, category: 'java', author: 'bd' })
    .then(result => console.log(result))
    .catch(error => {
        //获取错误信息对象
        const err = error.errors;

        //循环错误信息对象
        for (var attr in err) {
            //错误信息输出到控制台
            console.log(err[attr]['message']);
        }
    })