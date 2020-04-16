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