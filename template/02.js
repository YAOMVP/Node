const template = require('art-template')
const path = require('path')

const views = path.join(__dirname, 'views', '02.art')

const html = template(views, {
    name: '张三',
    age: 17
})

//可以对年龄进行判断 如果大于显示一个内容 如果小于显示另一个内容
console.log(html);