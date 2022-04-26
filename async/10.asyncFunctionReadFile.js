const fs = require('fs');
//提供了方法，对现有的api进行包装，可以让方法返回promise对象，以支持异步函数语法
const promisify = require('util').promisify;
//调用promisify方法，然后传递要改造的方法，只是获取readFile方法，先不调用,用新的方法readFile来接收，它的返回值就是promise对象
const readFile = promisify(fs.readFile);
//调用方法
async function run() {
    let r1 = await readFile('./1.txt', 'utf8')
    let r2 = await readFile('./2.txt', 'utf8')
    let r3 = await readFile('./3.txt', 'utf8')
    console.log(r1);
    console.log(r2);
    console.log(r3);
}
run()