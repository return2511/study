// 看不懂啊看不懂 一脸懵逼
var a = 0
// console.log(b)
console.log('start', a)
if (true) {
    console.log(a);
    a = 1
    console.log('inner', a, window.a)
    function a() {}
    a = 2
    console.log('inner1', a)
}

console.log('out', a)


// 有点看懂了 系列

var a; // function 声明提前至作用域顶部（理解为只声明了一个变量，没有进行function的声明，function的声明只能在{} 内部出不来）
var a = 0 // 其实有两步， 1: var a ; 覆盖了上面的变量声明，  2: 赋值a 为 0
// console.log(b)
console.log('start', a) // 因此输出 0
if (true) {
    // 函数声明  理解为 function a 的函数声明，为方便理解，innera = function (){}
    // 实际输出的是 innera
    console.log(a);
    a = 1
    console.log('inner', a, window.a)
    function a() {}
    console.log('inner', a, window.a)
    a = 2
    console.log('inner1', a)
}

console.log('out', a)



var b = 0;

if (true) {
    console.log(b, window.b)
    b = 1
    console.log(b, window.b)
    function b () { var c = 11111 }
    console.log(b, window.b)
    b = 2
    console.log(b, window.b)
}


var b = 0
console.log(b)
if (true) {
    console.log(b, window.b)
    function b () {}
    console.log(b, window.b)
}


console.log('out', c)
if (true) {
    console.log('inner1', c, window.c)
    c = 1
    console.log('inner2', c, window.c)
    function c () {}
    console.log('inner3', c, window.c)
    c = 2
    console.log('inner4', c, window.c)
}