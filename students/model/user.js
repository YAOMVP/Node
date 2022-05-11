const mongoose = require('mongoose')

//设定集合规则 创建学生信息集合
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 10
    },
    age: {
        type: Number,
        min: 10,
        max: 25
    },
    sex: {
        type: String
    },
    email: String,
    hobbies: [String],
    collage: String,
    enterDate: {
        type: Date,
        default: Date.now
    }
})

const Student = mongoose.model('student', studentSchema)

//😊其他模块需要导入，所以要开放出去
module.exports = Student