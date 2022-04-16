//读取其他文件的内容
const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'node first.js'), 'utf8', (err, doc) => {
    console.log(err);
    console.log(doc);
})