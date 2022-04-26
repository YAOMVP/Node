//有一个形参 名字是callback
function getData(callback) {
    callback('123')
}
//对应的实参其实是个匿名函数
getData(function(n) {
    console.log('callback函数被调用了');
    console.log(n);
});