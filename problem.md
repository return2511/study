```
// 栈

class Stack {

    constructor(){
        this.items = [];
    }

    push(item){
        this.items.push(item);
    }

    pop(){
        this.items.pop();
    }

    get isEmpty(){
        return this.items.length < 1;
    }

    print(){
        console.log(this.items.toString());
    }
}

let stack = new Stack();
stack.push(1);
stack.push(3);
stack.push(2);

stack.pop();
// stack.print();

// 优先队列
class PriorityQueue {
    constructor(){
        this.items = [];
    }

    enqueue(element, priority){
        const queueElement = {element,priority};
        let i = 0;
        if(this.isEmpty){
            this.items.push(queueElement);
        }else{
            for (let i=0;i<this.items.length;i++){
                if(this.items[i]>queueElement.priority){
                   this.items.splice(i,0,queueElement);
                }
            }
        }
    }


    get isEmpty(){
        return this.items.length < 1;
    }
}

//链表
class LinkNode {
    constructor(value,next = null){
        this.value = value;
        this.next = next;
    }
}

class Link {
    constructor(){
        this.head = null;
        this.length = 0;
    }

    append(element){
        const node = new LinkNode(element);

        if(this.head === null){
            this.head = node;
        }else{
            let currentNode = this.head;
            while (currentNode.next){
                currentNode = currentNode.next;
            }
            currentNode.next = node;
        }
        this.length++;
    }

    insert(element, position){
        if(position<0 || position>=this.length){
            return false;
        }
        let p = 0;
        let current = this.head;
        while (p<position){
            current = current.next;
            p++;
        }
        if(p === 0){
            const node = new LinkNode(element,this.head);
            this.head = node;
        }else{
            const node = new LinkNode(element,current.next);
            current.next = node;
        }
        return true;

    }

    /**
     * 1->2->3->4->null
     */
    reverse(){
        let preNode = this.head;
        let current = this.head.next;
        let tempNode = this.head.next.next;

        while (current){
            tempNode = current.next;
            current.next = preNode;
            preNode = current;
            current = tempNode;
        }
        this.head.next = null;
        return preNode;
    }

    reverse1(node){
        if(node === null || node.next === null){
            return node;
        }
        let p = this.reverse1(node.next);
        node.next.next = node;
        node.next = null;
        return  p;
    }

    print(head =null){
        let list = [];
        let currentNode = head === null?this.head:head;
        while (currentNode) {
            list.push(currentNode.value);
            currentNode = currentNode.next;
        }
        console.log('link : ',list.join(','));
    }

}

// const link = new Link();
// link.append(1);
// link.append(2);
// link.append(3);
// link.insert(2.5,1);
// link.print();
// link.print(link.reverse1(link.head));


class treeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class binarySearchTree {
    constructor(){
        this.root = null;
    }

    insert(key){
        const node = new treeNode(key);
        const insertNode =  (treeNode) => {
            if(key < treeNode.value){
                if(treeNode.left === null){
                    treeNode.left = node;
                }else {
                    insertNode(treeNode.left);
                }
            }else{
                if(treeNode.right === null){
                    treeNode.right = node;
                }else{
                    insertNode(treeNode.right);
                }
            }
        }
        if(this.root === null){
            this.root = node;
        }else{
            insertNode(this.root);
        }
    }

    inOrderTraverse(callback){
        const traverse = (node)=>{
            if(node !== null){
                traverse(node.left);
                callback(node.value);
                traverse(node.right);
            }
        }
        traverse(this.root);
    }

    breadthSearch(){
        const stack = [];
        const search = ()=>{
            const stackNode = stack.shift();
            if(stackNode){
                console.log(stackNode.value);
                if(stackNode.left){
                    stack.push(stackNode.left);
                }
                if(stackNode.right){
                    stack.push(stackNode.right);
                }
                if(stack.length >0){
                    search();
                }
            }
        }
        stack.push(this.root);
        search();
    }

}
const tree = new binarySearchTree()
tree.insert(11)
tree.insert(7)
tree.insert(5)
tree.insert(3)
tree.insert(9)
tree.insert(8)
tree.insert(10)
tree.insert(15)
tree.insert(13)
tree.insert(12)
tree.insert(14)
tree.insert(20)
tree.insert(18)
tree.insert(25)
// tree.inOrderTraverse((key)=>console.log(key))
// tree.breadthSearch();


function popSort(list) {
    for (let i=0;i<list.length;i++){
        for (let j= 0;j<list.length-i-1;j++){
            if(list[j] > list[j+1]){
                let temp = list[j];
                list[j] = list[j+1];
                list[j+1] = temp;
            }
        }
    }
    console.log(list);
}

function quickSort(list) {
    if(list.length <= 1){
        return list;
    }
    const base = list.splice(0,1);
    const left = [];
    const right = [];
    for (let i = 0;i<list.length;i++){
        if(list[i]<base){
            left.push(list[i]);
        }else{
            right.push(list[i]);
        }
    }
    return quickSort(left).concat(base,quickSort(right));
}

/**
 *
 * @param list Array
 */
function mergeSort(list){
    if(list.length <=1){
        return list;
    }
    let point = Math.floor(list.length/2);
    let right = list.splice(point)
    let left = list.splice(0,point);
   return merge(mergeSort(left),mergeSort(right))

}

function merge(left,right){
    const result = [];
    while (left.length > 0 && right.length > 0){
        if(left[0]>right[0]){
            result.push(right.shift());
        }else{
            result.push(left.shift());
        }
    }
    return result.concat(left).concat(right);
}

console.log(popSort([1,9,90,39,1,0]));

class Event {

    constructor(){
        this.listener = {};
    }

    listen(key,func){
        if(!this.listener[key]){
            this.listener[key] = [];
        }
        this.listener[key].push(func);
    }

    trigger(key){
        if(this.listener[key]){
            for (let i=0;i<this.listener[key].length;i++){
                this.listener[key][i].call(this,arguments);
            }
        }
    }

    remove(){

    }
}
console.log('>>>>>>>>>>>  event');
const e = new Event();

e.listen('test',()=>{console.log('test trigger');})
e.listen('test1',()=>{console.log('test1 trigger');})
e.trigger('test');

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

say(); // window window
obj1.say(); // 1-1,1-2
obj1.say = say;
obj1.say(); // window,1-2

obj2.say = obj1.say;
obj2.say(); // window,2-2


async function async1(){
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}

async function async2(){
    console.log('async2');
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
})

console.log('script end');
// script start
// async1 start
// async2
// promise1
// script end
//async1 end
//promise then
//setTimeout

function throttle(fn,time){
    let canRun  = false;
    let first = true;

    return function (fn,time) {
        let args = arguments;
        let _this = this;
        if(first){
            fn && fn.apply(_this,args);
            first = false;
        }
        if(canRun){
            return;
        }

        setTimeout(function () {
            fn && fn.apply(_this,args);
            canRun = true;
        },time)
    }
}
Function.prototype.bind = function (context) {
    const self = this;
    if(typeof self !== 'function'){
        throw 'Wrong Type';
        return;
    }
    let args = [].slice().call(arguments);

    return function () {
        let args1 = [].slice().call(arguments);
        self.apply(this intanceOf self ? this: self, args.contact(args1))

    }


}

var hasPathSum = function(root, sum) {
    let transverse = function (node,number) {
        if(node === null){
            return false;
        }
        number+=node.value;
        if(node.left === null && node.right === null){
            return  number === sum;
        }else{
            return transverse(node.left,number) || transverse(node.right,number);
        }
    }
    transverse(root,0);
};
// urls []
let p1 = new Promise(resolve => resolve('p1'))
let p2 = new Promise(resolve => resolve('p2'))
let p3 = new Promise(resolve => resolve('p3'))

let cb = function () {
    console.log('cb');
}

function request(urls, maxNumber, callback) {
    let result = 0;

    new Promise((resolve)=>{
        urls.map((item)=>[
            item.then(function (res) {
                console.log(res);
                result++;
                if(result === urls.length){
                    resolve();
                }
            })
        ])

    }).then(function () {
        callback &&callback();
    });
}

function trueCurrying(fn, ...args) {
    if (args.length >= fn.length) {
        return fn(...args)
    }
    return function (...args2) {
        return trueCurrying(fn, ...args, ...args2)
    }
}

var fn = curry(function(a, b, c) {
    console.log([a, b, c]);
});
fn("a", "b", "c") // ["a", "b", "c"]
fn("a", "b")("c") // ["a", "b", "c"]
fn("a")("b")("c") // ["a", "b", "c"]
fn("a")("b", "c") // ["a", "b", "c"]
```