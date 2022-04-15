//1.通过模块的名字fs对模块进行引用
const fs = require('fs');

//2.通过模块内部的readFile方法读取文件的内容
fs.readFile('./node first.js', 'utf-8', (err, doc) => {
    console.log(doc);
})