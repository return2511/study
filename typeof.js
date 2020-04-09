

console.log([] == 0)

var ret = false;

if (!ret && typeof ret !== 'undefined' && typeof ret != NaN && ret != 0) {
    console.log('is null')
}

console.log(Object.prototype.toString.call(null))

console.log([] == ![])

console.log(0 != NaN)

console.log(false != 0)

async function async1(){
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}

async function async2(){
    // console.log('async2');
    new Promise((resolve) => {
        console.log('async2');
        resolve()
    })
    .then(() => {
        console.log('xxxxxxxxxxx')
    })
}

console.log('script start');

setTimeout(function () {
    console.log('setTimeout');
},0)

async1();

new Promise((resolve)=>{
    console.log('promise1');
    resolve();
}).then(function () {
    console.log('promise then');
}).then(() => {
    console.log('promise then 2')
}).then(() => {
    console.log('promise then 3')
})

console.log('script end');


var inner = 'window';
function say(){
    console.log(inner);
    console.log(this.inner);
}

var obj1 = (function () {
    var inner ='1-1';
    return {
        inner:'1-2',
        say:function () {
            console.log(inner);
            console.log(this.inner);
        }
    }
})()
var obj2 = (function () {
    var inner ='2-1';
    return {
        inner:'2-2',
        say:function () {
            console.log(inner);
            console.log(this.inner);
        }
    }
})()

say();
obj1.say();
obj1.say = say;
obj1.say();

obj2.say = obj1.say;
obj2.say();


console.log((![]+[])[+!![]- -+!![]- -+!![]]+({}+[])[+!![]]+(![]+[])[+!![]- -+!![]- -+!![]])
