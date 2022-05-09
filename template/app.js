//导入模板引擎 
const template = require('art-template')
    //拼接字符串(有一个方法join用来拼接字符串)
const path = require('path')

//template用来拼接字符串 第一个方法是模板的 绝对路径
//__dirname 代表的是当前文件所在路径（取的是template目录）
//第二个对象是 数据
const views = path.join(__dirname, 'views', 'index.art')
const html = template(views, {
    name: '张三',
    age: 20
})
console.log(html);