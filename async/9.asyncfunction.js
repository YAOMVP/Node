//1.在普通函数定义的前边加上async，普通函数变成异步函数
//2.异步函数默认的返回值是promise对象
//3.异步函数内部使用throw关键字进行错误抛出

//await 
//1.只出现在异步函数中
//2.await promise 可以暂停异步函数的执行 等待promise对象返回结果后再向下执行
/* async function fn() {
    throw 'some errors'
    return 123
}
// console.log(fn());
fn().then(function(data) {
    console.log(data);
}).catch(function(err) {
    console.log(err);
}) */

async function p1() {
    return 'p1';
}
async function p2() {
    return 'p2';
}
async function p3() {
    return 'p3';
}
async function run() {
    let r1 = await p1()
    let r2 = await p2()
    let r3 = await p3()
    console.log(r1);
    console.log(r2);
    console.log(r3);
}
run()