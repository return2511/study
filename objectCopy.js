// question 1: 实现Object.assign
// 首先确定Object.assign干了什么，一句话，这玩意就是个浅拷贝，只拷贝第一层

Object.prototype.assign2 = (...args) => {
    if (args.length === 0) throw new Error('object assign must need params');
    const [obj, ...rest] = args;

    for (let i = 0; i < rest.length; i++) {
        const element = rest[i];
        for (let key in element) {
            if (Object.prototype.hasOwnProperty.call(element, key)) {
                obj[key] = element[key];
            }
        }
    }
    return obj;
}

const obj1 = { a: 1 }
const obj2 = { b: 2, c: 3 }

console.log(Object.assign2(obj1, obj2))

// 以上为最开始实现版本，后面发现null 和 undefind作为第一个参数会报错，另外，基础类型会被封装，所以有如下第二个版本
// PS: 承认在面试过程中只能完成上面版本，这块确实第一次写没考虑到

Object.prototype.assign2 = (...args) => {
    if (args.length === 0) throw new Error('object assign must need params');
    let [obj, ...rest] = args;
    if (obj === undefined || obj === null) throw new Error('first params can not be null or undefined');

    // 感觉这一步可以直接略去判断，直接用 obj = new Object(obj);
    if (typeof obj !== 'object') obj = new Object(obj);
    for (let i = 0; i < rest.length; i++) {
        const element = rest[i];
        for (let key in element) {
            if (Object.prototype.hasOwnProperty.call(element, key)) {
                obj[key] = element[key];
            }
        }
    }
    return obj;
}

const obj0 = 5
const obj1 = { a: 1 }
const obj2 = { b: 2, c: 3 }

console.log(Object.assign2(obj0, obj1, obj2))

console.log('object', Object.assign(obj0, obj1, obj2))


// 另外 付之前写过的一版本深拷贝的代码
// 使用 weakmap 做hasp map，和普通的map不同之处是： weakmap的key是弱引用关系，即不会因为weakmap的引用导致对象不被GC回收
// 遇到过好几次这个问题，然后不断完善的结果
function deepClone(target, map = new WeakMap()) {
    if (target && typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};

        // date 类型
        if (target instanceof Date) return new Date(target)
        // regx 类型
        if (target instanceof RegExp) return new RegExp(target)
        // add more object type

        // ........

        // 处理循环引用问题 start
        if (map.get(target)) {
            return map.get(target);
        }
        map.set(target, cloneTarget);
        // 处理循环引用问题 end

        for (const key in target) {
            cloneTarget[key] = deepClone(target[key], map);
        }
        return cloneTarget;
    } else {
        return target;
    }
};

const obj = {
    a: 112,
    b: '2222',
    e: new RegExp(/aa/),
    c: [1, 2, 3, 5],
    d: {
        aa: 123,
        bb: {
            cc: 'hahahha'
        }
    }
}

const obj2 = deepClone(obj);
console.log('object', obj2)
obj.a = 2;
obj.d.aa = 123123123;
console.log('object', obj)
console.log('object2', obj2)
